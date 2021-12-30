import * as model from "./model";
import { StatusCode } from "./enum";
import * as authService from "./authService";

interface UserInterface{
    userId: number,
    name: string,
    role: string
};

export const auth = async (req, res, next) => {
    try{
        const login = await authService.login(req.body.username, req.body.password);
        if(login.status === StatusCode.Unauthorized){
            throw new Error(login.error);
        }
        res.status(login.status).header('Token', login.token);
        next();
    }catch(e){
        return res.status(StatusCode.Unauthorized).json(e.message);
    }
};

export const checkRole = async(req, res, next) => {
    try{
        const token = req.headers('token');
        const token2 = token.json();
        console.log(token2);
        const role = await authService.check("nothing");
        if( role === 'basic' ){
            throw new Error("some error");
        }
        next();
    }catch(e){
        return res.status(StatusCode.Unauthorized).json(e.message);
    }
};

export const basicUser = async (req, res, next) => {
    if( res.locals.role == 'basic'){
        try{
            const fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), -1);
            const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0); 
            
            const moviesInThisMonth = await model.Movies.countDocuments({ "user_id": res.locals.userId, "createdAt": {'$gte': fromDate, '$lte': toDate} });
            if(moviesInThisMonth >= 5){
                throw new Error("Limit of add new movies has been reached on basic user");
            } else {
                next();
            }
        }catch(e){
            return res.status(StatusCode.PaymentRequired).json(e.message);
        }
    } else{
        next();
    }
};