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
exports.basicUser = exports.auth = void 0;
const model = require("./model");
const enum_1 = require("./enum");
const authService = require("./authService");
;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield authService.login(req.body.username, req.body.password);
        res.status(login.status).header('Token', login.token);
        next();
    }
    catch (e) {
        return res.status(enum_1.StatusCode.Unauthorized).json(e.message);
    }
    // res.status(StatusCode.Ok).send();
});
exports.auth = auth;
const basicUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.locals.role == 'basic') {
        try {
            const fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), -1);
            const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
            const moviesInThisMonth = yield model.Movies.countDocuments({ "user_id": res.locals.userId, "createdAt": { '$gte': fromDate, '$lte': toDate } });
            if (moviesInThisMonth >= 5) {
                throw new Error("Limit of add new movies has been reached on basic user");
            }
            else {
                next();
            }
        }
        catch (e) {
            return res.status(enum_1.StatusCode.PaymentRequired).json(e.message);
        }
    }
    else {
        next();
    }
});
exports.basicUser = basicUser;
