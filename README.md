# OpenClaw Alp River

OpenClaw adaptation of Alp River-style staged agent workflows: S/M/L/XL classification, specialist fan-out, review gates, and self-heal loops.

This repository is intended to be published as a ClawHub skill first, then used as the spec for Sage Router advisory metadata and a future OpenClaw plugin.

Source inspiration: https://github.com/alp82/alp-river

## OpenClaw plugin adapter

This fork includes an OpenClaw plugin adapter for Alp River-style staged workflow guidance.

Install locally from the repository root:

```bash
openclaw plugins install --link /path/to/alp-river
openclaw plugins enable alp-river
```

The adapter:

- classifies prompts into `S`, `M`, `L`, or `XL` workflow tiers
- injects compact `before_prompt_build` guidance
- exposes `alp_river_classify_task` as an optional tool
- recommends specialist roles without directly spawning agents
- keeps local OpenClaw security/workspace instructions higher priority than upstream Alp River defaults

Sage Router may emit matching advisory metadata, but OpenClaw remains the orchestrator.

## Codex compatibility

This repo is also packaged as a Codex-compatible bundle:

- `.codex-plugin/plugin.json` declares the Codex bundle metadata.
- `skills/alp-river/SKILL.md` provides Codex/OpenClaw workflow guidance.
- The native OpenClaw plugin remains primary when OpenClaw loads the repo directly, so existing `before_prompt_build` and `alp_river_classify_task` behavior is preserved.
- The prompt hook now supports Codex-style `messages` events when `prompt` is empty, while still stripping advisory blocks and untrusted metadata before classification.
