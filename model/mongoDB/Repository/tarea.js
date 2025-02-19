import mongoose from "mongoose";
import { Tarea } from "../schemas/tarea.js";
import { conexionDB } from "../database/context.js";

conexionDB()

export class tareaRepository{
    static async addTarea(input) {
        try {
            const nuevaTarea = await Tarea.create(input);
            return nuevaTarea
        } catch (err) {
            console.error('Error en la BD', err.message);
            const errCreando = {mensaje: err.message};
            return errCreando;
        } 
    };

    static async getTareaByID(id){
        try {
            const _id = new mongoose.Types.ObjectId(id);
            const tarea = await Tarea.findById(_id).populate('usuario');
            if (tarea) {
                return tarea;
            } else {
                return ({mensaje: "la Tarea solicitada no esta en la Base de Datos"})
            }
        } catch (err) {
            console.error('Error en la BD:', err.message);
            return ({Error: err.message});
        }
    };

    static async GetAllTask() {
        try {
            const tareas = await Tarea.find().populate('usuario');
            return tareas
        } catch (err) {
            console.error('Error en la BD', err.message)
        }
    };
    
    static async updateTarea(id, input){
        try {
            const _id = new mongoose.Types.ObjectId(id);
            const {
                task,
                progreso,
                prioridad,
                comentario
            } = input
            const tarea = await Tarea.findById(_id);
            if (tarea) {
                tarea.tarea = task;
                tarea.progreso = progreso;
                tarea.prioridad = prioridad;
                tarea.comentarios.push(comentario);
                await tarea.save();
                return tarea;
            } else {
                return ({mensaje: 'La tarea no existe en la Base de Datos'});
            }
        } catch (err) {
            console.error('Error en la BD', err.message);
        } 
    };

    static async endTask(id, input){
        try {
            const _id = new mongoose.Types.ObjectId(id);
            const {
                progreso,
                fechaFin,
            } = input;
            const tareaFin = await Tarea.findById(_id);
            if(tareaFin){
                tareaFin.progreso = progreso;
                tareaFin.fechafin = fechaFin;
                await tareaFin.save();
                return tareaFin
            } else {
                return ({mensaje: 'La tarea no esta en la BD.'})
            }
        } catch (err) {
            console.error('Error en la BD:', err.message);
        } 
    };

    static async addComent(id, input, prog){
        try {
            const _id = new mongoose.Types.ObjectId(id);
            const tarea = await Tarea.findById(_id);
            tarea.progreso = prog;
            tarea.comentarios.push(input);
            await tarea.save();
            return tarea;
        } catch (err) {
            console.error('error en la BD:', err.message);
            const errorBD = {mensaje: err.message}
            return errorBD;
        }
    };

    static async getTaskbyName(task){
        try {
            const tarea = await Tarea.where('tarea').equals(task);
            return tarea;
        } catch (err) {
            console.error('Error al buscar la Tarea', err.message)
        }
    }
}