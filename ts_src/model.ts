import * as mongoose from "mongoose";

export interface movieFromAPI{
    user_id?: number,
    Title?: string,
    Year?: string,
    Released?: string,
    Genre?: string,
    Director?: string
};

interface MovieInterface{
    user_id: number,
    title: string,
    year: string,
    released: Date,
    genre: string,
    director: string
};

interface MovieDocument extends Document, MovieInterface{
    _id: mongoose.ObjectId
};

const moviesSchema = new mongoose.Schema<MovieDocument>({
    user_id: Number,
    title: String,
    year: String,
    released: Date,
    genre: String,
    director: String
},{
    timestamps: true,
    collection: 'movies'
});

export const Movies = mongoose.model('Movies', moviesSchema, 'movies');