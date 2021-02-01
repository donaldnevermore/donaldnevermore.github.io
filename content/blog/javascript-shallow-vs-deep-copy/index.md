---
title: JavaScript 浅复制和深复制
date: "2019-09-28T20:54:32.169Z"
description: ""
---

浅复制只会复制第一层的元素，嵌套的元素还是原来的引用。

```javascript
const obj = { a: 1, b: 2 };
const copyObj = Object.assign({}, obj);

const arr = [1, 2, 3];
const copyArr = arr.slice();
```

深复制会每一层都递归复制。

```javascript
function deepCopy(obj) {
    // 处理简单类型，null 和 undefined
    if (obj == null || typeof obj !== "object") {
        return obj;
    }

    // 处理日期
    if (obj instanceof Date) {
        let copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // 处理数组
    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // 处理函数
    if (obj instanceof Function) {
        const copy = function() {
            return obj.apply(this, arguments);
        };

        return copy;
    }

    // 处理对象
    if (obj instanceof Object) {
        let copy = {};

        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(obj[attr]);
            }
        }

        return copy;
    }

    throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}
```
