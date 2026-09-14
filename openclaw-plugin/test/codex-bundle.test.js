import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync(".codex-plugin/plugin.json", "utf8"));

test("ships Codex-compatible bundle metadata", () => {
  assert.equal(manifest.name, "forge");
  // upstream uses array, preserve as-is
  assert.ok(Array.isArray(manifest.skills));
  // path changed from upstream merge
  assert.ok(fs.existsSync("skills/forge-codex/SKILL.md"));
});
