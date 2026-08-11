/* The dashboard.
   Read-only and self-refreshing. Claude writes training-log.json from the
   terminal; this polls it and re-renders. That is the whole magic trick: finish
   a kata in your shell, glance at the browser, watch the belt change by itself.

   `cache: 'no-store'` is load-bearing — without it the browser happily serves
   the version it fetched two minutes ago and the page looks broken. */

import { createSensei, preload } from './sensei.js';

const POLL_MS = 2000;

const BELTS = [
  { id: 'white',  name: 'White Belt',  motto: 'First learn stand.' },
  { id: 'yellow', name: 'Yellow Belt', motto: 'Feel the room.' },
  { id: 'orange', name: 'Orange Belt', motto: 'Get your partner.' },
  { id: 'green',  name: 'Green Belt',  motto: 'Ask, do not type.' },
  { id: 'blue',   name: 'Blue Belt',   motto: 'Your own words.' },
  { id: 'brown',  name: 'Brown Belt',  motto: 'Kata.' },
  { id: 'black',  name: 'Black Belt',  motto: 'Reach.' },
];

const LINES = {
  white:  'You know the shape of the machine now. Good.',
  yellow: 'You have felt the room. It is smaller than it looked.',
  orange: 'Your partner is here. Stop memorising.',
  green:  'Now you ask. The commands were never the skill.',
  blue:   'Write down what you know, so you only explain it once.',
  brown:  'A kata is a thing you do the same way every time. Teach it once.',
  black:  'You wired me to your own dojo. Look at the belt change by itself.',
};

const $ = (s) => document.querySelector(s);
const el = (t, c, x) => { const n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; };

const sensei = createSensei($('#sensei-img'), $('#sensei-text'));
preload();
$('#sensei-bubble').addEventListener('click', () => sensei.skip());

let lastSerialised = null;
let lastBelt = null;

function render(data) {
  const beltIdx = Math.max(0, BELTS.findIndex((b) => b.id === data.belt));
  const belt = BELTS[beltIdx] || BELTS[0];

  /* rack */
  const rack = $('#rack');
  rack.innerHTML = '';
  BELTS.forEach((b, i) => {
    const chip = el('div', 'belt-chip');
    chip.dataset.state = i < beltIdx ? 'earned' : i === beltIdx ? 'current' : 'locked';
    const sw = el('span', 'belt-swatch');
    sw.style.setProperty('--belt', `var(--belt-${b.id})`);
    chip.append(sw, el('span', null, b.name));
    if (i < beltIdx) chip.append(el('span', 'tick', '✓'));
    rack.appendChild(chip);
  });

  /* stats */
  const katas = Array.isArray(data.katas) ? data.katas : [];
  const started = data.startedAt ? new Date(data.startedAt) : null;
  const days = started ? Math.max(1, Math.ceil((Date.now() - started.getTime()) / 864e5)) : 0;
  const stats = $('#stats');
  stats.innerHTML = '';
  [
    [String(beltIdx), 'belts earned'],
    [String(katas.length), 'katas complete'],
    [days ? String(days) : '—', days === 1 ? 'day training' : 'days training'],
  ].forEach(([n, label]) => {
    const s = el('div', 'stat');
    s.append(el('div', 'stat-n', n), el('div', 'stat-l', label));
    stats.appendChild(s);
  });

  $('#taskbar-rank').textContent = `${belt.name} — ${belt.motto}`;
  $('#belt-name').textContent = belt.name;
  $('#belt-motto').textContent = belt.motto;

  /* log, newest first */
  const log = $('#log');
  log.innerHTML = '';
  const entries = Array.isArray(data.log) ? [...data.log].reverse() : [];
  if (!entries.length) log.appendChild(el('p', 'cmd-note', 'Nothing yet.'));
  for (const e of entries.slice(0, 12)) {
    const row = el('div', 'log-row');
    const when = e.at ? new Date(e.at) : null;
    row.append(
      el('span', 'log-when', when ? when.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'),
      el('span', null, e.text || ''),
    );
    log.appendChild(row);
  }

  /* sensei only speaks when the rank actually changes — otherwise he would
     re-read the same line every two seconds, forever */
  if (lastBelt !== null && lastBelt !== data.belt) {
    sensei.hold('bow');
    sensei.say(`${belt.name}. ${LINES[belt.id] || belt.motto}`)
      .then(() => setTimeout(() => sensei.hold(null), 1400));
  }
  lastBelt = data.belt;
}

async function tick() {
  try {
    const r = await fetch('./training-log.json', { cache: 'no-store' });
    if (!r.ok) throw new Error(String(r.status));
    const text = await r.text();
    if (text !== lastSerialised) {
      lastSerialised = text;
      render(JSON.parse(text));
    }
    $('#conn').textContent = 'watching training-log.json';
  } catch (err) {
    $('#conn').textContent = 'cannot read training-log.json — is the server still running?';
  }
}

tick();
setInterval(tick, POLL_MS);

sensei.say('The dashboard is yours. Leave it open while you work — it watches your training log.');
