//Importa los módulos:
import express from 'express';//const express=require('express');
import morgan from 'morgan';//const morgan=require('morgan');
import cors from 'cors';//const cors=require('cors');
import path from 'path';
import router from './routes';

const app=express();

//Middlewares:
app.use(morgan('dev')); //Permite monitorear el trafico de peticiones
app.use(cors()); //Permite gestionar peticiones remotas al servidor desde otras fuentes. 
app.use(express.json()); //Permite recibir cuerpo tipo JSON a través del método POST
app.use(express.urlencoded({extended:true})); //Endpoint analiza las solicitudes entrantes JSON. Analizador de cuerpo
app.use(express.static(path.join(__dirname,'public'))) //Direcciona al directorio public y muestra index.html
app.use('/api',router); //crea el enrutador

//Crea el servidor:
app.set('port',process.env.PORT || 3100);
app.listen(app.get('port'),()=>{
    console.log('End Point iniciado en puerto: ' + app.get('port'));
});

app.listen()