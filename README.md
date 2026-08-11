# The Dojo

**Just cloned this? Do this:**

```
cd ~/dojo
claude
```

then type:

```
/dojo
```

That is it. Sensei takes over from there.

---

## What this is

A school for getting comfortable with the terminal, Claude Code, skills and MCP.

It does not teach commands. It teaches concepts, and how to ask.

The first belts are on the web at **https://lakotafox.com/dojo** — they take you
from a fresh Mac to a working Claude Code install. Everything after that is here.

## The dashboard

Once sensei has greeted you, ask Claude:

> "Spin up a local server for the dojo on any open port."

Open the address it gives you. That is your training log — belts, katas and
sensei — and it updates itself while you work, because Claude writes to
`training-log.json` and the page is watching that file.

When you are done for the day:

> "What's running on my machine? Shut down that server for me."

Leaving servers running is how a machine gets slow, and how the next one fails
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
