---
title: C# 中 in，out 和 ref 的区别
date: "2020-05-24T15:00:37.121Z"
description: ""
---

in，ref 和 out 都是按引用传递参数，但是用途不同，其中 in 表示只传入参数，不能修改参数，out 则必须修改参数，供函数外使用。

|参数修饰符|是否按引用传递参数|是否必须初始化|是否可以修改|是否必须修改|
|---|---|---|---|---|
|in|Yes|Yes|No|No|
|ref|Yes|Yes|Yes|No|
|out|Yes|No|Yes|Yes|

在使用中需要根据你的用途精心挑选好参数修饰符，而且为了提高可读性，函数的参数的顺序一般按照 in，ref 和 out 的顺序排列。

```csharp
class Program {
    static void Main(string[] args) {
        int a = 0;
        int b = 1;
        int c;
        Reference(in a, ref b, out c);
        Console.WriteLine(c);
    }

    static void Reference(in int a, ref int b, out int c) {
        Console.WriteLine(a);
        Console.WriteLine(b);
        c = 3;
    }
}
```
