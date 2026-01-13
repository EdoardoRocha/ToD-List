const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongo conectado com sucesso!"))
    .catch(err => {
        const msg = "[ERRO] O sistema falhou ao tentar se conectar com o mongo";
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })