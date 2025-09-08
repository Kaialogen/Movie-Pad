const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// User Login Endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT username, email, password FROM Users WHERE email = $1",
      [email]
    );

    // Check if user exists
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - User does not exist" });
    }

    const user = rows[0];
    // Bcrypt password comparison
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials - Incorrect password" });
    }
    const username = user.username;

    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    // Set HttpOnly, Secure Cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent access from JavaScript
      secure: false, // Only send over HTTPS
      sameSite: "Strict", // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Registration Endpoint
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    // Check if user already exists
    const { rows } = await pool.query(
      "SELECT email FROM Users WHERE email = $1",
      [email]
    );
    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Profile Endpoint
app.get("/api/profile", (req, res) => {
  const token = req.cookies.authToken;

  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Logout Endpoint
app.post("/api/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out" });
});

// Order Submission Endpoint
app.post("/api/orders", async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
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
    } = req.body;

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
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert order into the Orders table
    await pool.query(
      `INSERT INTO Orders 
      (username, movie_ids, rent_days, total_price, first_name, last_name, address, city, postal_code, country, card_name, card_number, card_expiry, card_cvc) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        username,
        MovieId,
        RentDays,
        totalPrice,
        firstName,
        lastName,
        address,
        city,
        postcode,
        country,
        cardName,
        cardNumber,
        cardExp,
        cvv,
      ]
    );

    res.status(201).json({ message: "Order submitted successfully" });
  } catch (err) {
    console.error("Order submission error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
