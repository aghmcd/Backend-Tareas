import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.DBCONN;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationError: true
    }
};

export async function conexionDB() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ping: 1});
        console.log("Estas conectado a la DB mcdtaskDB en MongoDB");
    } catch (err) {
        console.error('Error conetando a la BD', err.message)
    }
};