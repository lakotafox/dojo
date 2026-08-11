# The Dojo

A school for getting comfortable with the terminal, Claude Code, skills and MCP.

It does not teach commands. It teaches concepts, and how to ask.

## Start here

The first four belts are on the web:

**https://lakotafox.com/dojo**

They take you from a fresh Mac to a working Claude Code install. Come back here
when the web dojo tells you to.

## Bowing in

Once you have Claude Code, open a terminal in this folder and run:

```
claude
```

Then type `/dojo`. Sensei takes it from there.

## The dashboard

Ask Claude:

> "Spin up a local server for the dojo on any open port."

Open the address it gives you. That is your training log — belts, katas, and
sensei — and it updates itself while you work, because Claude writes to
`training-log.json` and the page is watching that file.

When you are finished for the day:

> "What's running on my machine? Shut down that server for me."

Leaving servers running is how a machine gets slow and how the next one fails
with "address already in use".

## What is in here

| | |
|---|---|
| `index.html` | the dashboard |
| `training-log.json` | your progress. Claude writes it, the dashboard reads it |
| `CLAUDE.md` | notes for Claude about this project — and Blue Belt's worked example |
| `.claude/skills/dojo/` | sensei, as a skill |
| `mcp/dojo-server.js` | the Black Belt capstone |
| `gen_sensei.py` | sensei himself, every pixel placed by hand |
