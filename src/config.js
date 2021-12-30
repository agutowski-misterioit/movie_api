"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.APIKEY = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.APIKEY = process.env.APIKEY;
exports.JWT_SECRET = process.env.JWT_SECRET;
