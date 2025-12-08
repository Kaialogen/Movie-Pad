import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { hash, compare } from "bcrypt";
import { pg } from "../db.js";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export const updateUsername = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const { newUsername } = req.body;
  if (!newUsername)
    return res.status(400).json({ message: "New username is required" });

  try {
    const decoded = verify(token, SECRET_KEY);
    const currentUsername = decoded.username;

    await pg`"UPDATE Users SET username = ${newUsername} WHERE username = ${currentUsername}`;

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    const newToken = sign({ username: newUsername }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("authToken", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Username updated successfully" });
  } catch (err) {
    console.error("Update username error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePassword = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res
      .status(400)
      .json({ message: "Current and new passwords are required" });

  try {
    const decoded = verify(token, SECRET_KEY);
    const username = decoded.username;

    const rows =
      await pg`SELECT password FROM Users WHERE username = ${username}`;
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const storedHashedPassword = rows[0].password;
    const passwordMatch = await compare(currentPassword, storedHashedPassword);
    if (!passwordMatch)
      return res.status(401).json({ message: "Current password is incorrect" });

    const newHashedPassword = await hash(newPassword, 10);
    await pg`"UPDATE Users SET password = ${newHashedPassword} WHERE username = ${username}`;

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Update password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = verify(token, SECRET_KEY);
    const username = decoded.username;

    await pg`DELETE FROM Users WHERE username = ${username}`;

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
