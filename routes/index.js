const express = require('express');
const router = express.Router();

const request = require('sync-request');

const mongoose = require('mongoose');

const MoviesModel = require ('../models/movies')

const apiKey = "4c299401299c4d2dd0e9b1c307cf62ef"

router.get('/new-movies', function(req, res, next){
  console.log('GET /new-movies req.query', req.query)
  const movies = request("GET", `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=fr-FR&page=1`)
  let moviesParse = JSON.parse(movies.body)
  res.json(moviesParse.results);
})

router.post('/wishlist-movie', async function(req, res, next) {
  // console.log('POST /wishlist-movie req.body', req.body);
  const newMovie = new MoviesModel({
    name: req.body.name,
    image: req.body.image
  })
  const movieSaved = await newMovie.save()
  let result = false;
  if (movieSaved.name) {
    result = true
  }

  res.json({result})
})

router.delete('/wishlist-movie/:name', async function(req, res, next) {
  console.log('DELETE params', req.params.name);
  const deletedMovies = await MoviesModel.deleteOne({
    name: req.params.name
  });
  res.json({result: !!deletedMovies.deletedCount})
})

router.get('/wishlist-movie', async function(req, res, next){
  console.log('enter bdd', req.body)
  const moviesBDD = await MoviesModel.find()
  
  console.log('moviesBDD', moviesBDD)
  res.json(moviesBDD)
})

module.exports = router;
