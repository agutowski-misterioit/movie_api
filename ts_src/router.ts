import * as express from "express";
import * as middleware from "./middleware";
import * as validator from "./validator";
import * as controller from "./controller";

const router = express.Router();

router.get('/',
    controller.index
);

router.get('/movie/',
    validator.titleQuery,
    controller.findMovie
);

router.get('/movies/',
    controller.allMovies
);

router.post('/movies/',
    validator.reqBody,
    middleware.auth,
    middleware.basicUser,
    controller.addMovie
);

export = router;