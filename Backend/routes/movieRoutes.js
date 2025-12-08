import express from "express";
import { movies, movieById } from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", movies);
router.get("/movies/:id", movieById);

export default router;
