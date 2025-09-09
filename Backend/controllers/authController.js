const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing email or password" });

  try {
    const { rows } = await pool.query(
      "SELECT username, email, password FROM Users WHERE email = $1",
      [email]
    );
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json("Login successful!");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const { rows } = await pool.query(
      "SELECT email FROM Users WHERE email = $1",
      [email]
    );
    if (rows.length > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.profile = (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out" });
};
