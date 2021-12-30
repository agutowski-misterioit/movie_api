import * as dotenv from "dotenv";
dotenv.config();

export const { APIKEY } = process.env;
export const { JWT_SECRET } = process.env;