const express = require("express");
const {
  createMovie,
  getMovies,
  removeMovie,
  updateMovie,
  favoriteMovie,
} = require("../Controllers/moviesControllers");
const { protect } = require("../middlewares/protect");
const router = express.Router();

// create movies
// /api/movies
//private
router.post("/", protect, createMovie);

// list of movies
// /api/movies
router.get("/", getMovies);

// delete movie
// /api/movies/:id
router.delete("/:id", removeMovie);

// update movie
// /api/movies/:id

router.put("/:id", updateMovie);

// favoriteMovie
// /api/movies/favorite

router.put("/favorite/:id", favoriteMovie);

module.exports = router;
