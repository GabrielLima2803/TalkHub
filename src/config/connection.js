require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', true);

async function conectarAoMongoDB() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro);
    }
}

module.exports = {
    conectarAoMongoDB,
}