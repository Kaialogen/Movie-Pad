const pool = require("../db");

exports.movies = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM Movies");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.movieById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM Movies WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching movie by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};
