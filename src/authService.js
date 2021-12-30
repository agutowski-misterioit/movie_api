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
exports.check = exports.login = void 0;
const dotenv = require("dotenv");
const enum_1 = require("./enum");
dotenv.config();
const { JWT_SECRET } = process.env;
const { authFactory, AuthError } = require("../src/auth");
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = authFactory(JWT_SECRET);
    try {
        const token = yield auth(username, password);
        if (!token) {
            throw new Error("Invalid username or password");
        }
        return { status: enum_1.StatusCode.Ok, token: token };
    }
    catch (e) {
        if (e instanceof AuthError) {
            return { status: enum_1.StatusCode.Unauthorized, error: e.message };
        }
        return e;
    }
});
exports.login = login;
const check = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = token;
        console.log(answer);
        return answer;
    }
    catch (e) {
        return e.message;
    }
});
exports.check = check;
