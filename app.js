import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// CORS middleware should be before other middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Allow your development server
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
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
app.post("/api/responses", (req, res) => {
  const { issuesIdentified, acpResponse } = req.body;

  // Log the received data
  console.log("New Response:", {
    issuesIdentified,
    acpResponse,
  });

  res.status(200).json({ message: "Response received" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
