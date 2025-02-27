import {Router} from 'express';
import { tareaRepository } from '../model/mongoDB/Repository/tarea.js';
import { usurioRepository } from '../model/mongoDB/Repository/usuario.js';
import { telegramNTask } from '../Comunes/Telegram/mensaje.js';

export const routerTarea = Router();
let contador = 0;

// a middleware function with no mount path. This code is executed for every request to the router
routerTarea.use(function(req,res,next){
    contador += 1;
    console.log('Request type:', req.method);
    console.log('number(s) of request(s):', contador);
    next();
});
// get all tasks
routerTarea.get('/', async function(req,res){
    try {
        const tareas = await tareaRepository.GetAllTask();
        if(tareas){
            res.status(200).json(tareas);
        } else {
            res.status(400).json(tareas);
        }
    } catch (err) {
        console.err('Error al obtener las tareas', err.message);
        res.status(500).json({mensaje: `error al intentar obtener las respuesta: ${err.message}`});
    }
})

// add new task
routerTarea.post('/', async function(req,res,next){
    try {
       const {
        tarea,
        fechaEstFin,
        prioridad,
        usuario,
       } = req.body;
       
       const user = await usurioRepository.getUsuarioById(usuario);
       const fechaEstimada = new Date(fechaEstFin).toISOString();
       const comentario = `Tarea asignada a ${user.nombre} fecha de finalizacion ${fechaEstimada}`;
       const nTask = {
        tarea: tarea,
        fechaEstFin: new Date(fechaEstFin),
        prioridad: prioridad,
        usuario: usuario,
        subtareas: [{}],
        comentarios: [{comentario: comentario}]
       };
       const existeTarea = await tareaRepository.getTaskbyName(tarea);
       if(existeTarea !== null) {
        const nuevaTarea = await tareaRepository.addTarea(nTask)
        if (nuevaTarea._id) {
            res.status(201).json(nuevaTarea)
            if(user.idTelegram !== 'N/A'){
                const efechafin = new Date(nuevaTarea.fechaEstFin).toISOString();
                telegramNTask(user.nombre, nuevaTarea.tarea, efechafin.split('T')[0], user.idTelegram);
            } 
        } else {
            res.status(500).json(nuevaTarea)
        }
       } else {
        res.status(401).json(existeTarea);
       }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
//get task by id
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
//update task only will update progress & prioridad
routerTarea.patch('/:id', async function(req,res){
    try {
        const id = req.params;
        const prioridad = req.body.prioridad
        const progreso = req.body.progreso;
        const comentario = {comentario: 'tarea cambia progreso a En Proceso'};
        const task = await tareaRepository.getTareaByID(id);
        const input = {
            tarea: task.tarea,
            progreso: progreso,
            prioridad: prioridad,
            comentario: comentario
        };
        const tareaUpdate = await tareaRepository.updateTarea(id, input);
        if(tareaUpdate._id){
            res.status(201).json(tareaUpdate);
        } else {
            res.status(400).json({mensaje: `No se pudo actualizar la tarea ${task._id}`});
        }
    } catch (err) {
        console.error('Error al actualizar la tarea', err.message);
    }
    

});
//add a comment to the task, if the task isn't in progress the task is changed to "en progreso" 
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
        } else {
            progMog = tareaBase.progreso;
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
//it is to close the task only
routerTarea.patch('/endtask/:id', async function(req,res){
   try {
    const id = req.params;
    const progreso = req.body.progreso;
    const fechaFin = new Date().now;
    const input = {
        progreso: progreso,
        fechaFin: fechaFin
    };
    const respuesta = await tareaRepository.endTask(id, input);
    if(respuesta._id){
        res.status(200).json(respuesta);
    } else {
        res.status(400).json(respuesta);
    }
   } catch (err) {
    console.error('error en la capa de negocio', err.message);
    res.status(500).json({mensaje: err.message});
   } 
});