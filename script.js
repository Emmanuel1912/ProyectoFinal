
/* OBTENER PRODUCTOS */

async function cargarProductos(){

const respuesta=await fetch("http://localhost:4000/productos");

const productos=await respuesta.json();

const contenedor=document.getElementById("contenedor-productos");

if(contenedor){

contenedor.innerHTML="";

productos.forEach(producto=>{

contenedor.innerHTML+=`

<div class="producto">

<img
src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab">

<h3>

${producto.nombre}

</h3>

<p>

$${producto.precio}

</p>

<p>

Stock: ${producto.stock}

</p>

<button onclick="agregarCarrito(${producto.idProducto})">

Agregar

</button>

</div>

`;

});

}

}

cargarProductos();

/* AGREGAR CARRITO */

async function agregarCarrito(id){

const respuesta=await fetch("http://localhost:4000/productos");

const productos=await respuesta.json();

const producto=productos.find(p=>p.idProducto===id);

let carrito=JSON.parse(localStorage.getItem("carrito")) || [];

carrito.push(producto);

localStorage.setItem("carrito",JSON.stringify(carrito));

window.location.href="carrito.html";

}

/* MOSTRAR CARRITO */

function mostrarCarrito(){

const contenedor=document.getElementById("carrito-contenedor");

if(!contenedor) return;

const carrito=JSON.parse(localStorage.getItem("carrito")) || [];

contenedor.innerHTML="";

let total=0;

carrito.forEach((producto,index)=>{

total+=parseFloat(producto.precio);

contenedor.innerHTML+=`

<div class="item">

<img
src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab">

<div>

<h3>

${producto.nombre}

</h3>

<p>

$${producto.precio}

</p>

</div>

<button onclick="eliminarProducto(${index})">

Eliminar

</button>

</div>

`;

});

contenedor.innerHTML+=`

<div class="total">

<h3>

Total: $${total.toFixed(2)}

</h3>

<button onclick="location.href='checkout.html'">

Proceder al Pago

</button>

</div>

`;

}

/* ELIMINAR PRODUCTO */

function eliminarProducto(index){

let carrito=JSON.parse(localStorage.getItem("carrito")) || [];

carrito.splice(index,1);

localStorage.setItem("carrito",JSON.stringify(carrito));

mostrarCarrito();

}

mostrarCarrito();