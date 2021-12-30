import * as dotenv from "dotenv";
import { StatusCode } from "./enum";
dotenv.config();

const { JWT_SECRET } = process.env;

const { authFactory, AuthError } = require("../src/auth");

export const login = async(username:string, password:string) => {
    const auth = authFactory(JWT_SECRET);
    try{
        const token = await auth(username, password);
        return { status: StatusCode.Ok, token: token };
    }catch(e){
        if(e instanceof AuthError){
            return { status: StatusCode.Unauthorized, error: e.message };
        }
        return e;
    }
};