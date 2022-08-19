const express = require('express');
const cors = require('cors');
const db = require('./config/conexion');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor en ejecucion en el puerto: '+ PORT);
})