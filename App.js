
import React from 'react';
import Navigation from "./app/navigations/Navigation"
/*
const express = require('express')
const app = express()
const port = 3000
import {Navigation} from "./app/navigations/Navigation"
//procesar los datos por metodo post
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }))
//y este se envia los datos a traves de json
// parse application/json
//app.use(bodyParser.json())

//conexion a la base de datos
const mongoose=require('mongoose');

const uri='mongodb://localhost/estetica';
mongoose.connect(uri )
.then(()=>console.log('Base de datos conectada'))
.catch(e=>console.log(e))



//la ruta
app.get('/', (req, res) => {
  res.send('Hello World!')
});


//se cre una carpeta para guardar todas las rutas  ej: http://localhost:3000/api/servicios
app.use('/api',require('./router/Usuario'));



//app.use((req, res, next) => {
  // res.status(404).send("Sorry cant find that!");
 // res.status(404).sendFile(__dirname + "/public/404.html");
//});


app.get("/contacto", (req, res) => {
  res.send(__dirname);
});


//app.get("/servicios", (req, res) => {
 // res.send("Servicios")
//})
//cuando tienen use es un middleware
//app.use(express.static(__dirname + "/public"));



app.listen(port, () => {
  console.log('Example app listening at http://localhost:',port)
  //console.log(`Example app listening at http://localhost:${port}`)
})
*/

export default function App() {
  return <Navigation/>;
}
/*
VANILLA NODE
//configuracion del servidor hhtp
// ejecutar node app.js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log("respuesta del servidor...");
  //esta es la respuesta
  //se necesita reiniciar el servidor para que se guarden los cambios
  res.end("Te envío un saludo desde el servidor con node.js");
});

const puerto = 3000;

server.listen(puerto, () => {
  console.log("Escuchando...");
});
*/