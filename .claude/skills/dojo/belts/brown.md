# Brown Belt — "Kata."

Teaches: skills. A procedure, taught once.

## Kata: brown-1 — what a skill is

A skill is a folder with a `SKILL.md` in it. Frontmatter with a `name` and a
`description`, then instructions in markdown. That is the whole format.

The part worth understanding: Claude only sees the **description** of every
available skill at startup — a line or two each, which is cheap. It reads the
full file only when your request matches. That is why you can have many skills
without drowning.

Show them this very file's parent — `.claude/skills/dojo/SKILL.md` — and note
that the thing teaching them right now is itself a skill.

## Kata: brown-2 — the description is the whole trick

The `description` is the only thing Claude sees when deciding whether to open
the skill. So it must be written as a **trigger condition**, not a title.

- Bad: "Deployment stuff"
- Good: "Use when the user mentions deploying, shipping, or pushing to production"

Have them say which of those would fire reliably, and why.

## Kata: brown-3 — write one

Use the same small project from Blue Belt. Do not send them looking for a
problem to solve — hand them one that obviously fits:

> "Make a skill that checks this site before I share it — that every page has a
> title, that no link is broken, and that the stylesheet is actually loading."

Or anything else that repeats in that project. The point is that they already
understand the project completely, so the only new thing is the skill.

Say: *"Create a skill that does X, and put it in ~/.claude/skills so I can use
it from any project."*

Check: the folder exists, `SKILL.md` has both `name` and `description`, and the
description reads as a trigger condition rather than a label. If it reads like a
title, say so and have them rewrite that one line.

## Kata: brown-4 — watch it fire

Start a fresh session and say something that should trigger it — without naming
the skill. If it does not fire, the description is the thing to fix, and that is
a useful failure to see rather than to avoid.
