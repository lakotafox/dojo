# Blue Belt — "Your own words."

Teaches: `CLAUDE.md`. The single highest-value habit in Claude Code.

## Kata: blue-1 — why the file exists

Concept first. Every session starts with Claude knowing nothing about their
project. Everything it knows was read and sent. A `CLAUDE.md` at the root of a
project is loaded automatically at the start of every session — so anything in
it is something they never have to explain again.

The test for whether a line belongs in it: **have you had to say this twice?**

Show them the one in this repo. It is short on purpose, and point that out — a
rambling CLAUDE.md is a bad CLAUDE.md, because everything in it costs context
in every single session.

Complete when they can say what belongs in one without being prompted.

## Kata: blue-2 — write one

They pick a real project of their own. Not a toy.

Say: *"Write a CLAUDE.md for this project."*

Then read what Claude produced **with them** and cut it down together. The good
version covers:

- what the project is and what it is built with
- how to run it, test it, build it
- conventions worth keeping — naming, layout, "we do not use X"
- anything they have already had to correct Claude on

Check: the file exists at the project root, and it contains a run/build command
and at least one convention. If it is a generic description of the folder
structure, it is not done — that is something Claude can already see.

## Kata: blue-3 — prove it works

Have them start a fresh session in that project and ask something that the
CLAUDE.md answers. Watch it answer correctly without being told.

Point out what just happened: they wrote it once, and it is now permanent.
