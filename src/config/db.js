require('dotenv').config();
const mongoose = require('mongoose');

async function conectarAoMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Conectado ao MongoDB');
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro);
    }
}

module.exports = {
    conectarAoMongoDB,
};
