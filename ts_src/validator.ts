export const titleQuery = (req, res, next) => {
    const { title } = req.query;
    try{
        if( !title ){
            throw new Error("Title undefined");
        }else{
            next();
        }
    }catch(e){
        return res.status(400).json(e.message);
    }
};

export const reqBody = (req, res, next) => {
    const { title, username, password } = req.body;
    try{
        if( !title ){
            throw new Error("Title undefined");
        }
        if( !username ){
            throw new Error("Username undefined");
        }
        if( !password ){
            throw new Error("Password undefined");
        }
        next();
    }catch(e){
        return res.status(400).json(e.message);
    }
};