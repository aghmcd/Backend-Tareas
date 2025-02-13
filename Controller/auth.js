import { Router } from 'express';
import bycript from 'bcrypt';
import { usurioRepository } from '../model/mongoDB/Repository/usuario.js';

export const routerAuth = Router()

let contador = 0

routerAuth.use(function(req,res,next){
    console.log('Request type:', req.method);
    console.log('Request Number:', contador += 1);
    next();
})

routerAuth.post('/', async function(req,res,next){
    try{
        const {
            email,
            contrasena
        } = req.body;
        const user = await usurioRepository.getUsuarioByEmail(email);
        if (user) {
            const hash = user.contrasena;
            const compare = bycript.compareSync(contrasena, hash);
            if(compare){
                res.status(202).json({
                    idUsuario: user._id,
                    emailUsuario: user.email,
                    avatarUsuario: user.avatar
                });
            } else {
                res.status(401).json({
                    mensaje: 'Contraseña Incorrecta'
                });
            }
        } else {
            res.status(400).json({
                mensaje: 'usuario no exsiste en la BD'
            });
        }
        next();
    } catch (err) {
        console.error('Error al Autorizar Usuario', err.message);
        res.status(500).json({
            mensaje: err.message
        });
    }
});