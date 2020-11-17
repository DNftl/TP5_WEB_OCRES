const express = require('express');
const router = express.Router();
const _ = require('lodash');
const axios = require('axios');
const bodyParser = require('body-parser')

//const API = "http://www.omdbapi.com/?i=tt3896198&apikey=f254346d";

let movies = [{
  id: 0,
  movie: "The Devil Wears Prada",
  yearOfRelease: 2006,
  duration: 109, // en minutes,
  actors: ["Meryl Streep", "Anne Hathaway"],
  poster: "https://m.media-amazon.com/images/M/MV5BZjQ3ZTIzOTItMGNjNC00MWRmLWJlMGEtMjJmMDM5ZDIzZGM3XkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg",
  boxOffice: 100000000, // en USD$,
  rottenTomatoesScore: 10
},
{
  id: 1,
  movie: "Into the Wild",
  yearOfRelease: 2007,
  duration: 148, // en minutes,
  actors: ["Emile Hirsch", "Marcia Gay Harden"],
  poster: "https://m.media-amazon.com/images/M/MV5BZjQ3ZTIzOTItMGNjNC00MWRmLWJlMGEtMjJmMDM5ZDIzZGM3XkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg",
  boxOffice: 100000000, // en USD$,
  rottenTomatoesScore: 10
},
{
  id: 2,
  movie: "Her",
  yearOfRelease: 2013,
  duration: 120, // en minutes,
  actors: ["Joaquin Phoenix, Scarlett Johansson"],
  poster: "https://www.psychologies.co.uk/sites/default/files/styles/psy2_page_header/public/wp-content/uploads/2014/02/HER_QUAD_AW-low-res_0.gif",
  boxOffice: 100000000, // en USD$,
  rottenTomatoesScore: 10
}]

  // Affiche tous les films
  router.get('/', (req,res) => {
    res.status(200).json({movies});
  });

  // Affiche un film via son id
  router.get("/:id", (req, res) => {
    const {id} = req.params ;
    const movie = _.find(movies, ["id", id]);
    res.status(200).json({
      message : "Movie ${id} found",
      movie
    });
  });

  
  // Ajoute un film via son nom
  router.put("/", (req, res) => {
    const {movie} = req.body ;
    const id = _.uniqueId();
    movies.push({movie, id});
    res.json({
      message : "just added ${id}",
      movie : {movie, id}
    })
  });

  // Update un film via son id
  router.post("/:id", (req, res) => {
    const {id} = req.params ;
    const movie = _.find(movies, ["id", id]);
    res.status(200).json({
      message : "Updated movie",
      movie
    });
  });

  // Efface un film via son id
  router.delete("/:id", (req, res) => {
    const {id} = req.params ;
    const movie = _.remove(movies, ["id", id]);
    res.status(200).json({
      message : "Movie ${id} deleted",
      movie
    });
  });

  // PUT request (axios)
  router.put('/', (req, res) => {
	const {movie} = req.body;
	axios.get(API, {
    params:
    {
			title:movie,
		}
    })
		.then((response) => {

			const data = response.data;
			let info = {
				id: movies.length,
				movie: data.Title,
				yearOfRelease: data.Year,
				duration: data.Runtime,
				actors: data.Actors.split(","),
				poster: data.Poster,
				boxOffice: data.BoxOffice,
				rottenTomatoesScore: parseInt(data.Ratings[1].Value),
			}
			movies.push(info);
			res.send(movies)
    });
  })
  
  module.exports = router;