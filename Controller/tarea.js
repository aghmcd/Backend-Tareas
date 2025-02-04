import {Router} from 'express';
//import { Gato } from '../model/mongoDB/schemas/tarea.js';

export const routerTarea = Router();
let contador = 0;

// a middleware function with no mount path. This code is executed for every request to the router
routerTarea.use(function(req,res,next){
    contador += 1;
    console.log('Request type:', req.method);
    console.log('number(s) of request(s):', contador);
    next();
});

routerTarea.post('/', async function(req,res,next){
    try {
        const {nombre} = req.body;
        const nuevoGato = new Gato({nombre});
        await nuevoGato.save();
        res.status(200).json(nuevoGato);
        next();
    } catch (err) {
        res.status(400).json({message: err.message});
        
    }
});