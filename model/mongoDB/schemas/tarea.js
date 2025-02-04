import mongoose from 'mongoose'

const tareaSchema = new mongoose.Schema({
    tarea: {type: String, require: true},
    progreso: {type: String, require: true},
    fechaInicio: {type: String, require: true},
    fechafin:{type: string},
    prioridad: {type: String, require: true},
    tareaCreadaEl: {type: String, require: true},
    tareaModificadaEl: {type: String, require: true},
    usuarioEmail: {type: String, require: true},
    notas: [{
        nota: {type: String, require: true},
        fecha: {type: String, require: true}
    }],
    comentarios: [{
        comentario: {type: string, require: true},
        fecha: {type: string, require: true}
    }]
});

export const Tarea = mongoose.model("Tarea", tareaSchema);