import mongoose from "mongoose";

const usuarioShema = new mongoose.Schema({
    nombre: {type: String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, require: true},
    contrasena: {type: String, require: true},
    fechaNacimiento: {type: Date, require: true},
    idTelegram: {type: String, require: false, default: 'N/A'},
    avatar: {type: String, require: false}
});

export const Usuarios = mongoose.model("Usuarios", usuarioShema)