import mongoose from "mongoose";
import { conexionDB } from "../database/context";
import { Documento } from "../schemas/documento";

conexionDB();

export class documentoRepository{
    static async addDocumento({input}){
        try {
            const nuevoDocumento = new Documento(input);
            nuevoDocumento.save();
            return nuevoDocumento;
        } catch (err) {
            console.log('Error guradando documento, descripcion:', err.message);
            return {mensaje: err.message}
        }
    }
}