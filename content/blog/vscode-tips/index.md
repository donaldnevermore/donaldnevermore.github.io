---
title: 前端开发神器 VSCode 使用总结
date: "2018-01-14T20:17:03.284Z"
description: ""
---

> VSCode 是微软出品的，基于 Electron 和 TypeScript 的，集成了 git 版本管理和命令行终端，而且开源稳定，插件丰富，再搭配一款 Chrome 浏览器，可以说是`前端开发神器`了。

## 安装指南

VSCode 需要用到 `node.js` 和 `git`，如果没有就到[https://nodejs.org/en/download/](https://nodejs.org/en/download/)下载 node.js，然后到[https://git-scm.com/downloads](https://git-scm.com/downloads)下载并安装 git，注意自己的系统版本，最后到[https://code.visualstudio.com](https://code.visualstudio.com)下载 vscode 并安装好。

![https://code.visualstudio.com](https://upload-images.jianshu.io/upload_images/7497660-d19dd8b7c4bb1cb4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 推荐插件

```text
project manager // 项目管理
prettier // 自动格式化你的代码
gitlens // 查看 git 修改记录
bracket pair colorizer2 // 彩色括号匹配
code spell checker // 单词拼写检查
eslint // javascript 代码风格检查工具
git history // git 历史
npm intellisense // npm 自动补全
path intellisense // 自动补全文件路径
material icon theme // 好看的图标
highlight matching tag // 高亮匹配标签
better toml // toml 文件支持
auto rename tag // 自动重命名标签
auto close tag // 自动关闭标签
debugger for chrome // 在 chrome 里调试
visual studio intellicode // 智能补全
Markdown All in One // 写 markdown 神器
ES7 React/Redux/GraphQL/React-Native snippets // react 代码简写
react native tools // 写 react native
vetur // 写 vue
javascript(es6) code snippets // javascript 代码简写
```

## 推荐快捷键

```text
F1 打开可以输入命令
F2 重命名变量，方便重构
F5 运行和调试代码
F12 去到定义的地方
shift+F12 查找所有引用
ctrl+g 会让你输入数字，快速定位到指定行
ctrl+enter 在下方另起一行
crtl+f 查找
ctrl+shift+n 多开一个 vscode 编辑器
ctrl+b 开关侧边栏
ctrl+h 替换
ctrl+r 打开最近文件
ctrl+` 终端
ctrl+tab 切换文件
ctrl+shift+e 切到资源管理器
ctrl+p 快速打开文件
ctrl+[  左移代码
ctrl+]  右移代码
ctrl+/ 行注释
ctrl+t 匹配文本来打开文件
ctrl+shift+t 重新打开关闭的文件
ctrl+shift+home/end 选择光标左侧/右侧全部内容
ctrl+backspace 删除上一个词
ctrl+delete 删除光标右侧的词
ctrl+左/右 跳到上/下一个词
ctrl+shift+左/右 逐个选词
鼠标滚轮或者shift+alt+鼠标拖拽 批量选中，方块选择
ctrl+shift+pageup/pagedown 切换文件
ctrl+d 选中当前词语
ctrl+enter 下方插入一行
alt+左/右箭头 跳回来/过去
alt+shift+上/下箭头 向上/下复制行
```
