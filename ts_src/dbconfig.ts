import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

// take MongoDB access data from .env file
const { DBserver, DBlogin, DBpassword } = process.env;
// MongoDB options required
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as mongoose.ConnectOptions;

// db connection
export const con = async() => {
    const uri = `mongodb+srv://${DBlogin}:${DBpassword}@${DBserver}?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(uri, options);
        // console.log("dbcon");
    }catch(e){
        console.log(e.message);
    }
};

// db disconnection
export const dc = async() => {
    try{
        await mongoose.disconnect();
        // console.log("db_dc");
    }catch(e){
        console.log(e.message);
    }
};