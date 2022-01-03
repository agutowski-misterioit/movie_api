import * as dotenv from "dotenv";
import * as model from "./model";
import * as db from "./dbconfig";
const { default: fetch } = require("node-fetch-cjs");
dotenv.config();

export const movieService = async(title:string)=>{
    try{
        await db.con();
        const ifAnyExist = await model.Movies.countDocuments({ title: { '$regex': title, $options: 'i'} });
        if( ifAnyExist <= 0 ){
            db.dc();
            throw new Error("Movie not found in database");
        }
        const movie = await model.Movies.findOne({ title: { '$regex': title, $options: 'i'} });
        await db.dc();
        return movie;
    }catch(e){
        return e.message;
    }
};

export const allMoviesService = async() => {
    try{
        await db.con();
        const allMovies = await model.Movies.find();
        await db.dc();
        return allMovies;  
    }catch(e){
        return e.message;
    }
};

export const checkMovieExistService = async(title:string) => {
    try{
        await db.con();
        const checkIfExist = await model.Movies.countDocuments({ title: { '$regex': title, $options: 'i'} })
        await db.dc();
        if( checkIfExist > 0 ){
            throw new Error();
        }
        return false;
    }catch(e){
        return true;
    }
};

export const fetchOMDBAPI = async(title:string) => {
    try{
        title = title.toString().replace(/ /g, '+');
        // const { APIKEY } = process.env;
        const fetchData = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.APIKEY}`);
        const encoded = await fetchData.json();
        if(encoded.Response === "False"){
            throw new Error("Movie not found in OMDB API");
        }
        return encoded;
    }catch(e){
        return e.message;
    }
};

export const checkBasicUserCanAddInThisMonth = async(userId:Number) => {
    try{
        const fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), -1);
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
        
        await db.con();
        const moviesInThisMonth = await model.Movies.countDocuments({ "user_id": userId, "createdAt": {'$gte': fromDate, '$lte': toDate} });
        await db.dc();

        if(moviesInThisMonth >= 5){
            throw new Error;
        };

        return true;
    }catch(e){
        return false;
    };
};

export const addMovieService = async() => {
    try{
        await db.con();
        const newMovie = new model.Movies({
            // data to new movie...
        });
        await db.dc();
        return true;
    }catch(e){
        return e.message;
    }
};