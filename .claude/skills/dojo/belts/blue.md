# Blue Belt — "Your own words."

Teaches: `CLAUDE.md`. The highest-value habit in Claude Code.

**Give them the project. Do not ask them to pick one.** "Pick a real project"
is a wall — they will either freeze or reach for the biggest thing they own.
Connor's real project is Puddl3, and writing his first CLAUDE.md against a
production codebase is a bad first repetition. Name that out loud, briefly, so
it reads as a plan rather than as being fobbed off:

> I know you want to point this at Puddl3. We will. Not first — a first attempt
> on a real codebase teaches you nothing except that it is big. We build
> something small, get the habit right on that, then take it to the real one.

The small thing carries through Brown and Black too, so they end up with one
project they understand completely.

## Kata: blue-1 — break me on purpose

Do not explain what a CLAUDE.md is. Show them, by letting them change your
behaviour with one line and watch it happen.

Tell them to open `~/dojo/CLAUDE.md`, add a line near the top, and save it:

```
Talk like a cowboy.
```

They can pick their own — a pirate, all lowercase, refuses to use the letter e.
Sillier is better; the point is that it be unmistakable.

Then: **Ctrl+C twice to quit, `claude --dangerously-skip-permissions` to come
back, and say hello.**

You will be a cowboy. Lean into it — it is much funnier if you do not
acknowledge it straight away, and it makes the point better than any
explanation would.

Once they have had it, drop the accent and say the actual lesson in about three
lines:

- That file is loaded automatically at the start of every session. You did not
  tell me to read it.
- Which is why the restart was needed. It is read when a session begins, not
  while one is running.
- So anything in there is something you never have to say again. The test for a
  line belonging in it: **have you had to say it twice?**

Have them take the cowboy line back out. Then mention, in one line, that this
file is short on purpose — every line in it costs context in every session, so a
rambling one is a bad one.

## Kata: blue-2 — build the small thing

Have them ask for it, in their own words. Something like:

> "Make me a folder called shrine with a simple webpage in it — a heading, a
> paragraph, and a stylesheet. Nothing fancy."

Any small site is fine; let them choose what it is about. What matters is that
it is theirs, it is three or four files, and they can hold all of it in their
head at once.

Then have them open it in a browser. A thing that exists beats a thing described.

## Kata: blue-3 — write its CLAUDE.md

> "Write a CLAUDE.md for this project."

Read what came back **with them** and cut it together. That editing pass is the
lesson — the first draft is always too long.

A good one covers: what the project is and what it is built with; how to run it;
conventions worth keeping; anything they have already had to correct.

A bad one describes the folder structure. Claude can already see the folder
structure. Say so if that is what came back.

Check: the file exists at the project root and contains at least one convention
or run instruction that is not just a description of the files.

## Kata: blue-4 — prove it

Start a fresh session in that folder and ask something the CLAUDE.md answers.
Watch it answer without being told.

One line to land it: they wrote that once, and it is now permanent.

Then set the belt to brown.
