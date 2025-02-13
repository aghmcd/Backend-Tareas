import express, {json} from 'express';
import { routerTarea } from './Controller/tarea.js';
import { routerUsuario } from './Controller/usuario.js';
import { routerAuth } from './Controller/auth.js';
import cors from 'cors';

const app = express();
const PORT = 3720;

app.use(json());
app.use(cors());
app.use('/tarea', routerTarea);
app.use('/usuario', routerUsuario);
app.use('/auth', routerAuth);

app.listen(PORT, () => {
    console.log(`The app is listening at http://localhost/${PORT}`);
});

