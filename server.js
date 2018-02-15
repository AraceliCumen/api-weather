const express = require('express');
const app = express();
// crear el servidor cuando escuches el puerto 3000

const server = app.listen(3000,encender);
 function encender(){
     console.log('encendido');
 }

 app.use(express.static('public'));