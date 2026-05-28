const express=require("express");

const mysql=require("mysql2");

const cors=require("cors");

const app=express();

/* CONFIG */

app.use(cors());

app.use(express.json());

/* CONEXION MYSQL */

const conexion=mysql.createConnection({

host:"localhost",

user:"root",

password:"Esp1906.",

database:"Tienda_Ropa"

});

/* PROBAR CONEXION */

conexion.connect((error)=>{

if(error){

console.log("Error de conexion");

return;

}

console.log("Conexion exitosa a MySQL");

});

/* RUTA PRINCIPAL */

app.get("/",(req,res)=>{

res.send("Servidor funcionando");

});

/* OBTENER PRODUCTOS */

app.get("/productos",(req,res)=>{

const sql="SELECT * FROM Productos";

conexion.query(sql,(error,resultados)=>{

if(error){

console.log(error);

res.send("Error al obtener productos");

return;

}

res.json(resultados);

});

});

/* PUERTO */

app.listen(4000,()=>{

console.log("Servidor en puerto 4000");

});