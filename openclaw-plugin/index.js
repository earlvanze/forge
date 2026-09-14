import { createClassifyTool } from "./tool.js";
import {
  classifyWorkflowTier,
  extractClassifiableTaskText,
  promptTextFromEvent,
  renderWorkflowContext,
  resolveConfig,
} from "./workflow.js";

export default {
  id: "forge",
  name: "Forge Workflow",
  description: "Forge adapter for staged workflow classification and prompt guidance",
  contracts: {
    tools: ["forge_classify_task"],
  },
  register(api) {
    const cfg = resolveConfig(api.pluginConfig);

    if (cfg.registerTool) {
      api.registerTool(() => createClassifyTool(), { names: ["forge_classify_task"] });
    }

    api.on("before_prompt_build", async (event) => {
      const liveCfg = resolveConfig(api.pluginConfig);
      if (!liveCfg.enabled || !liveCfg.injectPromptContext) return undefined;

      const prompt = extractClassifiableTaskText(promptTextFromEvent(event));
      if (!prompt || String(prompt).trim().length < 5) return undefined;

      const result = classifyWorkflowTier(prompt);
      if (liveCfg.debug) {
        api.logger.info?.(`forge: tier=${result.tier} mode=${result.mode}`);
      }
      return { prependContext: renderWorkflowContext(result, liveCfg.minimumRiverTier) };
    });
  },
};
