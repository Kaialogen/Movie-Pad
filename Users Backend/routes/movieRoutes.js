const express = require("express");
const { movies, movieById } = require("../controllers/movieController");

const router = express.Router();

router.get("/movies", movies);
router.get("/movies/:id", movieById);

module.exports = router;
