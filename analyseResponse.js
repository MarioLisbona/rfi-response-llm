import { knowledgeBase } from "./lib/kb.js";
import { analyseAcpResponsePrompt } from "./lib/prompts.js";
import { azureGptQuery } from "./lib/azureGpt.cjs";

export const replyToRfiAndResponse = async (clientResponse) => {
  const prompt = analyseAcpResponsePrompt(knowledgeBase, clientResponse);

  const azureGptResponse = await azureGptQuery(prompt);

  console.log("Azure GPT Response: ", JSON.parse(azureGptResponse));

  const response = JSON.parse(azureGptResponse);

  return response;
};
