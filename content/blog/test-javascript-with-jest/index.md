---
title: 使用 Jest 进行愉快的 JavaScript/TypeScript 测试
date: "2018-01-14T21:02:37.121Z"
description: ""
---

> 一般我们不管是做前端还是后端，为了提高代码的质量，会选择一种测试驱动开发（TDD）的办法来写代码进行单元测试。Jest 是 Facebook 团队开发的一款测试框架，为的是提高开发者的“开发体验”。我们做单元测试的时候需要分解出一个个独立的模块，但是这样做要写很多的 mock 代码（模拟的辅助函数），非常地繁琐，这是行业的一个“痛点”。如果你和我一样很懒，而且认同“懒惰即是美德”、“不要重复你自己（DRY）”这些原则的话，那么 Jest 测试框架就是你最好的选择。如果你用过一些其他测试框架比如 Mocha 和 Jasmine 的话，看一下 Jest 文档就马上会用了。

# Jest 特性

- 性能非常好，快速反馈
- 用法非常简单，3 分钟快速上手
- 容易安装和运行，无需任何配置
- 自带覆盖率统计工具
- 可以在沙盒环境运行
- 自动 watch 你的代码变动并运行测试
- 自动 mock 函数
- 其他测试框架都没有的快照（snapshot）测试
- 非常简单地就能测试异步代码
- Vue,Angular,React 框架等等都能用

# 安装

使用熟悉的 npm

```shell scripts
npm install --save-dev jest
```

或者也可以试一下用 Yarn，总之二选一

```shell script
yarn add --dev jest
```

然后在项目根目录的 `package.json` 配置里面加上这句

```text
"scripts": {
    "test": "jest"
}
```

# 快速上手的例子

引用一下 [Jest 官网](http://facebook.github.io/jest/docs/en/getting-started.html)的例子。假设我们要写一个加法函数，TDD 开发流程第 1 步，先写测试，注意名字要带有 `test`：

```javascript
// sum.test.js
// 导入代码文件，test函数第1个参数是要显示的文字信息，第2个回调函数里面写测试
// expect期望 加法函数 toBe正确的结果
const sum = require("./sum");

test("1加2等于3", () => {
    expect(sum(1, 2)).toBe(3);
});
```

TDD 开发流程第 2 步，我们用 `npm test` 来运行测试，毫无疑问这个测试会失败，因为要测试的函数根本不存在。这是非常正确的做法，因为我们如果要成功，先要学会失败。
TDD 开发流程第 3 步，现在再来实现这个加法函数：

```javascript
// sum.js
// 文件名很重要，你发现命名规律了吗？
// 和测试放在同一个目录，并且要导出
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

然后可以再次运行 `npm test` 来看测试结果：

```
PASS  ./sum.test.js
✓ 1加2等于3 (5ms)
```

TDD 开发流程第 4 步，不断强化你的测试，然后又强化你的代码，重复这 4 个步骤。所谓道高一尺，魔高一丈，测试和代码都会逐渐变得符合你的需求。

> 这篇只是 Jest 入门教程，只讲了一个非常简单的例子，人人都会写，想要了解更多，可以去 Jest 官网http://facebook.github.io/jest查看文档，全都是些一看就懂的例子，不会有特别深奥的东西，全都靠你熟能生巧。
