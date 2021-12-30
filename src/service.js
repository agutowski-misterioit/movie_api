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
exports.addMovieService = exports.checkMovieExistService = exports.allMoviesService = exports.movieService = void 0;
// import * as dotenv from "dotenv";
const model = require("./model");
const db = require("./dbconfig");
// dotenv.config();
// const { APIKEY } = process.env;
const movieService = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.con();
        const ifAnyExist = yield model.Movies.countDocuments({ title: { '$regex': title, $options: 'i' } });
        if (ifAnyExist <= 0) {
            db.dc();
            throw new Error("Movie not found in database");
        }
        const movie = yield model.Movies.findOne({ title: { '$regex': title, $options: 'i' } });
        yield db.dc();
        return movie;
    }
    catch (e) {
        return e.message;
    }
});
exports.movieService = movieService;
const allMoviesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.con();
        const allMovies = yield model.Movies.find();
        yield db.dc();
        return allMovies;
    }
    catch (e) {
        return e.message;
    }
});
exports.allMoviesService = allMoviesService;
const checkMovieExistService = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.con();
        const checkIfExist = yield model.Movies.countDocuments({ title: { '$regex': title, $options: 'i' } });
        yield db.dc();
        if (checkIfExist > 0) {
            throw new Error("Movie already exist in database");
        }
        return false;
    }
    catch (e) {
        return true;
    }
});
exports.checkMovieExistService = checkMovieExistService;
const addMovieService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.con();
        const newMovie = new model.Movies({
        // data to new movie...
        });
        yield db.dc();
        return newMovie;
    }
    catch (e) {
        return e.message;
    }
});
exports.addMovieService = addMovieService;
