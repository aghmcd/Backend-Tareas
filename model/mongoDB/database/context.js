import mongoose from 'mongoose';

const uri = 'mongodb+srv://jorirovi:5RR3j9TtBxqg@mongodb101.0evp19y.mongodb.net/mcdtaskDB?retryWrites=true&w=majority&appName=MongoDB101'
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