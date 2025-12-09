import { Hono } from "hono";
import { cors } from "hono/cors";
import { rateLimiter } from "hono-rate-limiter";
import dotenv from "dotenv";
import { pg } from "./db.js";

dotenv.config();

const app = new Hono();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors("/", {
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  }),
);

/*
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
})
);
*/

// Routes
// get /api/movies
app.get("/api/movies", async (c) => {
  try {
    const rows = await pg`SELECT * FROM Movies`;
    c.status(200);
    return c.json(rows);
  } catch (err) {
    console.error("Error fetching movies:", err);
    c.status(500);
    return c.json({ message: "Server error" });
  }
});

// get /api/movies/:id
app.get("/api/movies/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const rows = await pg`SELECT * FROM Movies WHERE id = ${id}`;
    if (rows.length === 0) {
      c.status(404);
      return c.json({ message: "Movie not found" });
    }
    c.status(200);
    return c.json(rows[0]);
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    c.status(500);
    return c.json({ message: "Server error" });
  }
});

// Start server
Bun.serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running on http://localhost:${PORT}`);
