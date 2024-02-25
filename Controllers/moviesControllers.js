const Movie = require("../Model/movieModel");

const createMovie = async (req, res) => {
  try {
    console.log(req.user._id);
    const movie = await Movie.create({ ...req.body, postedBy: req.user._id });
    res.json(movie);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
  }
};

const removeMovie = async (req, res) => {
  try {
    const removedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.json(removedMovie);
  } catch (error) {
    console.log(error);
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
  }
};

const favoriteMovie = async (req, res) => {
  try {
    const myMovie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json(myMovie);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMovie,
  getMovies,
  removeMovie,
  updateMovie,
  favoriteMovie,
};
