import { Hono } from "hono";
import { cors } from "hono/cors";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import dotenv from "dotenv";
import { pg } from "./db.js";
import { password } from "bun";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { logger } from "hono/logger";

dotenv.config();

const app = new Hono();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Middleware
app.use(logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  }),
);

// Routes

// get /api/movies
app.get("/api/movies", async (c) => {
  try {
    const rows = await pg`SELECT * FROM Movies`;
    return c.json(rows, 200);
  } catch (err) {
    console.error("Error fetching movies:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// get /api/movies/:id
app.get("/api/movies/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const rows = await pg`SELECT * FROM Movies WHERE id = ${id}`;
    if (rows.length === 0) {
      return c.json({ message: "Movie not found" }, 404);
    }
    return c.json(rows[0], 200);
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// post api/auth/login
app.post("api/auth/login", async (c) => {
  const body = await c.req.json();
  const { email, plainTextPassword } = body;
  if (!email || !plainTextPassword)
    return c.json({ message: "Missing email or password" }, 400);

  try {
    const rows =
      await pg`SELECT username, email, password FROM Users WHERE email = ${email}`;
    if (rows.length === 0)
      return c.json({ message: "Invalid credentials" }, 401);

    const user = rows[0];
    const isMatch = await password.verify(plainTextPassword, user.password);
    if (!isMatch) return c.json({ message: "Incorrect password" }, 401);

    const token = sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    setCookie(c, "authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600, // seconds
    });

    return c.json({ message: "Login successful!" }, 200);
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ message: "Server error" }, 500);
  }
});

// post api/auth/register
app.post("/api/auth/register", async (c) => {
  const { username, email, plainTextPassword } = await c.req.json();

  if (!username || !email || !plainTextPassword)
    return c.json({ message: "Missing required fields" }, 400);

  try {
    const rows = await pg`SELECT email FROM Users WHERE email = ${email}`;
    if (rows.length > 0) return c.json({ message: "User already exists" }, 409);

    const hashedPassword = await password.hash(plainTextPassword, {
      algorithm: "bcrypt",
      cost: 12,
    });

    await pg`INSERT INTO Users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

    return c.json({ message: "User registered successfully" }, 201);
  } catch (err) {
    console.error("Registration error:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// get api/auth/profile
app.get("/api/auth/profile", (c) => {
  const token = getCookie(c, "authToken");
  if (!token) return c.json({ message: "Not authenticated" }, 401);

  try {
    const decoded = verify(token, SECRET_KEY);
    return c.json({ username: decoded.username }, 200);
  } catch (err) {
    console.error("Token error:", err);
    return c.json({ message: "Invalid or expired token" }, 401);
  }
});

// post api/auth/logout
app.post("/api/auth/logout", (c) => {
  deleteCookie(c, "authToken");
  return c.json({ message: "Logged out" });
});

// put /api/user/update-username
app.put("/api/user/update-username", async (c) => {
  const token = getCookie(c, "authToken");
  if (!token) return c.json({ message: "Not authenticated" }, 401);

  const { newUsername } = await c.req.json();
  if (!newUsername) return c.json({ message: "New username is required" }, 400);

  try {
    const decoded = verify(token, SECRET_KEY);
    const currentUsername = decoded.username;

    await pg`UPDATE Users SET username = ${newUsername} WHERE username = ${currentUsername}`;

    const deletedCookie = deleteCookie(c, "authToken");

    if (deletedCookie === undefined) {
      console.log("Cookie cannot be deleted");
      return c.json({ message: "Server error" }, 500);
    }

    const newToken = sign({ username: newUsername }, SECRET_KEY, {
      expiresIn: "1h",
    });

    setCookie(c, "authToken", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600, // seconds
    });

    return c.json({ message: "Username updated successfully" }, 200);
  } catch (err) {
    console.error("Update username error:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// put /api/user/update-password
app.put("/api/user/update-password", async (c) => {
  const token = getCookie(c, "authToken");
  if (!token) c.json({ message: "Not authenticated" }, 401);

  const { currentPassword, newPassword } = await c.req.json();
  if (!currentPassword || !newPassword)
    return c.json({ message: "Current and new passwords are required" }, 400);

  try {
    const decoded = verify(token, SECRET_KEY);
    const username = decoded.username;

    const rows =
      await pg`SELECT password FROM Users WHERE username = ${username}`;
    if (rows.length === 0) return c.json({ message: "User not found" }, 404);

    const storedHashedPassword = rows[0].password;
    const passwordMatch = await password.verify(
      currentPassword,
      storedHashedPassword,
    );
    if (!passwordMatch)
      return c.json({ message: "Current password is incorrect" }, 401);

    const newHashedPassword = await password.hash(newPassword, {
      algorithm: "bcrypt",
      cost: 12,
    });
    await pg`UPDATE Users SET password = ${newHashedPassword} WHERE username = ${username}`;

    return c.json({ message: "Password updated successfully" }, 200);
  } catch (err) {
    console.error("Update password error:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// delete /api/user/delete-account
app.delete("/api/user/delete-account", async (c) => {
  const token = getCookie(c, "authToken");
  if (!token) return c.json({ message: "Not authenticated" }, 401);

  try {
    const decoded = verify(token, SECRET_KEY);
    const username = decoded.username;

    await pg`DELETE FROM Users WHERE username = ${username}`;

    const deletedCookie = deleteCookie(c, "authToken");

    if (deletedCookie === undefined) {
      console.log("Cookie cannot be deleted");
      return c.json({ message: "Server error" }, 500);
    }

    return c.json({ message: "Account deleted successfully" }, 200);
  } catch (err) {
    console.error("Delete account error:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// post /api/orders/
app.post("/api/orders/", async (c) => {
  const token = getCookie(c, "authToken");
  if (!token) return c.json({ message: "Not authenticated" }, 401);

  try {
    const decoded = verify(token, SECRET_KEY);
    const username = decoded.username;

    const {
      MovieId,
      RentDays,
      totalPrice,
      firstName,
      lastName,
      address,
      city,
      country,
      postcode,
      cardName,
      cardNumber,
      cardExp,
      cvv,
    } = await c.req.json();

    if (
      !MovieId ||
      !RentDays ||
      !totalPrice ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !postcode ||
      !country ||
      !cardName ||
      !cardNumber ||
      !cardExp ||
      !cvv
    ) {
      return c.json({ message: "Missing required fields" }, 400);
    }

    await pg`INSERT INTO Orders 
      (username, movie_ids, rent_days, total_price, first_name, last_name, address, city, postal_code, country, card_name, card_number, card_expiry, card_cvc) 
      VALUES (${username}, ${MovieId}, ${RentDays}, ${totalPrice}, ${firstName}, ${lastName}, ${address}, ${city}, ${postcode}, ${country}, ${cardName}, ${cardNumber}, ${cardExp}, ${cvv})`;

    return c.json({ message: "Order submitted successfully" }, 201);
  } catch (err) {
    console.error("Order submission error:", err);
    return c.json({ message: "Server error" }, 500);
  }
});

// Start server
Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Server running on http://localhost:${PORT}`);
