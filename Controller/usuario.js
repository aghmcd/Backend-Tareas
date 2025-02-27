import { Router } from 'express';
import { usurioRepository } from '../model/mongoDB/Repository/usuario.js';
import bycript from 'bcrypt';
import { upload } from '../middleware/multerconfig.js';
import fs from 'node:fs';
import 'dotenv/config';
import { bodyEmail } from '../Comunes/Email/usuarios.js';
import { uploadResult } from '../Comunes/Cloudinary/usuario.js';
import { telegramWMsg } from '../Comunes/Telegram/mensaje.js';

export const routerUsuario = Router();

let contador = 0;

// a middleware function with no mount path. This code is executed for every request to the router
routerUsuario.use(function(req,res,next){
    console.log("Request Type:", req.method);
    console.log('Resquest number:', contador += 1);
    next();
});

routerUsuario.get('/', async function(req,res,next) {
     try {
        const users = await usurioRepository.getAllUsers();
        if (users){
            res.status(200).json(users)
        } else {
            res.status(200).json({mensaje: "No hay usario en la bd"});
        }
     } catch (err) {
        console.error("Error buscando todos los usuarios", err.message);
        res.status(500).json({
            mensaje: err.message
        });
     }
});

routerUsuario.post('/', upload.single('avatar'), async function(req,res,next){
    let {
        nombre,
        apellidos,
        email,
        contrasena,
        fechaNacimiento,
        idTelegram,
        avatar
    } = req.body;

    const buscarUsuario = await usurioRepository.getUsuarioByEmail(email);
    if (!buscarUsuario) {
        const hash = await bycript.hash(contrasena, 10);
        contrasena = hash;
        if(req.file){
            const avatarPath = req.file.path;
            avatar = await uploadResult(avatarPath, nombre);
            fs.unlinkSync(avatarPath);
        }
        try {
            const nUsuario = await usurioRepository.addUsuario({usuario: {
                nombre,
                apellidos,
                email,
                contrasena,
                fechaNacimiento,
                idTelegram,
                avatar
            }});
            res.status(201).json(nUsuario);
            bodyEmail(nUsuario.email, nUsuario.avatar, nUsuario._id);
            if(nUsuario.idTelegram != 'N/A') {
                telegramWMsg(nUsuario.nombre, nUsuario.idTelegram);
            }
        } catch (err) {
            console.error('Error al crear el usuario Controller', err.message);
            res.status(500).json({message: 'Error al crear al usuario', error: err.message});
        }
    } else {
        res.status(200).json({
            mensaje: "Usuario ya existente en la BD",
            email: buscarUsuario.email
        });
    }
    next();
});

routerUsuario.get('/:id', async function(req,res,next) {
    try {
        const id = req.params;
        const user = await usurioRepository.getUsuarioById(id);
        if(user){
            res.status(200).json(user);
        } else {
            res.status(400).json({mensaje: "usuario no encontrado en la BD"})
        }
        next()
    } catch (err) {
        console.log('Error al bucar usario por ID', err.message)
        res.status(500).json({message: 'Error al buscar usuario', error: err.message});
    } 
});

routerUsuario.patch('/:id', async function(req,res,next){
    try {
        const id = req.params;
        let newPass = req.body.contrasena;
        const hash = await bycript.hash(newPass, 10);
        newPass = hash;
        const passChanged = await usurioRepository.updatePassword(id, newPass);
        if(passChanged){
            res.status(200).json({
                mensaje: "Contraseña Cambiada con exito",
                email: passChanged.email
            });
        } else {
            res.status(400).json({message: "Usuario no encontrado en la Base de Datos"});
        }
        next();
    } catch (err) {
        console.error('Error al cambiar el password', err.message);
        res.status(500).json({message: 'Error al cambiar la contraseña', error: err.message});
    }
});

routerUsuario.delete('/:id', async function(req,res,next){
    try {
        const id = req.params;
        const user = await usurioRepository.getUsuarioById(id);
        if (user) {
            const userDeleted = await usurioRepository.deleteUsuario(id);
            if (userDeleted){
                res.status(200).json({
                    mensaje: "Usuario Eliminado de la BD",
                    email: userDeleted.email
                });
            }
        } else {
            res.status(400).json({mensaje:'usuario no encontrado en la BD'})
        }
        next();
    } catch {
        console.error('Error al eliinar usuario', err.message);
        res.status(500).json({message: 'Error al eliminar al usuario', error: err.message});
    }
});

