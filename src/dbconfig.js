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
exports.dc = exports.con = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// take MongoDB access data from .env file
const { DBserver, DBlogin, DBpassword } = process.env;
// MongoDB options required
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// db connection
const con = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = `mongodb+srv://${DBlogin}:${DBpassword}@${DBserver}?retryWrites=true&w=majority`;
    try {
        yield mongoose.connect(uri, options);
        // console.log("dbcon");
    }
    catch (e) {
        console.log(e.message);
    }
});
exports.con = con;
// db disconnection
const dc = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.disconnect();
        // console.log("db_dc");
    }
    catch (e) {
        console.log(e.message);
    }
});
exports.dc = dc;
