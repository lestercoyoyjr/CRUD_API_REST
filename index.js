const express = require('express');
const cors = require('cors');
const db = require('./config/conexion');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors());

// REST Services
app.get('/productos', (req,res) => {
    db.query('SELECT * FROM frutas', (err, data) =>{
        if(err) return err;

        res.json({ 
            mensaje: 'Resultados',
            data
        })
    })
});

app.get('/productos/:id', (req,res) => {
    console.log(req.params.id);
    const sql = "SELECT * FROM frutas WHERE Id=?"
    const ID= req.params.id
    db.query(sql, [ID] , (err, data) =>{
        if(err) return err;

        res.json({ 
            mensaje: 'Resultados',
            data
        })
    })
});

app.post('/productos', (req,res) => {
    console.log(Object.values(req.body))
    const values = Object.values(req.body);
    const sql = "INSERT INTO frutas (Nombre, Color, Precio) VALUES (?,?,?)"

    db.query(sql, values, (err,data) => {
        if(err){
            console.log(err)
            return err;
        }
        res.json({
            mensaje: 'Producto agregado',
            data
        })
    })
})

app.put('/productos', (req,res) => {
    console.log(Object.values(req.body))
    const values = Object.values(req.body);
    const sql = "UPDATE frutas SET Nombre=?, Color=?, Precio=? WHERE Id=?"

    db.query(sql, values, (err,result) => {
        if(err){
            console.log(err)
            return err;
        }
        res.json({
            mensaje: 'Producto editado correctamente',
            result
        })
    })
});

app.delete('/productos/:id', (req,res) => {
    console.log(req.params.id);
    const sql = "DELETE FROM frutas WHERE Id=?"
    const ID= req.params.id
    db.query(sql, [ID] , (err, data) =>{
        if(err) return err;

        res.json({ 
            mensaje: 'Producto Eliminado correctamente',
            data
        })
    })
});

app.listen(PORT, () => {
    console.log('Servidor en ejecucion en el puerto: '+ PORT);
})