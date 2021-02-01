---
title: Python 静态类型检查 mypy 示例
date: "2019-09-28T20:55:37.121Z"
description: ""
---

> 以下所有例子都参考了最新版本的 Python 文档与 mypy 文档

## 必备条件

安装最新版本的 Python 和 mypy

要学会按需配置自己的编辑器，比如我的 VSCode 就装好了 Python 和 Pyright 扩展

## 变量

```python
age: int = 1

child: bool
if age < 18:
    child = True
else:
    child = False
```

## 常量

```python
from typing import Final

RATE: Final = 3000

class Base:
    DEFAULT_ID: Final = 0

RATE = 300  # Error: can't assign to final attribute
Base.DEFAULT_ID = 1  # Error: can't override a final attribute
```

## 内置类型

```python
from typing import List, Set, Dict, Tuple, Optional

x: int = 1
x: float = 1.0
x: bool = True
x: str = "test"
x: bytes = b"test"

# 集合类型是首字母大写的
# 元素的类型写在中括号里面（泛型）
x: List[int] = [1]
x: Set[int] = {6, 7}

# 字典需要写出 key 和 value 的类型
x: Dict[str, float] = {"field": 2.0}

# 元组需要写出所有元素的类型
x: Tuple[int, str, float] = (3, "yes", 7.5)

# 用 Optional[] 表示可以为 None 的类型
x: Optional[str] = some_function()
# mypy 可以推断出 if 语句里 x 不能为 None
if x is not None:
    print(x.upper())
# 如果 x 的值不可能为 None, 用 assert
assert x is not None
print(x.upper())
```

## 函数

```python
from typing import Callable, Iterator, Union, Optional, List

def stringify(num: int) -> str:
    return str(num)

def plus(num1: int, num2: int) -> int:
    return num1 + num2

def f(num1: int, my_float: float = 3.5) -> float:
    return num1 + my_float

# callable (函数) 类型
x: Callable[[int, float], float] = f

# 生成器函数会返回可迭代的元素
def g(n: int) -> Iterator[int]:
    i = 0
    while i < n:
        yield i
        i += 1
```

## 类

```python
from typing import ClassVar

class MyClass:
    attr: int
    # 实例变量可以有默认值
    charge_percent: int = 100

    # 什么也不返回，就是返回 None

    def __init__(self) -> None:
        ...

    # 实例方法，省略 self 的类型
    def my_method(self, num: int, str1: str) -> str:
        return num * str1

# 类可以用作类型
x: MyClass = MyClass()

# 类变量
class Car:
    seats: ClassVar[int] = 4
    passengers: ClassVar[List[str]]

# 需要注意还没定义就使用一个类会报错
def f(foo: A) -> int:  # Error
    ...

class A:
    ...

# 你可以使用字符串的形式来规避
def f(foo: "A") -> int:  # OK
    ...
```

## Named tuples 命名元组

```python
from typing import NamedTuple

class Point(NamedTuple):
    x: int
    y: int

p = Point(x=1, y="x")  # Error: Argument has incompatible type "str"; expected "int"
```

## 异步迭代器

```python
from typing import AsyncIterator

async def gen() -> AsyncIterator[bytes]:
    lst = [b async for b in gen()]  # 推断类型是 "List[bytes]"
    yield "no way"  # Error: Incompatible types (got "str", expected "bytes")
```

## 类型别名

```python
AliasType = Union[List[Dict[Tuple[int, str], Set[int]]], Tuple[str, List[str]]]

def f() -> AliasType:
    ...
```

## Dataclasses 数据类

```python
from dataclasses import dataclass, field

@dataclass
class Application:
    name: str
    plugins: List[str] = field(default_factory=list)

test = Application("Testing...")  # OK
bad = Application("Testing...", "with plugin")  # Error: List[str] expected
```

## 泛型

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):    # 泛型
    def __init__(self) -> None:
        self.items: List[T] = []

    def push(self, item: T) -> None:
        self.items.append(item)

    def pop(self) -> T:
        return self.items.pop()

    def empty(self) -> bool:
        return not self.items

# Stack[int] 实例
stack = Stack[int]()
stack.push(2)
stack.pop()
stack.push("x")        # Type error
```

## Literal types

```python
PrimaryColors = Literal["red", "blue", "yellow"]
SecondaryColors = Literal["purple", "green", "orange"]
AllowedColors = Literal[PrimaryColors, SecondaryColors]

def paint(color: AllowedColors) -> None: ...

paint("red")        # OK
paint("turquoise")  # Error
```

## Protocol 协议

实现结构化子类型（静态鸭子类型），可以当成接口一样用。

```python
from typing import Iterable, Protocol

class SupportsClose(Protocol):
    def close(self) -> None:
       ...  # 函数体可以为空 (explicit '...')

class Resource:  # 没有写 SupportsClose
    def close(self) -> None:
       self.resource.release()

def close_all(items: Iterable[SupportsClose]) -> None:
    for item in items:
        item.close()

close_all([Resource(), open("some/file")])  # OK
```

## Abstractmethod 抽象方法

方法可以有默认的实现，但是抽象方法规定必须在子类中实现。

```python
from typing import Protocol
from abc import abstractmethod

class Example(Protocol):
    def first(self) -> int:
        return 42

    @abstractmethod
    def second(self) -> int:  # 没有默认实现
        raise NotImplementedError  # 防止这个方法被调用
```

## Enum 枚举

如果要像 C 语言一样定义枚举的话，也是用类来实现的。

```python
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2
    BLUE = 3

print(Color.RED)
```

这样就能用类当成枚举一样用了。

## 参考资料

- [mypy 官方文档](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)
- [PEP 484](https://www.python.org/dev/peps/pep-0484/) type hints including generics
- [PEP 526](https://www.python.org/dev/peps/pep-0526/) syntax for variable annotations
- [PEP 544](https://www.python.org/dev/peps/pep-0544/) structural subtyping
- [PEP 589](https://www.python.org/dev/peps/pep-0589/) typed dictionaries
