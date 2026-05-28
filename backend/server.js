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

/* AGREGAR PRODUCTO */

app.post("/productos",(req,res)=>{

const {

nombre,
precio,
stock,
categoria,
talla,
proveedor

}=req.body;

const sql=`

INSERT INTO Productos
(nombre,precio,idCategoria,idTalla,idProveedor,stock)

VALUES
(?, ?, ?, ?, ?, ?)

`;

conexion.query(

sql,

[
nombre,
precio,
categoria,
talla,
proveedor,
stock
],

(error,resultados)=>{

if(error){

console.log(error);

res.send("Error al agregar producto");

return;

}

res.send("Producto agregado");

}

);

});

/* ACTUALIZAR PRODUCTO */

app.put("/productos/:id",(req,res)=>{

const id=req.params.id;

const {

nombre,
precio,
stock

}=req.body;

const sql=`

UPDATE Productos
SET nombre=?, precio=?, stock=?
WHERE idProducto=?

`;

conexion.query(

sql,

[nombre,precio,stock,id],

(error,resultados)=>{

if(error){

console.log(error);

res.send("Error al actualizar");

return;

}

res.send("Producto actualizado");

}

);

});

/* ELIMINAR PRODUCTO */

app.delete("/productos/:id",(req,res)=>{

const id=req.params.id;

const sql="DELETE FROM Productos WHERE idProducto=?";

conexion.query(sql,[id],(error,resultados)=>{

if(error){

console.log(error);

res.send("Error al eliminar");

return;

}

res.send("Producto eliminado");

});

});

res.json(resultados);

});

});

/* PUERTO */

app.listen(4000,()=>{

console.log("Servidor en puerto 4000");

});