#!/usr/bin/env node
/* The dojo's own MCP server — the Black Belt capstone.
 *
 * Deliberately dependency-free and small enough to read in one sitting, because
 * the student is meant to open it. It speaks MCP over stdio: newline-delimited
 * JSON-RPC on stdin/stdout.
 *
 * IMPORTANT: nothing may ever be written to stdout except protocol messages.
 * A stray console.log corrupts the stream and the server appears to "not work"
 * for reasons that are very hard to see. Diagnostics go to stderr.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOG = join(ROOT, 'training-log.json');

const BELTS = ['white', 'yellow', 'orange', 'green', 'blue', 'brown', 'black'];

const read = () => JSON.parse(readFileSync(LOG, 'utf8'));
const write = (d) => writeFileSync(LOG, JSON.stringify(d, null, 2) + '\n');

/* ---------------------------------------------------------------- tools -- */

const TOOLS = [
  {
    name: 'get_rank',
    description: "Read the student's current belt, completed katas and recent training log.",
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'complete_kata',
    description: 'Record one completed kata. Use only after verifying the work on the filesystem.',
    inputSchema: {
      type: 'object',
      properties: {
        kata: { type: 'string', description: 'Kata id, e.g. blue-2' },
        note: { type: 'string', description: 'One line for the training log' },
      },
      required: ['kata'],
      additionalProperties: false,
    },
  },
  {
    name: 'award_belt',
    description: 'Promote the student to a belt. Only when every kata in the previous belt is done.',
    inputSchema: {
      type: 'object',
      properties: {
        belt: { type: 'string', enum: BELTS },
        note: { type: 'string' },
      },
      required: ['belt'],
      additionalProperties: false,
    },
  },
];

const text = (s) => ({ content: [{ type: 'text', text: s }] });

function call(name, args = {}) {
  const d = read();
  if (!d.startedAt) d.startedAt = Date.now();

  if (name === 'get_rank') {
    return text(JSON.stringify({
      belt: d.belt,
      katas: d.katas ?? [],
      recent: (d.log ?? []).slice(-5),
    }, null, 2));
  }

  if (name === 'complete_kata') {
    const { kata, note } = args;
    d.katas = d.katas ?? [];
    if (d.katas.includes(kata)) return text(`${kata} was already recorded.`);
    d.katas.push(kata);
    (d.log = d.log ?? []).push({ at: Date.now(), text: note || `Kata complete: ${kata}` });
    write(d);
    return text(`Recorded ${kata}. The dashboard will show it within a couple of seconds.`);
  }

  if (name === 'award_belt') {
    const { belt, note } = args;
    if (!BELTS.includes(belt)) return text(`Unknown belt: ${belt}`);
    d.belt = belt;
    d.beltEarnedAt = Date.now();
    (d.log = d.log ?? []).push({ at: Date.now(), text: note || `${belt} belt earned` });
    write(d);
    return text(`${belt} belt awarded. Tell them to look at the dashboard.`);
  }

  return { ...text(`Unknown tool: ${name}`), isError: true };
}

/* ------------------------------------------------------------- protocol -- */

const send = (msg) => process.stdout.write(JSON.stringify(msg) + '\n');

function handle(req) {
  const { id, method, params } = req;
  const reply = (result) => send({ jsonrpc: '2.0', id, result });

  try {
    switch (method) {
      case 'initialize':
        return reply({
          protocolVersion: params?.protocolVersion ?? '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'dojo', version: '1.0.0' },
        });
      case 'tools/list':
        return reply({ tools: TOOLS });
      case 'tools/call':
        return reply(call(params?.name, params?.arguments));
      case 'ping':
        return reply({});
      default:
        // notifications (no id) need no reply at all
        if (id === undefined) return;
        return send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown method: ${method}` } });
    }
  } catch (err) {
    if (id === undefined) return;
    send({ jsonrpc: '2.0', id, error: { code: -32603, message: String(err && err.message || err) } });
  }
}

let buf = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf('\n')) !== -1) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    try {
      handle(JSON.parse(line));
    } catch {
      process.stderr.write(`dojo-mcp: could not parse line: ${line}\n`);
    }
  }
});

process.stderr.write('dojo-mcp: ready\n');
