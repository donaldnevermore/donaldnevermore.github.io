---
title: Python 一键安装全部依赖包
date: "2017-10-15T01:25:37.121Z"
description: ""
---

## 使用 pip

`requirements.txt` 用来记录项目所有的依赖包和版本号，只需要一个简单的 pip 命令就能完成。

```shell script
pip freeze > requirements.txt
```

生成的文件会像这个样子

```text
alembic==1.0.10
blinker==1.4
Click==7.0
dominate==2.3.5
Flask==1.0.3
```

然后就可以用

```shell script
pip install -r requirements.txt
```

来一次性安装 requirements.txt 里面所有的依赖包，真是非常方便。

## 使用 Python3 的 venv

创建虚拟环境

```shell script
python -m venv env
```

激活虚拟环境

```shell script
. env/bin/activate
```

## 使用 poetry 包管理

`poetry` 的工作方式就像 Node.js 里的 npm/yarn。

首先用 `pip install poetry` 来安装它，可以用 `poetry new [name]` 来生成新项目，或者在项目的根目录下面运行 `poetry init` 来初始化。

这样 `poetry` 会在这个项目里创建一个 `pyproject.toml` 的文件，就像 `package.json` 一样，里面记录了项目所有的依赖包版本信息。

```text
[tool.poetry]
name = "my-package"
version = "0.1.0"
description = "The description of the package"

[tool.poetry.dependencies]
python = "~2.7 || ^3.2"  # Compatible python versions must be declared here
toml = "^0.9"

[tool.poetry.dev-dependencies]
pytest = "^3.0"

[tool.poetry.scripts]
my-script = 'my_package:main'
```

`poetry install` 可以一键安装所有依赖包，还会生成 `poetry.lock` 文件，里面记录了这次安装时的依赖包。`poetry install --no-dev` 可以只安装生产环境的包，不安装开发环境的包。

在 `poetry add [name]` 可以安装 Flask 到生产环境，比如 `poetry add flask`，再加 `--dev` 参数，`poetry add --dev flask` 就会安装到开发环境。

`poetry remove [name]` 可以卸载依赖包，`poetry show` 可以显式安装好的包。

更多用法请查看 [poetry](https://github.com/sdispater/poetry)。
