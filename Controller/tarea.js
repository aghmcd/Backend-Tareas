import {Router} from 'express';

export const router = Router();
let contador = 0;

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function(req,res,next){
    contador += 1;
    console.log('Request type:', req.method);
    console.log('number(s) of request(s):', contador);
    next();
});

router.get('/', function(req,res,next){
    res.send('<h1>hola mundo</h1>');
    next();
});