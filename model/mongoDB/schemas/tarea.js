import mongoose from 'mongoose'
const { Schema, model, SchemaTypes } = mongoose;

const tareaSchema = new Schema({
    tarea: {type: String, require: true},
    progreso: {type: String, require: true, lowercase: true, default: 'sin iniciar'},
    fechaInicio: {type: Date, require: true, default: () => Date.now()},
    fechaEstFin: {type: Date, require: true},
    fechafin: {type: Date, require: false, default: () => new Date('1900-01-01')},
    prioridad: {type: String, require: true, lowercase: true},
    tareaCreadaEl: {type: Date, require: true, default: () => Date.now()},
    tareaModificadaEl: {type: Date, require: true, default: () => Date.now()},
    usuario: {type: SchemaTypes.ObjectId, ref: 'Usuarios', require: true},
    comentarios: [{
        comentario: {type: String, require: true},
        fecha: {type: Date, require: true, default: () => Date.now()}
    }]
});

tareaSchema.pre('save', function (next) {
    this.tareaModificadaEl = Date.now();
    next();
});

export const Tarea = model("Tarea", tareaSchema);