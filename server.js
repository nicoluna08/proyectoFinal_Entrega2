
import {Productos} from "./managers/productos.js" 
import {Carritos} from "./managers/carritos.js" 


// CARRITOS



// Constantes


import express from "express";
//const express = require("express");
const { Router } = express;
const app = express();
//const Puerto = 8080;
 const Puerto = process.env.PORT  || 8080;
//const productos = new Productos("ListadoProductos.txt");
const productos = new Productos("ListadoProductos.txt");

//const carritos = new Carritos("ListadoCarritos.txt");
const carritos = new Carritos("ListadoCarritos.txt");

//Routers
const routerProductos = Router();
const routerCarritos = Router();
app.use("/api/productos/",routerProductos);
app.use("/api/carrito/",routerCarritos);


routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());

routerCarritos.use(express.urlencoded({extended: true}));
routerCarritos.use(express.json());


// Configuraciones
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(Puerto,()=>{
    console.log(`Server escuchando en puerto numero: ${Puerto}`);
});
// DEFINO PRIVILEGIO ADMINISTRADOR
const isAdmin = true;

// Petciones

routerProductos.get("/:id",async (req,res,err)=>{

    res.json(await productos.getById(req.params.id));
});
routerProductos.get("/",async (req,res)=>{

    res.json(await productos.getAll());
});


routerProductos.post("/",async(req,res)=>{
    if (isAdmin){
    const result = await productos.save(req.body);
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});
routerProductos.put("/",async(req,res)=>{
    if (isAdmin){
        const result = await productos.updateProduct(req.body);
    
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "PUT" 
    }
    res.json(msjPrivilegio);

}
});
routerProductos.delete("/:id",async(req,res)=>{
    if (isAdmin){
        const result = await productos.deleteById(req.params.id);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});

// Peticiones Carritos



routerCarritos.post("/",async(req,res)=>{
    if (isAdmin){
    const result = await carritos.nuevo(req.body);
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});

routerCarritos.post("/:id/productos",async(req,res)=>{
// formato del producto   {"producto":3}


    if (isAdmin){
    const result = await carritos.agregarProd(req.params.id,req.body);
console.log(result);   
    res.json(result);
    }else{
        const msjPrivilegio = {
            mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
            metodo: "POST" 
        }
        res.json(msjPrivilegio);

    }
});



routerCarritos.delete("/:id",async(req,res)=>{
    if (isAdmin){
        const result = await carritos.deleteById(req.params.id);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});



routerCarritos.delete("/:id/productos/:id_prod",async(req,res)=>{
    if (isAdmin){
        const result = await carritos.del_Prod_Carrito(req.params.id,req.params.id_prod);
    res.json(result);
}else{
    const msjPrivilegio = {
        mensaje: "NO TIENE PRIVILEGIO PARA USAR ESTA FUNCION",
        metodo: "DELETE" 
    }
    res.json(msjPrivilegio);

}

});


routerCarritos.get("/:id/productos",async (req,res)=>{

    res.json(await carritos.getById(req.params.id));
});

/*
routerProductos.get("/?/?",async (req,res)=>{

    res.json("ERROR");
});


*/