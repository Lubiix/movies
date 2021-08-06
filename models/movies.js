const mongoose = require('mongoose')

const moviesSchema = mongoose.Schema({
    name: String,
    image: String
});

const  MoviesModel = mongoose.model('movies', moviesSchema);

module.exports = MoviesModel