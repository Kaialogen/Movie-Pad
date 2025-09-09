const jwt = require("jsonwebtoken");
const pool = require("../db");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

exports.submitOrder = async (req, res) => {
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
};
