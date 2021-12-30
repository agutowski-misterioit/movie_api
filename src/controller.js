"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMovie = exports.allMovies = exports.findMovie = exports.index = void 0;
const { default: fetch } = require("node-fetch-cjs");
const dotenv = require("dotenv");
dotenv.config();
const { APIKEY } = process.env;
const service = require("./movieService");
const enum_1 = require("./enum");
// front for send requests
const index = (req, res) => {
    return res.status(enum_1.StatusCode.Ok).render('homepage', { title: "NodeTask" });
};
exports.index = index;
// ^^^
const findMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield service.movieService(req.query.title);
        return res.status(enum_1.StatusCode.Ok).json(movie);
    }
    catch (e) {
        return res.status(enum_1.StatusCode.BadRequest).json(e.message);
    }
});
exports.findMovie = findMovie;
const allMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMovies = yield service.allMoviesService();
        return res.status(enum_1.StatusCode.Ok).json(allMovies);
    }
    catch (e) {
        return res.status(enum_1.StatusCode.BadRequest).json(e.message);
    }
});
exports.allMovies = allMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield service.checkMovieExistService(req.body.title);
        if (check) {
            throw new Error("Movie already exist in database");
        }
        const dataFromOMDBAPI = yield service.fetchOMDBAPI(req.body.title);
        if (dataFromOMDBAPI === "False") {
            throw new Error(dataFromOMDBAPI.Error);
        }
        return res.json(dataFromOMDBAPI);
    }
    catch (e) {
        return res.status(enum_1.StatusCode.BadRequest).json(e.message);
    }
    // check if movie exist Service
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
});
exports.addMovie = addMovie;
