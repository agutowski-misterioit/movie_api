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
        res.status(login.status).header('Token', login.token);
        next();
    }catch(e){
        return res.status(StatusCode.Unauthorized).json(e.message);
    }
    // res.status(StatusCode.Ok).send();
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