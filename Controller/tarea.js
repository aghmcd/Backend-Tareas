import {Router} from 'express';
import { tareaRepository } from '../model/mongoDB/Repository/tarea.js';

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
       const {
        tarea,
        fechaEstFin,
        prioridad,
        usuario,
        comentario
       } = req.body;

       const nTask = {
        tarea: tarea,
        fechaEstFin: new Date(fechaEstFin),
        prioridad: prioridad,
        usuario: usuario,
        comentarios: [{comentario: comentario}]
       };
       const nuevaTarea = await tareaRepository.addTarea(nTask)
       if (nuevaTarea._id) {
        res.status(201).json(nuevaTarea)
       } else {
        res.status(500).json(nuevaTarea)
       }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

routerTarea.get('/:id', async function(req,res){
    try{
        const id = req.params;
        const respuesta = await tareaRepository.getTareaByID(id);
        if(respuesta._id){
            res.status(200).json(respuesta);
        } else {
            res.status(400).json(respuesta);
        }
    } catch (err) {
        console.error('Error Buscando el ID', err.message)
    }
});

routerTarea.patch('/addcomment/:id', async function(req,res){
    try {
        const id = req.params;
        const {
            comentario
        } = req.body
        let progMog = null;
        const tareaBase = await tareaRepository.getTareaByID(id);
        if (tareaBase.progreso === 'sin iniciar'){
            progMog = 'en progreso';
        }
        const nuevoComentario = {comentario: comentario};
        const respuesta = await tareaRepository.addComent(id, nuevoComentario, progMog);
        if(respuesta._id){
            res.status(200).json(respuesta);
        } else {
            res.status(500).json(respuesta);
        }
    } catch (err) {
        console.error('Error adicionando Comentarios', err.message);
    } 
});