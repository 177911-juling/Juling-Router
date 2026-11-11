# Catalog System → 现有代码映射

设计稿在 `design/`，本文件只描述“怎么落到现有工程”，不包含实现代码。

## 1. 颜色令牌

| 设计令牌 | 新 CSS 变量 | 现有变量 / Tailwind | 用途 |
|---|---|---|---|
| 纸白 #FAFAF8 | `--paper` | `--bg-base-rgb` / `cyber-bg` | 页面底色 |
| 次级面 #F4F4F1 | `--paper-2` | `--bg-surface-rgb` / `cyber-surface` | 悬停、展开面板 |
| 墨黑 #111214 | `--ink` | `--text-primary-rgb` / `cyber-text` | 主文字 |
| 次级 #6B6F76 | `--muted` | `--text-secondary-rgb` / `cyber-text-secondary` | 元信息 |
| 弱化 #9A9DA2 | `--muted-2` | `--text-muted-rgb` / `cyber-text-muted` | 表头、占位 |
| 细线 #E4E4E1 | `--hair` | `--border-rgb` / `cyber-border` | 1px 分隔 |
| 强调 #2B4EFF | `--accent` | `--accent-rgb` / `cyber-accent` | 当前项、链接、主按钮悬停 |
| 就绪 #4E7A5A | `--ok` | 新增 `--success-rgb` | 状态点 |
| 注意 #B58A3C | `--warn` | `--warning-rgb` | 状态点、额度告警 |
| 错误 #B4544A | `--err` | `--error-rgb` | 状态点、错误 |

深色对应 `[data-theme='dark']` 覆盖同一组变量，现有 `themeStore` 已按 `data-theme` 切换，可直接接。

## 2. 字体与间距

| 设计 | 值 | 落点 |
|---|---|---|
| UI 字体 | Inter + 思源黑体 | `tailwind.fontFamily.sans`，字体文件已在 `public/fonts` |
| 元信息 | JetBrains Mono | `fontFamily.mono`，现有 `CascadiaMono` 保留回退 |
| 页码 / 编号 | 11px mono | 新 `.row-index` |
| 标题 | 36 / 24 / 18 / 15 | 现有 `h1/h2` 重写 |
| 基线 | 8px | 间距统一 `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` |
| 边距 | 72 / 40 / 24 | 1440 / ≤1180 / ≤900 三档 |
| 行高 | 64px | 台账行，现有卡片行高约 56–72 |

## 3. 组件映射

| 新组件 | 现在的位置 | 处理方式 |
|---|---|---|
| 顶部索引条 | `components/Sidebar.tsx` + `TitleBar.tsx` | 新建 `TopIndex`，删除 `Sidebar` 与 `NavItem` |
| 台账行 | 各页卡片列表 | 新建 `Row`（grid 列由页面传入），替换 `ModelCard`、账号卡片、应用卡片 |
| 行内详情 | `ResizablePanels` 右栏 + `AppManagerBottom` | 新建 `RowDetail`，删除右栏与底部动作条 |
| 分段控件 | `MiniSelect` / `ViewModeTabs` | 新建 `Segmented`（0 圆角、1px 边框） |
| 状态点 | 各页手写 | 统一 `StatusDot`（6px），文字由 i18n 提供 |
| 额度细线 | `ModelQuotaSummary` | 改为 74×2px 细线 + 百分比 |
| 轨道图 | 无 | 新建 `RouteTrack`（节点 + 连线 + 健康底线） |
| 波形 | `VoiceInput` | 提取 `Waveform`（56 根 2px 竖线） |
| 热力图 | `ContributionHeatmap` | 改为 52×7、4 档透明度 |
| 表格 | 无 | 新建 `Ledger`（thead + 行 + 响应式列） |
| 设置表单 | `SettingsDialog` | 新建 `SettingsPage`，复用现有 store |

## 4. 页面映射

| 设计稿 | 现有页面 | 备注 |
|---|---|---|
| 01 目录 | `pages/AppManager` | 产品卡片网格 + logo，详情用右侧 sheet |
| 02 路由 | `pages/ModelNexus` + `pages/FreeModels` | 轨道图为主，模型表为辅 |
| 03 身份 | `pages/AccountCenter` + `pages/AppManager/*AccountSection` | 账号卡片合并为台账 |
| 04 通道 | `pages/FreeModels`（智能接入） | 通道卡片 + 负载细线 |
| 05 声音 | `pages/VoiceInput` | 波形坞 + 通道排序 |
| 06 助手 | `pages/MotherAgent` | 文本流 + 工具台账 |
| 07 简报 | `pages/AiPulse` | 信息流 |
| 08 轨迹 | `pages/AiCareer` | 指标 + 热力图 |
| 09 本地 | `pages/LocalServer` | 模型卡片 + 引擎指标 + 日志 |
| 设置 | `components/SettingsDialog` | 改为整页，保留弹窗入口 |

## 5. 交互与状态

- 行悬停：背景 `--paper-2`，操作文字出现；不做位移与阴影。
- 行展开：高度 180ms 展开，详情背景 `--paper-2`，再次点击收起。
- 页签：2px 实线，随内容切换，不做淡入淡出。
- 筛选：保留 URL 状态（与现有 `navigationStore` 一致）。
- 搜索：`⌘K` 打开全局命令条，输入即过滤当前台账。
- 空状态：一句话 + 细线 + 文字链接，不用插图。
- 键盘：`↑/↓` 移动行焦点，`Enter` 展开，`Esc` 收起。

## 6. 实施顺序

1. 令牌与字体：`tailwind.config.js` + `index.css`
2. 顶部索引条与页面骨架（替换 Sidebar / TitleBar）
3. 台账组件与目录页（识别度最高的两步）
4. 路由轨道图
5. 身份 / 通道 / 声音 / 助手
6. 简报 / 轨迹 / 本地 / 设置
7. 深色、窄窗、动效、可访问性
8. 删除旧样式与未使用组件，跑 `tsc` / `vitest` / 截图回归

## 7. 风险

- 台账行替代卡片后，信息密度上升；需要保留搜索与筛选，否则长列表难用。
- 轨道图在窄窗会换行；断点内已隐藏次要列，轨道需横向滚动或折行。
- 设置改为整页后，原弹窗入口需要保留（首次启动、托盘菜单）。
- 现有 4 种语言文案键需要同步新增页面标题与表头。
