import express, {json} from 'express';
import { routerTarea } from './Controller/tarea.js';
import { routerUsuario } from './Controller/usuario.js'

const app = express();
const PORT = 3720

app.use(json());
app.use('/tarea', routerTarea)
app.use('/usuario', routerUsuario)

app.listen(PORT, () => {
    console.log(`The app is listening at http://localhost/${PORT}`)
})

