import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { password } from "bun";
import { pg } from "../db.js";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// api/auth/login
export const login = async (req, res) => {
  const { email, plainTextPassword } = req.body;
  if (!email || !plainTextPassword)
    return res.status(400).json({ message: "Missing email or password" });

  try {
    const rows =
      await pg`SELECT username, email, password FROM Users WHERE email = ${email}`;
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await password.verify(plainTextPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 3600000,
    });

    res.status(200).json("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// api/auth/register
export const register = async (req, res) => {
  const { username, email, plainTextPassword } = req.body;
  if (!username || !email || !plainTextPassword)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const rows = await pg`SELECT email FROM Users WHERE email = ${email}`;
    if (rows.length > 0)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await password.hash(plainTextPassword, {
      algorithm: "bcrypt",
      cost: 12,
    });
    await pg`INSERT INTO Users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword})`;

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// api/auth/profile
export const profile = (req, res) => {
  console.log("COOKIES:", req.cookies);
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = verify(token, SECRET_KEY);
    res.json({ username: decoded.username });
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// api/auth/logout
export const logout = (_req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out" });
};
