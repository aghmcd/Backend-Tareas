import mongoose from "mongoose";

const documentoShcema = new mongoose.Schema({
    idusuario: {type: String, require: true},
    rubro: {type: String, require: true},
    ruta: {type: String, require: true},
    archivo: {type: String, require: true},
    fechaCreacion: {type: String, require: true},
    fechaModificacion: {type: String, require: true}
});

export const Documento = mongoose.model("Documento", documentoShcema)