import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express application!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
