import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync(".codex-plugin/plugin.json", "utf8"));

test("ships Codex-compatible bundle metadata", () => {
  assert.equal(manifest.name, "Alp River Workflow");
  assert.equal(manifest.skills, "skills");
  assert.ok(fs.existsSync("skills/alp-river/SKILL.md"));
});
