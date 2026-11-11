---
name: Juling Router
description: One control surface for a machine full of AI tools, built as layered glass over a deep signal field.
colors:
  signal-blue: "#5EA4FF"
  signal-blue-on-paper: "#2563EB"
  plot-ink: "#E8EDF4"
  ink-on-paper: "#0F151E"
  instrument-black: "#080A0E"
  well-black: "#06080B"
  panel-black: "#0F1217"
  raised-black: "#181D24"
  hairline: "#262D36"
  blueprint-paper: "#EDF2FB"
  paper-panel: "#FFFFFF"
  paper-raised: "#E4EBF7"
  paper-hairline: "#CDD8E7"
  aurora-blue: "#4A84FF"
  aurora-violet: "#A85CFF"
  aurora-cyan: "#00BEFF"
  lamp-green: "#3FBF7F"
  lamp-yellow: "#E0B31B"
  lamp-red-dark: "#FF7A7C"
  lamp-red-paper: "#B3131A"
typography:
  title:
    fontFamily: "Noto Sans, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    letterSpacing: "0.005em"
    lineHeight: 1.1
  body:
    fontFamily: "Inter, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.01em"
  catalog-code:
    fontFamily: "CascadiaMono, 'JetBrains Mono', Consolas, 'PingFang SC', 'Microsoft YaHei', monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: "0.12em"
  data-value:
    fontFamily: "CascadiaMono, 'JetBrains Mono', Consolas, 'PingFang SC', 'Microsoft YaHei', monospace"
    fontSize: "12px"
    fontWeight: 500
    fontVariantNumeric: tabular-nums
rounded:
  card: "18px"
  row: "12px"
  control: "10–12px"
  dialog: "20px"
  window: "12px"
  affordance: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "28px"
components:
  nav-destination:
    height: "40px active capsule inside a 56px rail"
    code: "mono 10px, 0.12em"
  card:
    radius: "18px"
    fill: "rgba(255,255,255,.07) dark / rgba(255,255,255,.66) light"
    blur: "20px"
  primary-action:
    height: "56px"
    treatment: "signal-blue gradient, 12px radius, one ambient glow"
---

# Design System: Juling Router

## Overview

**Creative North Star: "Vision Glass"**

Juling Router is a layered glass instrument. A deep field carries three soft
aurora lights — blue, violet, cyan — and every working surface floats above it as
frosted glass: translucent cards, luminous 1px edges, deep soft shadows, and
generous 18px corners. The machine's frame is a translucent rail, not an opaque
bar.

Product truth stays: every destination, panel, and row is a cataloged record with
a zero-padded mono index (`01`, `02`, …). The catalog is still visible, but the
material changed from paper and hairlines to glass and light.

Hierarchy is scale + tracking + case, never heavy weight. Page titles sit at
weight 600, body at 13px, and every number, endpoint, and catalog code is mono with
tabular figures.

**Key Characteristics:**

- Deep near-black field with blue/violet/cyan aurora; a pale blue paper negative in daylight
- Frosted glass panes: 18px cards, 20px dialogs, translucent fills, 20px blur
- Luminous 1px edges and a top inner highlight on every glass surface
- One ice-blue signal (`#5EA4FF` / `#2563EB`) for active navigation, selection, primary action, and live data
- Floating rounded glass navigation bar inset 15px from each window edge
- Translucent chrome rail with a pill-shaped active destination
- Soft, deep shadows instead of hard borders; depth from light, not rules
- Mono catalog codes index cards; page heads use a glyph key

## Colors

A cool neutral ramp, one signal blue, and three aurora lights used only in the
field behind the glass.

### Primary

- **Signal Blue** (`#5EA4FF` dark / `#2563EB` paper): active navigation, page index,
  selection borders, primary fills, live dots, focus.

### Field (aurora)

- **Aurora Blue** (`#4A84FF`): upper-left light source; 28% dark, 20% light.
- **Aurora Violet** (`#A85CFF`): upper-right counter-light; 18% dark, 13% light.
- **Aurora Cyan** (`#00BEFF`): lower ambient bounce; 14% dark, 10% light.

The aurora is light, never paint: it may tint the field and show through glass,
but it never becomes a card fill, text color, or button gradient.

### Neutral (dark theme)

- **Instrument Black** (`#080A0E`): app canvas.
- **Well Black** (`#06080B`): deepest wells.
- **Panel Black** (`#0F1217`): opaque fallback panes.
- **Raised Black** (`#181D24`): hover and pressed surfaces.
- **Hairline** (`#262D36`): fallback dividers.
- **Plot Ink** (`#E8EDF4`): primary text.
- **Grey Ink** (`#949FAE`): secondary text.
- **Muted Ink** (`#6A7584`): meta text and resting catalog codes.

### Neutral (light theme)

- **Blueprint Paper** (`#EDF2FB`): tinted canvas so white glass reads as a pane.
- **Paper Panel** (`#FFFFFF`): opaque fallback panes.
- **Paper Raised** (`#E4EBF7`): hover surfaces.
- **Paper Hairline** (`#CDD8E7`): fallback dividers.
- **Ink** (`#0F151E`): primary text.

### State (lamps — always paired with a word)

- **Lamp Green** (`#3FBF7F` / `#168054` paper): live, available.
- **Lamp Yellow** (`#E0B31B` / `#A87A0C` paper): degraded, cooling down.
- **Lamp Red** (`#FF7A7C` / `#B3131A` paper): error, destructive.

### Named Rules

**The One Signal Rule.** Signal blue marks navigation position, selection, the
primary action, focus, and live data. Aurora colors belong to the field only.

**The Glass Depth Rule.** Glass needs something behind it: every frosted pane must
sit over the aurora field or a deeper pane, never over another pane of the same
value.

**The Luminous Edge Rule.** Every glass pane carries a 1px translucent white edge
plus a top inner highlight. Do not replace it with a solid grey border.

## Typography

**Display/Title Font:** Noto Sans / Noto Sans SC (system CJK fallbacks)
**Body Font:** Inter (`cv11`, `ss01`, `ss03`), CJK fallbacks
**Mono/Data Font:** CascadiaMono → JetBrains Mono → Consolas; CJK families before
the generic so Han never resolves to SimSun.

### Hierarchy

- **Page Title** (600, 32px, 1.1): page name beside its rounded glyph key.
- **Body** (400, 13px, 1.55): controls and reading text.
- **Label** (500, 13px): navigation, tabs, buttons.
- **Catalog Code** (400 mono, 10px, 0.12em): navigation and card indices.
- **Data Value** (500 mono, 12–13px, tabular): counts, latency, quotas, endpoints.

### Named Rules

**The Code Number Rule.** Cards carry a zero-padded mono index, blue when active
and muted grey at rest. Page heads and the top navigation are label/glyph-only.

**The No-Bold Hierarchy Rule.** Emphasis comes from size, tracking, case, and
color — weight 500 is the normal ceiling; only page titles use 600.

## Layout

- Shell: 40px title bar → 56px floating top index → page head → work area +
  right inspector (resizable 260–520) → bottom action bar.
- The title bar spans the window; the top index is a separate floating glass bar,
  14px radius, inset 15px from the left and right window edges and 6px below the
  title bar. Its inner padding is 12px. The active destination is a 34px glass
  capsule that overhangs its label by 11px on each side inside the 52.5px rail;
  codes hide below 1120px.
- Page head: rounded mono index + 32px title, actions right.
- Cards sit in the normal flow; glass adds padding and radius, never changes the
  page grid or the control heights.
- Spacing rhythm 4 / 8 / 12 / 16 / 20 / 28. Page gutter 24px, 72px at wide
  widths; panels 16–18px internal; rows 40–56px.

## Elevation & Depth

Depth is real: the field is the deepest layer, opaque panes sit above it, glass
cards float above the field, and dialogs float above everything. Glass carries
`backdrop-filter: blur(20px) saturate(150%)`, a 1px white-alpha edge, an inset top
highlight, and a deep soft drop shadow (`0 30px 70px -42px`). Shadows are always
offset and blurred; no zero-offset colored halos.

### Named Rules

**The One Blur Budget Rule.** Blur belongs to large panes (cards, dialogs, the
chrome rail). List rows use a translucent fill without blur; dozens of blurred
rows are a performance and legibility failure.

## Shapes

- Cards 18px, rows 12px, controls 10–12px, dialogs 20px, window shell 12px.
- Pills are reserved for the active destination capsule and true circular
  affordances (dots, switches, avatars).
- Never square a glass card, and never round a data rule or table divider.

## Components

### Glass Rail

- Title bar: full-width `rgba(chrome, .62)` + 24px blur; hairline lower edge.
- Top index: floating bar with 14px radius, 15px side inset, luminous 1px edge,
  top inner highlight, and a deep soft drop.
- Destination: 13.5px label. Navigation carries no numeric code; codes belong
  to page heads and cards.
- Active: 34px capsule overhanging 11px on each side, signal wash 14%, 1px signal
  edge at 30%, inset top light, soft blue drop. No underline.
- Hover: a faint white wash capsule (dark) or ink wash (light).

### Page Head

- Rounded signal key: 32×32px, solid signal fill, 22px page glyph (LayoutGrid,
  Route, Users, RadioTower, Mic, Bot, Newspaper, ChartLine, Cpu), white/dark ink,
  18px ambient bloom. The key is centered on the title's line box, so tile height
  matches the 32px title.
- 32px/600 title. No ruler ticks or measurement scale — that language is retired.

### Cards

- Frosted: 18px radius, white 7% fill (dark) or white 66% (light), 20px blur,
  1px white-alpha edge, top inner highlight, deep shadow.
- Hover: lift 2px, signal-tinted edge, stronger ambient bloom.
- Selected: signal wash 12%, 1px signal ring, stronger shadow.
- Product logo tiles keep their own light surface and round to 10px.

### Rows

- 12px radius, translucent white 4% (dark) / 50% (light), 1px white-alpha edge.
- Hover: accent edge + 2px rightward shift (visual only), no blur.

### Inputs / Fields

36px tall, translucent recessed surface, 1px white-alpha edge, 10px radius, 13px
text. Caret, selection, checkbox, and range accents are signal blue.

### Dialogs

20px radius, strong blur (28px), translucent surface (86% dark / 82% light),
luminous edge, deep shadow. The backdrop dims without becoming a second design.

## Do's and Don'ts

### Do:

- **Do** pair every status dot with a word or number — state is never color alone.
- **Do** let the aurora show through glass; that is the material's point.
- **Do** use mono for numbers, endpoints, IDs, and codes.
- **Do** keep product and provider icons exactly as shipped — identity assets are
  not restyle targets.
- **Do** keep text contrast ≥4.5:1 against the **composited** glass surface.
- **Do** use one blur budget per screen area; rows stay unblurred.

### Don't:

- **Don't** use neon outlines, scanlines, graph paper, or corner reticles.
- **Don't** put gradients on text or on resting opaque content.
- **Don't** nest glass in glass; put the stronger pane behind the weaker one.
- **Don't** square glass cards or round data rules.
- **Don't** use bold 700 weights for UI labels.
- **Don't** add web-style hover tooltips or change the cursor from system default.
