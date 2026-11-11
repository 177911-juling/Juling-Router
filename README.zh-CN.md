<p align="center">
  <img src="docs/icon.png" alt="Juling Router 应用图标" width="128" />
</p>

<h1 align="center">Juling Router</h1>

<p align="center"><strong>一个桌面窗口，装好、启动并随时改接所有 AI 编程工具 —— 共用同一套模型目录。</strong></p>

<p align="center">
Juling Router 是一个开源桌面控制台，用来统一管理 AI 工具与大模型服务。它能安装并启动 20 多款 AI CLI 与桌面应用，切换模型时直接改写各工具的原生配置；把 ChatGPT / Codex CLI / Claude Code 的多个账号与额度集中管理；在本机提供 OpenAI 与 Anthropic 兼容端点并自动故障转移；也可以直接运行本地模型。支持 Windows、macOS 与 Linux，基于 Tauri + Rust。
</p>

<p align="center">
  <a href="https://github.com/177911-juling/Juling-Router/releases">
    <img src="https://img.shields.io/github/v/release/177911-juling/Juling-Router?style=flat-square&color=D97757" alt="最新版本" />
  </a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=flat-square" alt="支持 Windows、macOS、Linux" />
  <img src="https://img.shields.io/badge/stack-Tauri%20%2B%20Rust-orange?style=flat-square" alt="Tauri + Rust" />
  <img src="https://img.shields.io/github/license/177911-juling/Juling-Router?style=flat-square" alt="Apache-2.0 许可" />
  <img src="https://img.shields.io/github/stars/177911-juling/Juling-Router?style=flat-square" alt="GitHub Stars" />
</p>

<p align="center">
  <a href="https://www.177911.com">官网</a> ·
  <a href="https://github.com/177911-juling/Juling-Router/releases/latest">下载</a> ·
  <a href="https://www.177911.com/support/">支持项目</a> ·
  <a href="README.md">English README</a>
</p>

> 本 GitHub 仓库是分发渠道之一，也是公开的 issue 反馈入口。产品页面、公告与商业合作请访问 [www.177911.com](https://www.177911.com)。

---

## 为什么做这个

AI 工作流天生是散的。Claude Code、Codex CLI、Cursor、ChatGPT 桌面端各自保存配置、各自登录、各自显示额度；换一台电脑就要从头再来一遍，某个服务出问题又得逐个文件去改。

Juling Router 把这些收进一个桌面界面：一份统一的服务与模型目录、一个应用安装与启动入口、一处账号与模型切换开关，以及一个在上游异常时仍能继续工作的本地端点。

## 一览

| 能力 | 解决什么 |
| --- | --- |
| **应用管理** | 安装、更新并启动 20 多款 AI CLI 与桌面应用；知道每个工具装在哪、配置写在哪 |
| **统一模型目录** | OpenAI 兼容接口、Anthropic、Gemini、DeepSeek、中转与私有服务配置一次，所有支持的工具共用 |
| **一键切模型** | 在目录里选好模型，自动改写工具原生配置（`~/.claude`、`~/.codex`、`~/.grok/config.toml`、`~/.kimi-code/config.toml` 等），不用手改 TOML / JSON |
| **账号中心** | ChatGPT、Codex CLI、Claude Code 多账号浏览器登录，查看套餐与额度，随时刷新或删除 |
| **自动路由** | 本机提供 OpenAI Chat Completions 与 Anthropic Messages 端点，按你设定的顺序尝试，限流或故障时自动切换 |
| **本地大模型** | 按硬件选择运行时，下载模型，一键启动，全程留在本机 |
| **更多** | 语音输入、对话助手、AI 简报、用量面板、社区插件与 Token 宠物 |

## 一个窗口管理所有 AI 工具

「应用」页是起点：检测已安装的工具，为其余工具提供一键安装，启动时不用再翻快捷方式。所有支持的工具都走同一套模型目录，操作始终是：选服务、选模型、启动、切换。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/desktop-cn-dark.png">
  <img alt="Juling Router 应用页与应用商店" src="docs/screenshots/desktop-cn-light.png" width="100%">
</picture>

编程 CLI 如 **Claude Code**、**Codex CLI**、**Grok Build**、**Kimi CLI**、**Qwen Code**、**Aider**、**OpenCode**、**MiMo Code**、**Kilo Code**、**ZCode**、**OpenClaw**、**Pi**、**Vibe-Trading** 都按其原生配置文件处理；桌面端包括 **Claude Desktop**（3P 配置）、**ChatGPT Desktop**、**Kimi Desktop**、**OpenCode Desktop**、**OpenScience** 与 **WorkBuddy**。

## 一套模型目录，处处复用

「路由」页（模型中心）是唯一的数据源。添加 OpenAI、Anthropic、Gemini、DeepSeek、兼容的第三方 API、中转服务或本地模型，先测延迟再决定是否启用，然后把任何受支持的工具指向它。服务或密钥改一次，所有引用它的工具同步生效。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/model-cn-dark.png">
  <img alt="Juling Router 路由页（模型中心）" src="docs/screenshots/model-cn-light.png" width="100%">
</picture>

模型 API Key 使用 AES-256-GCM 加密保存，并与本机绑定，不会离开你的电脑。

## 多账号与额度

需要轮换登录的工具，可以保存多个账号，再决定这次启动用哪一个：

- **ChatGPT Desktop 与 Codex CLI** —— 通过浏览器登录添加 OpenAI 账号；两者共用本地 Codex 账号配置，选中哪个账号，两者一起生效。
- **Claude Code** —— 浏览器授权后选择账号启动；服务商提供数据时，会显示套餐、5 小时与 7 天剩余额度及重置倒计时。
- **额度面板** —— 刷新用量、看出哪个账号耗尽、删除不再使用的账号，都在同一处完成。

账号切换改变的是登录身份；下面的自动路由管理的是模型端点。按任务需要选择即可，想用第三方 API 时也可以直接换成模型服务。

## 上游出故障也不中断的本地端点

自动路由（Auto Router）把最多 20 个已配置模型放在同一个本地 API 后面。拖动卡片排定优先级；请求先走第一个模型，遇到限流、额度耗尽或临时不可用就自动转下一个；冷却结束后，再按顺序重新尝试。

- **一个端点，两种协议** —— OpenAI Chat Completions 与 Anthropic Messages，兼容 Claude Code 等客户端。
- **顺序由你决定** —— 按设定优先级执行，不按价格或任务类型猜测。
- **不用重填密钥** —— 直接复用模型中心里已配置的模型。

ChatGPT Desktop 与 Codex CLI 的第三方模型需要 Responses API，自动路由暂不提供；这类工具请使用账号切换，或直接接入支持 Responses 的服务商。

## 模型不离开本机

「本地」页会检测硬件、选择合适的运行时、下载量化模型并启动服务，整个过程都在本机完成，不上传到托管服务商。

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/localllm-cn-dark.png">
  <img alt="Juling Router 本地模型商店" src="docs/screenshots/localllm-cn-light.png" width="100%">
</picture>

## 不止是启动器

- **语音输入** —— 语音转文字，并可在开启文本智能优化后使用划词翻译与提问。
- **助手** —— 对话式安装与排障，带快捷指令与 SSH 服务器管理。
- **简报** —— 每日 AI 资讯，在同一应用内阅读。
- **轨迹** —— 汇总各编程工具的会话、消息与 Token 用量。
- **插件中心（开发者预览）** —— 从 GitHub、GitCode/CNB 或本地目录安装经过审核的社区插件、主题与文本处理器。
- **Token 宠物** —— 随使用量成长的小搭档。

<table>
  <tr>
    <td align="center" width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/agent-cn-dark.png">
        <img alt="Juling Router 助手" src="docs/screenshots/agent-cn-light.png" width="100%">
      </picture>
      <br><sub>助手</sub>
    </td>
    <td align="center" width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/screenshots/career-cn-dark.png">
        <img alt="Juling Router 轨迹（AI 生涯）" src="docs/screenshots/career-cn-light.png" width="100%">
      </picture>
      <br><sub>轨迹</sub>
    </td>
  </tr>
</table>

## 支持的工具

**一键安装 + 一键切模型** —— 由 Juling Router 改写工具自己的配置。

编程 CLI：Claude Code · Codex CLI（OpenAI） · Grok Build（xAI） · Kimi CLI（月之暗面） · Qwen Code · Aider · OpenCode · MiMo Code（小米） · Kilo Code · ZCode（Z.AI） · OpenClaw · Pi · Vibe-Trading

桌面应用：Claude Desktop（3P 配置） · ChatGPT Desktop · Kimi Desktop · OpenCode Desktop · OpenScience · WorkBuddy（腾讯 CodeBuddy）

**一键安装与启动，模型选择由应用自身完成**

Hermes Desktop · Claude Science · Cursor · VS Code · Gemini Desktop · Coffee CLI

## 安装

**Windows**（PowerShell）

```powershell
irm https://www.177911.com/install.ps1 | iex
```

**macOS / Linux**

```sh
curl -fsSL https://www.177911.com/install.sh | sh
```

脚本会自动识别系统、下载对应安装包；已是最新版本时直接跳过。

也可以手动下载：

| 平台 | 安装包 |
| --- | --- |
| Windows x64 | `JulingRouter_<ver>_Windows_x64-setup.exe` |
| macOS（Apple Silicon） | `JulingRouter_<ver>_macOS_arm64.dmg` |
| Linux x64 · Debian/Ubuntu | `JulingRouter_<ver>_Linux_x64.deb` |
| Linux arm64 · Debian/Ubuntu | `JulingRouter_<ver>_Linux_arm64.deb` |
| Linux x64 · Fedora/RHEL | `JulingRouter_<ver>_Linux_x64.rpm` |
| Linux arm64 · Fedora/RHEL | `JulingRouter_<ver>_Linux_arm64.rpm` |

版本列表：<https://github.com/177911-juling/Juling-Router/releases/latest>

## 从源码构建

依赖：Node.js 22+、Rust 1.93（见 `rust-toolchain.toml`），以及 Tauri 的平台构建环境（Windows 需要 MSVC 与 WebView2，macOS 需要 Xcode 命令行工具，Linux 需要 WebKitGTK）。

```sh
git clone https://github.com/177911-juling/Juling-Router.git
cd Juling-Router
npm install
npm run dev     # 启动 Tauri 开发窗口
npm run build   # 生成正式安装包
```

CI 使用的质量检查：

```sh
npm run format:check && npm run typecheck && npm run lint && npm test
cd src-tauri && cargo fmt --check && cargo clippy --all-targets --all-features -- -D warnings && cargo test
```

## 常见问题

**它是代理或 VPN 吗？**
不是。它是一个桌面管理器：写入 AI 工具本来就会读取的配置文件；可选在本机开一个 OpenAI / Anthropic 兼容端点。没有任何流量被转发到远端服务。

**怎么给 Claude Code 或 Codex CLI 换模型？**
在「路由」（模型中心）里添加服务，然后给工具选择对应条目。Juling Router 会改写工具的原生配置，不需要手改 TOML / JSON。

**API Key 和账号保存在哪里？**
都在本机。模型 API Key 用 AES-256-GCM 与机器绑定密钥加密；账号数据保存在应用自己的目录，不会上传。

**自动路由会轮换账号吗？**
不会，它轮换的是**模型端点**。ChatGPT、Codex CLI、Claude Code 的登录身份请在账号中心切换。

**能接入自建或第三方的 OpenAI 兼容接口吗？**
可以。任何 OpenAI 或 Anthropic 兼容端点都能作为模型加入，包括本机服务。

**支持哪些平台？**
Windows x64、Apple Silicon 版 macOS，以及 Linux x64/arm64（Deb/RPM）。

## 赞助商

<table>
  <tr>
    <td width="150" align="center">
      <img src="docs/sponsors/juling-api.png" width="92" alt="聚灵API交易平台" />
    </td>
    <td>
      <a href="https://www.177911.com"><strong>聚灵API交易平台</strong></a> —— 模型 API 交易平台<br/>
      感谢 <strong>聚灵API交易平台</strong> 赞助了本项目！一个 API Key 即可让应用商店里的工具接入模型中心收录的模型，免去多账号切换。与聚灵路由器同一团队维护。
    </td>
  </tr>
</table>

赞助联系：[hi@177911.com](mailto:hi@177911.com)

## 许可与品牌

**Juling Router v1.0.0** 的源代码采用 [Apache License 2.0](LICENSE) 发布，可自由复刻、审计与二次开发；署名要求见 [NOTICE](NOTICE)。

**品牌与外观** 与代码许可相互独立。**Juling Router** 名称、标识，以及多个用户界面组合形成的整体外观，归 177911-juling 所有；_Model Nexus_ / _模型中心_ 等描述性功能名仅作为该整体外观的一部分受到保护。复刻时可以在如实注明上游的前提下保留品牌（例如 "Juling Router Community Edition by X"），也可以完全改名，但需保留 NOTICE 署名。以 "Juling Router" 名义做商业 SaaS 或上架应用商店需要授权，也不得把本代码说成从零自研。完整规则见 [TRADEMARKS.md](TRADEMARKS.md)。

---

<p align="center">
  由 Juling Router 团队构建<br>
  <sub>⭐ <a href="https://github.com/177911-juling/Juling-Router">给仓库点个 Star</a> · <a href="README.md">English README</a></sub>
</p>
