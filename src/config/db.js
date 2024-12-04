const mongoose = require('mongoose');

async function conectarAoMongoDB() {
    try {
        await mongoose.connect('mongodb+srv://Talkhub:admin@cluster0.d01w1.mongodb.net/Talkhub?retryWrites=true&w=majority', {
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