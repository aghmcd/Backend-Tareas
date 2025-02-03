import express, {json} from 'express';
import { router } from './Controller/tarea.js';

const app = express();
const PORT = 3720

app.use(json());
app.use('/tarea', router)

app.listen(PORT, () => {
    console.log(`The app is listening at http://localhost/${PORT}`)
})

