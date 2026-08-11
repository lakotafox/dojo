# Black Belt — "Reach."

Teaches: MCP, by wiring Claude to this dojo.

Most MCP tutorials connect you to something you cannot see inside. This one
connects both ends to things the student owns, so they can watch the wire work.

## Kata: black-1 — what MCP is

An open standard for letting Claude talk to systems that are not files on this
machine — a database, GitHub, a ticket tracker. Each one runs as a server and
exposes a set of tools.

The honest part nobody puts in the pitch: **every connected server costs context
in every session**, because its tool definitions load whether they get used or
not. Connect nine "just in case" and the working memory left for actual work
shrinks. The discipline is to remove what you are not using.

## Kata: black-2 — connect the dojo

`mcp/dojo-server.js` in this repo is a small MCP server. It exposes three tools:
read the current rank, complete a kata, award a belt.

Have them say: *"Connect the dojo's MCP server so you can mark my progress
yourself."*

Then show them the line that was run and take it apart:

```
claude mcp add --transport stdio dojo -- node <absolute path>/mcp/dojo-server.js
```

- `--transport stdio` — the server is a program on this machine, talked to over
  its input and output, rather than something over the network
- `dojo` — what it will be called
- `--` — everything after this is the command that starts the server, not more
  flags for claude
- an **absolute** path to node, if `node` is not found — Claude Code launches
  servers with a different environment than an interactive shell, and this is
  the single most common reason an MCP server refuses to start

Check: `claude mcp list` shows dojo, and `/mcp` reports it connected.

## Kata: black-3 — close the loop

Make sure their dashboard is open in a browser first. Tell them to watch it.

Then award the Black Belt **through the MCP tool**, not by editing the file.

They will see the belt change in the browser, driven by a tool call they wired
up themselves, from a terminal. Both ends of the wire, visible at once.

That is the end of the course. Tell them so, and tell them what they actually
learned: not commands — how to ask, and enough of the shape of the machine to
know what to ask for.
