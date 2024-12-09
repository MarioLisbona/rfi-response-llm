import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { replyToRfiAndResponse } from "./analyseResponse.js";

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://els-test-llm-auditor-notes-6079ecd68297.herokuapp.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.static("public"));

// Serve index.html at root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint
app.post("/api/responses", async (req, res) => {
  const { issuesIdentified, acpResponse } = req.body;

  try {
    const clientResponse = {
      issuesIdentified,
      acpResponse,
    };

    const aiResponse = await replyToRfiAndResponse(clientResponse);

    res.status(200).json({
      original: clientResponse,
      analysis: aiResponse,
    });
  } catch (error) {
    console.error("Error processing response:", error);
    res.status(500).json({
      error: "Failed to process response",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
