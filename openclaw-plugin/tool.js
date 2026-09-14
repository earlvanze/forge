import { classifyWorkflowTier } from "./workflow.js";

export function createClassifyTool() {
  return {
    label: "Forge Task Classifier",
    name: "forge_classify_task",
    description: "Classify a task into Forge S, M, L, or XL workflow tier and return recommended orchestration mode.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        text: { type: "string", description: "Task or prompt text to classify." },
      },
      required: ["text"],
    },
    async execute(_toolCallId, params = {}) {
      const result = classifyWorkflowTier(params?.text || "");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
        details: result,
      };
    },
  };
}
