import express from "express";
import cors from "cors";
import { replyToRfiAndResponse } from "./analyseResponse.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware should be before other middleware
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "https://els-test-llm-auditor-notes-6079ecd68297.herokuapp.com/",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from public directory
app.use(express.static("public"));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express application!" });
});

// Add new responses endpoint
app.post("/api/responses", async (req, res) => {
  const { issuesIdentified, acpResponse } = req.body;

  // Log the received data
  console.log("Received Request:", {
    issuesIdentified,
    acpResponse,
  });

  try {
    // Create client response object
    const clientResponse = {
      issuesIdentified,
      acpResponse,
    };

    // Get AI analysis response
    const aiResponse = await replyToRfiAndResponse(clientResponse);

    // Log the AI response
    console.log("AI Response:", aiResponse);

    // Send both the original data and AI response back to client
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
