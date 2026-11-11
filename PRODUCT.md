# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing Tauri 2 desktop app: React 18 + TypeScript + Vite + Tailwind CSS 3 frontend in `src/`, Rust backend in `src-tauri/`. Frameless Windows/macOS/Linux desktop window with a custom title bar.

## Users

Two audiences, both served by one UI:

- **Individual developers and heavy AI users** running the app on their own machine for long stretches: installing and repairing agent tools, configuring model providers, watching account quota, running local LLMs, using voice input, launching desktop AI apps and games.
- **Team tooling maintainers** who configure models and accounts for other people, diagnose routing/quotas, and expect the same screens to hold up under repeated administrative work.

Both read Chinese, English, or Japanese; the UI ships all three.

## Product Purpose

Juling Router is an all-in-one AI desktop hub: one-click install and repair for Agent tools (Claude Code, Codex CLI, DeepSeek Harness, OpenClaw, Hermes Agent and others), a unified model data hub shared by every scenario, multi-account switching with quota visibility, priority routing with automatic failover, a local LLM runner, a plugin hub, voice input, and a token pet. Success means a user can install, configure, switch, and diagnose every AI tool from one window without terminal archaeology — and see the state of the machine at a glance.

## Positioning

One local model data hub plus many launch surfaces. Configure a provider or account once and every app, agent, router group, and local server picks it up; a local smart router exposes many models behind one endpoint with explicit priority and automatic failover. A neighbouring single-purpose client cannot copy the unified-hub mechanism without rebuilding its data model.

## Operating Context

- Long-running desktop window, usually kept open beside editors, terminals, and agent clients.
- Frequent tasks: launch an app or agent, choose an account, check/refresh quota, add a model, reorder router priority, start/stop a local model server, install a plugin, read AI news, dictate text.
- Users compare this app against professional developer tools: IDE sidebars, dashboards, terminals, and system utilities.
- Player/companion surface exists (Pets) and must remain reachable without weakening the tool's seriousness.

## Capabilities and Constraints

- Must preserve every existing feature, entry point, workflow, dialog, state, keyboard path, and setting. This is a visual and compositional redesign only.
- Must preserve the built-in product/tool icons exactly (Claude, ChatGPT, Cursor, DeepSeek, Qwen, etc.) — they are identity assets, not restyle targets.
- Must preserve the app icon, product name, and existing tray/window behaviour.
- Light and dark themes both ship and both must be first-class; theme switching, color themes, and plugin-supplied palettes keep working.
- Chinese/English/Japanese copy stays; no new language dependency. No new runtime framework, no font downloads beyond the fonts already bundled in `public/fonts/`.
- Desktop conventions apply: no new hover-only tooltips, no cursor changes, 48px account rows, 8px/6px legacy radii remain available to untouched code.

## Brand Commitments

- Product name Juling Router, existing logo and product icons.
- The interface accent colour changes to the ice-blue family; coral is retired from the UI (external README/website assets are out of scope).
- Users explicitly asked for a look that is visibly different from the previous warm-charcoal/coral Claude-like styling: more professional, more beautiful, more spacious.

## Evidence on Hand

- Real screenshots of the previous UI: `docs/screenshots/desktop-cn-dark.png`, `desktop-cn-light.png`, plus agent/model/router/local-LLM captures in the same directory.
- Bundled fonts: `public/fonts/inter-{400,500,600,700}.woff2`, `CascadiaMono-Regular.woff2`, `JetBrainsMono-*.ttf`, `NotoSans-*.ttf`, `Lora-BoldItalic.woff2`.
- Product icons under `public/icons/` and `src/data/` catalogs; these are the pinned assets.
- No verified customer quotes, benchmarks, or pricing claims; none may be invented.

## Product Principles

1. **State at a glance.** Running, selected, failing, or cooling down is read from composition and colour, not from a paragraph.
2. **Density with air.** Power users need many rows; the page still breathes through rhythm, alignment, and typographic hierarchy rather than dividers everywhere.
3. **One hub, many surfaces.** Model, account, and router data look the same wherever they appear.
4. **A tool, not a toy.** Personality (Pets, character art) is a module, never the frame around the work.
5. **Nothing disappears.** A redesign may move, regroup, and restyle; it may not delete a capability or bury an entry point.
