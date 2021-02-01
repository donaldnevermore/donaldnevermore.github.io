---
title: 编程的智慧总结笔记
date: "2019-09-30T12:35:37.121Z"
description: ""
---

> 编程的智慧——王垠
[http://www.yinwang.org/blog-cn/2015/11/21/programming-philosophy](http://www.yinwang.org/blog-cn/2015/11/21/programming-philosophy)

## 反复推敲代码

回头去提炼和反思自己的代码

## 写优雅的代码，树状结构的

if 语句几乎总是有两个分支

```java
if (...) {
  if (...) {
    ...
  } else {
    ...
  }
} else if (...) {
  ...
} else {
  ...
}
```

## 写模块化的代码，逻辑意义上的

避免写太长的函数

制造小的工具函数

每个函数只做一件简单的事情

```java
// bad
void foo() {
  if (getOS().equals("MacOS")) {
    a();
  } else {
    b();
  }
  c();
  if (getOS().equals("MacOS")) {
    d();
  } else {
    e();
  }
}

// good
void fooMacOS() {
  a();
  c();
  d();
}
void fooOther() {
  b();
  c();
  e();
}

// bad
void foo() {
  a();
  b()
  c();
  if (getOS().equals("MacOS")) {
    d();
  } else {
    e();
  }
}

// good
void preFoo() {
  a();
  b()
  c();
}
void fooMacOS() {
  preFoo();
  d();
}
void fooOther() {
  preFoo();
  e();
}
```

避免使用全局变量和类成员（class member）来传递信息，尽量使用局部变量和参数

```java
// bad
 class A {
   String x;

   void findX() {
      ...
      x = ...;
   }

   void foo() {
     findX();
     ...
     print(x);
   }
 }

// good
 String findX() {
    ...
    x = ...;
    return x;
 }
 void foo() {
   String x = findX();
   print(x);
 }
```

## 写可读的代码

使用有意义的函数和变量名字

局部变量应该尽量接近使用它的地方，局部变量的本质就是电路里的导线，变量定义离用的地方越近，导线的长度就越短

局部变量名字应该简短

```java
// bad
boolean successInDeleteFile = deleteFile("foo.txt");
if (successInDeleteFile) {
  ...
} else {
  ...
}

// good
boolean success = deleteFile("foo.txt");
if (success) {
  ...
} else {
  ...
}
```

不要重用局部变量

```java
// bad
String msg;
if (...) {
  msg = "succeed";
  log.info(msg);
} else {
  msg = "failed";
  log.info(msg);
}

// good
if (...) {
  String msg = "succeed";
  log.info(msg);
} else {
  String msg = "failed";
  log.info(msg);
}
```

把复杂的逻辑提取出去，做成“帮助函数”

把复杂的表达式提取出去，做成中间变量

```java
// bad
Pizza pizza = makePizza(crust(salt(), butter()),
   topping(onion(), tomato(), sausage()));

// good
Crust crust = crust(salt(), butter());
Topping topping = topping(onion(), tomato(), sausage());
Pizza pizza = makePizza(crust, topping);
```

在合理的地方换行

## 写简单的代码

避免使用自增减表达式

永远不要省略花括号

合理使用括号，不要盲目依赖操作符优先级

避免使用continue和break

如果出现了continue，你往往只需要把continue的条件反向，就可以消除continue。

如果出现了break，你往往可以把break的条件，合并到循环头部的终止条件里，从而去掉break。

有时候你可以把break替换成return，从而去掉break。

如果以上都失败了，你也许可以把循环里面复杂的部分提取出来，做成函数调用，之后continue或者break就可以去掉了。

```java
// bad
List<String> goodNames = new ArrayList<>();
for (String name: names) {
  if (name.contains("bad")) {
    continue;
  }
  goodNames.add(name);
  ...
}
```

只需要把continue的条件反向

```java
// good
List<String> goodNames = new ArrayList<>();
for (String name: names) {
  if (!name.contains("bad")) {
    goodNames.add(name);
    ...
  }
}

// bad
while (condition1) {
  ...
  if (condition2) {
    break;
  }
}
```

只需要把这个条件合并到循环头部

```java
// good
while (condition1 && !condition2) {
  ...
}

// bad
public boolean hasBadName(List<String> names) {
    boolean result = false;

    for (String name: names) {
        if (name.contains("bad")) {
            result = true;
            break;
        }
    }
    return result;
}

// bad
public boolean hasBadName(List<String> names) {
    boolean result = false;

    for (String name: names) {
        if (name.contains("bad")) {
            result = true;
            break;
        }
    }
    return result;
}
```

使用return来代替break

```java
// good
public boolean hasBadName(List<String> names) {
    for (String name: names) {
        if (name.contains("bad")) {
            return true;
        }
    }
    return false;
}
```

## 写直观的代码

```java
// bad
if (action1() || action2() && action3()) {
  ...
}

// good
if (!action1()) {
  if (action2()) {
    action3();
  }
}
```

## 写无懈可击的代码，覆盖所有可能出现的情况

```java
// bad
String s = "";
if (x < 5) {
  s = "ok";
}

// good
String s;
if (x < 5) {
  s = "ok";
} else {
  s = "";
}
```

## 正确处理错误

正确处理null指针

尽量不要产生null指针

不要catch NullPointerException

不要把null放进“容器数据结构”里面

函数调用者：明确理解null所表示的意义，尽早检查和处理null返回值，减少它的传播

函数作者：明确声明不接受null参数，当参数是null时立即崩溃

## 防止过度工程

先把眼前的问题解决掉，解决好，再考虑将来的扩展问题。

先写出可用的代码，反复推敲，再考虑是否需要重用的问题。

先写出可用 ， 简单 ， 明显没有bug的代码 ， 再考虑测试的问题 。
