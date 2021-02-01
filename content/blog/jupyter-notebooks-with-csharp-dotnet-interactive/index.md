---
title: 基于 Jupyter Notebooks 的 C#/.NET Interactive 安装与使用
date: "2019-11-06T09:10:03.284Z"
description: ""
---

.NET Interactive发布预览版了，可以像Python那样用jupyter notebooks来编辑C#代码。具体可以在GitHub上查看[dotnet/interactive](https://github.com/dotnet/interactive)项目。

## 安装步骤

* 安装好.NET Core 3.1 SDK
* 安装好Python 3（默认有pip）
* 安装Jupyter

```shell script
pip install jupyter
```

* 在命令行检查Jupyter是否正确安装

```shell script
jupyter kernelspec list
```

* 可以安装.NET Interactive了

```shell script
dotnet tool install -g --add-source "https://dotnet.myget.org/F/dotnet-try/api/v3/index.json" Microsoft.dotnet-interactive
dotnet interactive jupyter install
```

* 再次用`jupyter kernelspec list`查看检查安装好的.NET版本Jupyter，输出如下

```text
  .net-csharp       ~\jupyter\kernels\.net-csharp
  .net-fsharp       ~\jupyter\kernels\.net-fsharp
  .net-powershell   ~\jupyter\kernels\.net-powershell
  python3           ~\jupyter\kernels\python3
```

* 新建个项目并打开Jupyter Notebooks

```shell script
mkdir yourapp
cd yourapp
jupyter notebook
```

* 现在可以愉快地使用了，截图如下就OK了

![Jupyter Notebooks界面](https://upload-images.jianshu.io/upload_images/7497660-2d685cc4711f7448.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
