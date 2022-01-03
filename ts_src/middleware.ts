import * as model from "./model";
import { StatusCode } from "./enum";
import * as authService from "./authService";
import * as movieService from "./movieService";

export const checkAuth = async(req, res, next) => {
    try{
        if(!req.headers['authorization']){
            throw new Error("Invalid token");
        };
        next();
    }catch(e){
        return res.status(StatusCode.Unauthorized).json(e.message);
    }
};

export const checkRole = async(req, res, next) => {
    try{
        const idAndRole = authService.userIdAndRole(req.headers['authorization'].split(' ')[1]);
        
        if(idAndRole.role === 'basic'){
            const check = await movieService.checkBasicUserCanAddInThisMonth(idAndRole.userId);
            if(!check){
                throw new Error("Limit of add new movies has been reached on basic user");
            }
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