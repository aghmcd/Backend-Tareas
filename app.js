import express, {json} from 'express';
import { routerTarea } from './Controller/tarea.js';
import { routerUsuario } from './Controller/usuario.js';
import { routerAuth } from './Controller/auth.js';
import cors from 'cors';
import { routerDocument } from './Controller/documents.js';

const app = express();
const PORT = 3720;

app.use(json());
app.use(cors());
app.use('/auth', routerAuth);
app.use('/usuario', routerUsuario);
app.use('/documento', routerDocument);
app.use('/tarea', routerTarea);
app.listen(PORT, () => {
    console.log(`The app is listening at http://localhost/${PORT}`);
});

