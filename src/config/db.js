const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function conectarAoMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Talkhub', {
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