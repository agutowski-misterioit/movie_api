"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movies = void 0;
const mongoose = require("mongoose");
;
;
;
const moviesSchema = new mongoose.Schema({
    user_id: Number,
    title: String,
    year: String,
    released: Date,
    genre: String,
    director: String
}, {
    timestamps: true,
    collection: 'movies'
});
exports.Movies = mongoose.model('Movies', moviesSchema, 'movies');
