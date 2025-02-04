import mongoose from "mongoose";
import { conexionDB } from "../database/context.js";
import { Usuarios } from "../schemas/usuario.js";

conexionDB();

export class usurioRepository {
    static async addUsuario({ usuario }){
        try {
            const nuevoUsuario = new Usuarios(usuario);
            await nuevoUsuario.save();
            return nuevoUsuario;
        } catch (err) {
            console.log('Error al crear usuario', err.message);
            return {message: 'Error al Crear el usuario', error: err.message};
        }
        
    }

    static async getUsuarioByEmail(correo){
        try{
            const usuario = await Usuarios.findOne({email: correo});
            return usuario;
        } catch (err) {
            console.error('Error al buscar al usuario', err.message)
        }
    }

    static async getUsuarioById(id){
        try{
            const objectID = new mongoose.Types.ObjectId(id);
            const usuario = await Usuarios.findById(objectID);
            return usuario;
        } catch (err) {
            console.error('Error al buscar Documento', err.message);
        }
    }

    static async updatePassword(id, newPassword){
        try {
            const objectID = new mongoose.Types.ObjectId(id);
            const resultado = await Usuarios.findOneAndUpdate(
                { _id: objectID },
                { contrasena: newPassword },
                { new: true }
            );
            return resultado;
        } catch (err) {
            console.error('Error al actualizar la contarseña', err.message);
        }
    }

    static async deleteUsuario(id){
        try {
            const objectID = new mongoose.Types.ObjectId(id);
            const resultado = await Usuarios.findByIdAndDelete(objectID);
            return resultado;

        } catch (err) {
            console.error('Error al Eliminar un usuario de la BD', err.message);
        }
        
    }
    
    static async getAllUsers(){
        try {
            const resultado = await Usuarios.find();
            return resultado;
        } catch (err) {
            console.error('Error al buscar los usuarios en la BD', err.message)
        }
    }

}