---
title: 为什么我不建议在 C# 中用下划线 _ 开头来表示私有字段
date: "2020-02-27T23:18:37.121Z"
description: ""
---

我在C#官方文档的 [使用属性](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/using-properties) 里看到这种代码：

```csharp
public class Date
{
    private int _month = 7;  // Backing store

    public int Month
    {
        get => _month;
        set
        {
            if ((value > 0) && (value < 13))
            {
                _month = value;
            }
        }
    }
}
```

这段代码里的 `_month` 是以下划线开头的，用来表示 private。这样做会有什么问题呢？

* 项目混合使用了驼峰命名法与下划线命名法，扰乱了阅读代码的视线
* 不像其他语言（比如 JavaScript），C#本身已经提供了private修饰符，不需要再用下划线 `_` 重复表示 private
* 下划线 `_` 已经用来表示 [弃元](https://docs.microsoft.com/zh-cn/dotnet/csharp/discards) 的功能了，是不是会造成混淆呢？

实际上我简单地使用驼峰命名法，不用下划线 `_` 开头，也不会有什么问题。代码如下：

```csharp
public class Date
{
    private int month = 7;  // Backing store

    public int Month
    {
        get => month;
        set
        {
            if ((value > 0) && (value < 13))
            {
                month = value;
            }
        }
    }
}
```

这样看起来更简洁，更容易理解了。下面同样来自官方文档的 [自动实现的属性](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/auto-implemented-properties) 里的代码就很不错：

```csharp
// This class is mutable. Its data can be modified from
// outside the class.
class Customer
{
    // Auto-implemented properties for trivial get and set
    public double TotalPurchases { get; set; }
    public string Name { get; set; }
    public int CustomerID { get; set; }

    // Constructor
    public Customer(double purchases, string name, int ID)
    {
        TotalPurchases = purchases;
        Name = name;
        CustomerID = ID;
    }

    // Methods
    public string GetContactInfo() { return "ContactInfo"; }
    public string GetTransactionHistory() { return "History"; }

    // .. Additional methods, events, etc.
}

class Program
{
    static void Main()
    {
        // Initialize a new object.
        Customer cust1 = new Customer(4987.63, "Northwind", 90108);

        // Modify a property.
        cust1.TotalPurchases += 499.99;
    }
}
```

事实上，只使用驼峰命名法，不要暴露字段而是使用属性与 get/set 访问器，或者是单纯地起个更好的变量名，你总是可以找到办法来避免用下划线 `_` 开头。

当然啦，如果你的项目早就已经采用了 [微软推荐的代码风格](https://github.com/dotnet/corefx/blob/master/Documentation/coding-guidelines/coding-style.md)，那就要和项目保持一致。
