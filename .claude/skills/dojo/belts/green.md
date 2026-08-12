# Green Belt — "Ask, do not type."

Teaches: a local server, and the dashboard. This is the first belt you teach,
and it is short on purpose — it exists so that everything after it is visible.

## Kata: green-1 — a server of your own

Have them say it. Do not do it silently; asking is the skill.

> "Spin up a local server for the dojo on any open port."

"Any open port" rather than naming one, so it finds a free door instead of
walking into an occupied one. Then, briefly: a server is a program that hands
out files. The port is which door it listens on. localhost, or 127.0.0.1, means
this machine only — nothing leaves the Mac. And the terminal is now busy holding
it open, which is not frozen, that is running.

Have them open the address and **leave the tab there**.

Record green-1, then tell them to look at the tab. It will have moved. That is
the first time they see it and it should not be explained away in advance.

## Kata: green-2 — put it away

The part every tutorial skips. A server keeps running long after you stop
thinking about it, and the next one fails with "address already in use" — a
message that means nothing to them yet.

> "What is running on my machine right now?"
> "Shut that server down for me."

They do not need `lsof` in their head. They need to know something can be
occupying a port, and that they can ask. Show the command once so it is not
magic, then let it go.

Tell them to have it back up before the next lesson — they will want to watch it.

Then set the belt to blue.
