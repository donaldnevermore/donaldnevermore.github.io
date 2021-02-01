---
title: Ubuntu 安装 C# 语言开发环境
date: "2019-10-29T10:37:32.169Z"
description: ""
---

## 使用 Bash 自动化安装

先 [下载 Bash 脚本（Linux/macOS）](https://dot.net/v1/dotnet-install.sh) ，运行脚本

```shell script
./dotnet-install.sh -c Current
```

## 或者使用包管理器安装

```shell script
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo add-apt-repository universe
sudo apt-get update
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install dotnet-sdk-3.1
```

## 或者手动安装

[下载 .NET Core 二进制版本](https://docs.microsoft.com/zh-cn/dotnet/core/install/sdk?pivots=os-linux#all-net-core-downloads) ，终端输入

```shell script
mkdir -p $HOME/dotnet && tar zxf dotnet-sdk-3.1.100-linux-x64.tar.gz -C $HOME/dotnet
```

 在home目录下面的`.bashrc`文件，末尾添加环境变量（如果装了zsh就在`.zshrc`）

```shell script
export DOTNET_ROOT=$HOME/dotnet
export PATH=$PATH:$HOME/dotnet
```

## 安装成功检测

重启终端并输入

```shell script
dotnet --version
dotnet --info
```
