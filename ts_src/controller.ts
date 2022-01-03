const { default: fetch } = require("node-fetch-cjs");
import * as dotenv from "dotenv";
dotenv.config();
const { APIKEY } = process.env;
import * as model from "./model";
import * as service from "./movieService";
import { StatusCode } from "./enum";


// front for send requests
export const index = (req,res)=>{
  return res.status(StatusCode.Ok).render('homepage', { title: "NodeTask" });
};
// ^^^

export const findMovie = async(req,res)=>{
  try{  
    const movie = await service.movieService(req.query.title);
    return res.status(StatusCode.Ok).json(movie);
  }catch(e){
    return res.status(StatusCode.BadRequest).json(e.message);
  }
};

export const allMovies = async(req,res) => {
  try{
    const allMovies = await service.allMoviesService();
    return res.status(StatusCode.Ok).json(allMovies);
  }catch(e){
    return res.status(StatusCode.BadRequest).json(e.message);
  }
}

export const addMovie = async(req, res) => {
  try{
    const check:boolean = await service.checkMovieExistService(req.body.title);
    if( check ){
      throw new Error("Movie already exist in database");
    }

    const dataFromOMDBAPI = await service.fetchOMDBAPI(req.body.title);
    if(dataFromOMDBAPI === "False"){
      throw new Error(dataFromOMDBAPI.Error);
    }
    
    return res.json(dataFromOMDBAPI);
    // add movie to DB service
  }catch(e){
    return res.status(StatusCode.BadRequest).json(e.message);
  }

  // when ok - add movie Service


  // try{
  //   let { title } = req.body;
  //   if( !title ){
  //     throw new Error("No data passed");
  //   }

  //   const ifExistInDb = await model.Movies.find({title: title}).count();
  //   if( ifExistInDb > 0 ){
  //     throw new Error("Movie exist in database");
  //   }

  //   title = title.toString().replace(/ /g, '+');
  //   try{
  //     const fetchData = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${APIKEY}`);
  //     const data:model.movieFromAPI = await fetchData.json();

  //     const newMovie = new model.Movies({
  //       user_id: res.locals.userId,
  //       title: data.Title,
  //       year: data.Year,
  //       released: Date.parse(data.Released),
  //       genre: data.Genre,
  //       director: data.Director
  //     });
  //     await newMovie.save();

  //     return res.status(201).json(newMovie);
  //   }catch(er){
  //     return res.status(404).json(`Movie not found in API | ${er.message}`);
  //   }
  // }catch(e){
  //   return res.status(400).json(e.message);
  // }
};