import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export interface jwtData{
    userId: number,
    name: string,
    role: string
};

export const userIdAndRole = (token:string) => {
    const verified:jwtData = JSON.parse(JSON.stringify(jwt.verify(token, JWT_SECRET)));
    return { userId: verified.userId, role: verified.role };
};