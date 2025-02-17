import { Router } from 'express';
import { upload_doc } from '../middleware/multerconfig.js';
import { usurioRepository } from '../model/mongoDB/Repository/usuario.js';
import path  from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const routerDocument = Router();

routerDocument.use(function(req,res,next){
    console.log('Request Type:',req.method);
    console.log('Url Base:', req.baseUrl);
    next();
});

routerDocument.post('/', upload_doc.single('archivo'), async function(req,res){
    let {
        idUsuario,
        rubro,
        archivo,
    } = req.body;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname =  path.dirname(__filename);
    const pathName = path.join(__dirname, `/docs/${req.file.filename}`);
    console.log(pathName);

    const usuario = await usurioRepository.getUsuarioById(idUsuario)
    if(usuario){
        const ruta = 'C:\\Users\\jorge.romero\\Documents\\uploads'
        const fechaCreacion = new Date().toISOString();
        const fechaModificacion = new Date().toISOString();
        archivo = req.file.filename
        res.status(200).json({
            "Usuario": usuario.nombre,
            "Rubro": rubro,
            "Archivo": archivo,
            "ruta": ruta,
            "Fecha Creacion": fechaCreacion,
            "Fecha Modificacion": fechaModificacion
        });
    } else {
        res.status(400).json({mensaje: "Archivo no fue creado"});
    }
});