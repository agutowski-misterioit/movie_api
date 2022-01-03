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

export const titleBody = (req, res, next) => {
    try{
        if( !req.body.title ){
            throw new Error("Title undefined");
        }
        next();
    }catch(e){
        return res.status(400).json(e.message);
    }
};