import { clientResponses } from "./lib/clientResponses.js";
import { knowledgeBase } from "./lib/kb.js";
import { analyseAcpResponsePrompt } from "./lib/prompts.js";
import { azureGptQuery } from "./lib/azureGpt.cjs";

const prompt = analyseAcpResponsePrompt(knowledgeBase, clientResponses);

const azureGptResponse = await azureGptQuery(prompt);

console.log("Azure GPT Response: ", JSON.parse(azureGptResponse));
