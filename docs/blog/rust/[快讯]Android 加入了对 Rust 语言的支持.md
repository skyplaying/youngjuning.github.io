---
title: [快讯]Android 加入了对 Rust 语言的支持
cover: 
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

Google 官方安全博客宣布，Android 加入了对 Rust 语言的支持。

Android 平台中代码的正确性是每一个 Android 版本安全性、稳定性和质量的重中之重。C 和 C++ 中的内存安全漏洞仍然是最难解决的不正确性原因。我们投入了大量的人力和物力来检测、修复和缓解这类 bug，这些努力有效¢¢地防止了大量的 bug 混入Android 发行版中。然而，尽管做出了这些努力，内存安全漏洞仍然是造成稳定性问题的首要因素，并且一直占到 Android 高严重性安全漏洞的 70% 左右。

除了正在进行的和即将进行的改善内存错误检测的努力外，我们还在加紧努力在第一时间预防内存错误。内存安全语言是防止内存错误的性价比最高的手段。除了像 Kotlin 和 Java 这样的内存安全语言之外，我们很高兴地宣布，Android 开源项目（AOSP）现在支持 Rust 编程语言来开发操作系统本身。

## 系统编程

像 Java 和 Kotlin 这样的托管语言是 Android 应用开发的最佳选择。这些语言是为易用性、可移植性和安全性而设计的。 [Android Runtime（ART）](https://source.android.com/devices/tech/dalvik) 代表开发者管理内存。Android 操作系统广泛使用 Java，有效地预防了 Android 平台的大部分内存错误。遗憾的是，对于操作系统的底层来说，Java 和 Kotlin 是不能选择的。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a8c9428059b407d988dba5dec44a55f~tplv-k3u1fbpfcp-watermark.image)

底层的操作系统需要 C、C++ 和 Rust 等系统编程语言。这些语言的设计以控制和可预测性为目标。它们提供对底层系统资源和硬件的访问。它们对资源的要求很低，而且具有更多的可预测性的性能特点。

Rust 通过使用编译时检查强制执行对象的声明周期和所有权和运行时检查确保内存访问的有效性相结合的方式提供内存安全保证。这种安全性是在提供与 C 和 C++ 相当的性能的同时实现的。

## 沙盒的局限性

C 和 C++ 语言不提供这些相同的安全保证，并且需要强大的隔离。所有的 Android 进程都是沙箱的，我们遵循 [规则 2](https://chromium.googlesource.com/chromium/src/+/master/docs/security/rule-of-2.md) 来决定功能是否需要额外的隔离和剥夺。规则 2 很简单：给定三个选项，开发者只能选择以下三个选项中的两个。

![](https://1.bp.blogspot.com/-Tc7pHLunD4w/YGucKTCyjTI/AAAAAAAADqU/XxH7V7cuZk8i3dkNOp_XAclqgWbAFczzQCNcBGAsYHQ/s0/The%2Blimits%2Bof%2Bsandboxing%2Bimage.png)

对于安卓系统来说，这意味着如果代码是用 C/C++ 编写的，并且解析了不可信的输入，那么就应该将其控制在一个被严格约束的无权限沙盒内。虽然遵守 “规则 2” 有效地降低了安全漏洞的严重性和可及性，但它也有局限性。沙盒的成本很高：它所需要的新进程会消耗额外的开销，并由于 IPC 和额外的内存使用而引入延迟。沙盒并不能消除代码中的漏洞，而且它的功效会因为高 bug 密度而降低，让攻击者将多个漏洞连锁在一起。

像 Rust 这样的内存安全语言通过两种方式帮助我们克服这些限制。

1. 降低了我们代码内的 bug 密度，从而提高了我们当前沙盒的有效性。
2. 降低了我们对沙盒的需求，允许引入既安全又资源轻量化的新功能。

## 但是，现有的那些 C++ 代码怎么办？

当然，引入一种新的编程语言对于解决我们现有的 C/C++ 代码中的 bug 毫无作用。即使我们把 Android 团队的每一位软件工程师的精力投入到重构中，重写几千万行代码也是根本不可行的。

![](https://1.bp.blogspot.com/-FLRPgsDD5eg/YGucTKpGaVI/AAAAAAAADqc/iu5rDsjhGX09BNRkZ9HU6KRCLJzo9xZtACNcBGAsYHQ/s0/But%2Bwhat%2Babout%2Ball%2Bthat%2Bexisting%2BC%252B%252B%253F%2Bimage.png)

以上对 Android 中内存安全 bug 的生命分析（从首次引入时开始衡量）表明了为什么我们的内存安全语言工作最好集中在新功能的研发上，而不是重写成熟的 C/C++ 代码。我们的大部分内存 bug 都发生在新的或最近修改的代码中，大约 50% 的内存 bug 发生在近一年的时间里。

老的内存 bug 比较少见，这可能会让一些人感到惊讶，但我们发现，老的代码并不是我们最迫切需要改进的地方。软件 bug 是随着时间的推移而被发现和修复的，所以我们希望那些正在维护但不在开发阶段的代码中的 bug 数量会随着时间的推移而减少。就像降低 bug 的数量和密度可以提高沙盒的效果一样，也可以提高 bug 检测的效果。

## 检测的局限性

通过健壮的测试、[卫生处理](https://github.com/rust-lang/rust/pull/81506) 和 [模糊化处理](https://android-review.googlesource.com/c/platform/build/soong/+/1403607/) 进行错误检测对于提高所有软件的质量和正确性至关重要，包括用 Rust 编写的软件。对于最有效的内存安全检测技术来说，一个关键的限制是，错误的状态必须在工具代码中实际触发才能被检测到。即使是在测试/模糊化处理覆盖率很高的代码库中，这也会导致很多 bug 没有被检测到。

另一个限制是 [bug检测的扩展速度比bug修复快](https://lore.kernel.org/dri-devel/20200710103910.GD1203263@kroah.com/)。在一些项目中，[被检测到的 bug 并不总是得到修复](https://syzkaller.appspot.com/upstream)。错误修复是一个漫长而昂贵的过程。

![](https://1.bp.blogspot.com/-yKA0YZzuTrk/YGucd7kEQWI/AAAAAAAADqk/YdqlspJUtZsJ5P5c6l30mKofi0MrvEmfgCNcBGAsYHQ/s0/Limitations%2Bof%2Bdetection%2Bimage.png)

每一个步骤都是代价高昂的，缺失任何一个步骤都会导致部分或所有用户的 bug 得不到修补。对于复杂的 C/C++ 代码库，往往只有少数人有能力开发和审查修复，即使花费大量精力修复 bug，[有时修复的结果也是不正确的](https://googleprojectzero.blogspot.com/2015/09/stagefrightened.html)。

当 bug 比较少见的时候，bug 检测是最有效的，危险的 bug 可以得到应有的紧迫性和优先级。我们要想从错误检测的改进中获得好处，就必须优先防止新错误的引入。

## 优先考虑预防工作

Rust 对一系列其他语言进行了现代化，从而提高了代码的正确性。

- **内存安全**：通过编译时和运行时检查的结合，加强了内存安全。
- **数据并发**：防止数据竞赛。这让用户可以轻松地编写高效的、线程安全的代码，因此产生了 [Rust 无所畏惧的并发性](https://doc.rust-lang.org/book/ch16-00-concurrency.html) 口号。
- **更具表现力的类型系统**：有助于防止逻辑编程错误（如 newtype 包装器、带内容的枚举变体）。
- **默认情况下，引用和变量是不可变的**：帮助开发者遵循最小权限的安全原则，只有当他们真正打算让引用或变量变异时，才会将其标记为可变异。虽然 C++ 有 const，但它往往使用频率不高，而且不一致。相比之下，Rust 编译器通过为从未变异的可变异值提供警告来协助避免杂散的可变异性注释。
- **在标准库中更好的错误处理**：将潜在的失败调用包裹在 `Result` 中，这使得编译器要求用户即使对不返回所需值的函数也要检查失败。这可以防止像 [对牢笼的愤怒](https://android.googlesource.com/platform/system/core/+/44db990d3a4ce0edbdd16fa7ac20693ef601b723%5E%21/) 这样因未处理错误而导致的漏洞。通过使其易于通过 `? ` 操作符传播错误，并优化 `Result` 以实现低开销，Rust 鼓励用户以同样的风格编写他们的易错函数并获得同样的保护。
- **初始化**：要求在使用前对所有变量进行初始化。未初始化的内存漏洞历来是 Android 上 3-5% 的安全漏洞的根本原因。在 Android 11 中，我们开始了 [C/C++ 中自动初始化内存](https://android.googlesource.com/platform/system/core/+/44db990d3a4ce0edbdd16fa7ac20693ef601b723%5E%21/) 来减少这个问题。然而，初始化为零并不总是安全的，特别是对于像返回值这样的东西，这可能成为错误处理的新来源。Rust 要求每个变量在使用前初始化为其类型的合法成员，避免了无意中初始化为不安全值的问题。与 C/C++ 的 Clang 类似，Rust 编译器知道初始化要求，并避免了关于双初始化的任何潜在性能开销。
- **更安全的整数处理** ：Rust debug builds 默认开启溢出清除功能，鼓励程序员在真正打算让计算溢出时指定 `wrapping_add`，或者在不打算溢出时指定 `saturating_add`。我们打算在 Android 的所有构建中启用溢出清理。此外，所有的整数类型转换都是显式的操作：开发者在向变量赋值时，或者在试图用其他类型进行运算时，不能在函数调用过程中意外地转换类型。

## 我们将何去何从

在 Android 平台上添加一种新的语言是一项大工程。需要维护工具链和依赖关系、必须更新的测试基础设施和工具以及需要培训开发人员。在过去的 18 个月里，我们一直在为 Android 开源项目添加 Rust 支持，我们有一些早期采用的项目将在未来几个月内分享。将其扩展到更多的操作系统是一个多年的项目。敬请关注，我们将在这个博客上发布更多更新。

__Java 是 Oracle 或其附属机构的注册商标。__

感谢 Matthew Maurer、Bram Bonne 和 Lars Bergstrom 对本文的贡献。特别感谢我们的同事 Adrian Taylor 对内存漏洞年龄的洞察力，以及 Chris Palmer 对 “规则 2” 和 “沙盒的限制” 部分的编写工作。

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)
