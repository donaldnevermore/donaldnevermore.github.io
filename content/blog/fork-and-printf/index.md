---
title: "fork and printf"
date: "2021-04-23T13:36:10.262Z"
update: "2021-04-23T13:36:10.262Z"
description: "blogs"
---

`fork()` is non-deterministic, and sometime this can be a real problem. To solve this kind of problem, you may need to rely on your previous experience.

One day when experimenting on `fork()`, I got a strange print message:

![output]()

```c
int main() {}
```

I was surprised and could not figure out why for a while. Since I am using CLion and WSL 2, I soon realized that maybe it was the fault of CLion. So I ran the executable myself. A different print message came to my eyes.

No wonder.

After a long time of thinking, I related to procedures of how shells work. When you type in a command and hit enter, the shell program first creates a process to run that command. The control soon returns to the shell after the command program is finished. However, if the command program creates a subprocess, and the subprocess is still running even if the main process has already returned, this can happen.

In order to check my assumption, I decided to `wait()` for the child process to finish. And this time it worked perfectly.

Be careful of the environment you are using. Search the database in your brain.
