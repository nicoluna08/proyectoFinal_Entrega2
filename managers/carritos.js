import fs from "fs";


class Carritos{
    constructor(nombre){
this.NombreArchivo = nombre;
    }

 async nuevo(carrito){
    try {
 //id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código,foto (url), precio, stock }
        const carritosTotal = await this.getAll();
        
       if (carritosTotal != "EL ARCHIVO ESTA VACIO" && carritosTotal !== [] ){
        const ultimoID = carritosTotal[carritosTotal.length-1].id+1;
        carrito.id = ultimoID;
        carrito.timestamp = Date.now();
        carrito.productos = [];
        carritosTotal.push(carrito);
     await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
     return carrito.id;

    }else {
        carrito.id = 1;
        carrito.timestamp = Date.now();
        carrito.productos = [];
        await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify([carrito],null,2));
     return carrito.id;
    }
       

    } catch (error) {
        return "el carrito no se puede grabar"
    }
 }

 
 async agregarProd(unID,carrito){
    try {
        const carritosTotal = await this.getAll();
        const indice = carritosTotal.findIndex(elemnto=>elemnto.id == unID);

    if (indice >=0){

        carritosTotal[indice].productos.push(carrito.producto);
        await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
return "Producto agregado con exito"  
        }else{

        return "NO existe el carrito"
    }
         
       

    } catch (error) {
        console.log("llegue aca");

        return "el  producto no se puede agregar al carrito"
    }
 }




  async getAll(){
  try {
   
    const resultado = await fs.promises.readFile(this.NombreArchivo,"utf-8");

      if (resultado.length > 0){
    const prodJson = JSON.parse(resultado);
    return prodJson;    
  
  } else{
    console.log("no hay carritos");
    return "EL ARCHIVO ESTA VACIO"
  }   
   
  } catch (error) {
    const archivoNuevo=  await fs.promises.writeFile(this.NombreArchivo,"");  
    return ""
  }

    }

    async getById(unID){
      try {
        const carritosTotal = await this.getAll();

        const unCarrito = carritosTotal.find(elemnto=>elemnto.id == unID)
   if (unCarrito){
    return unCarrito;
    
   }else{
return "NO SE ENCUENTRA EL CARRITO"
   }
      } catch (error) {
        console.log("no se encuentra el carrito");
      }
    }

    async deleteById(unID){
      try {
        const carritosTotal = await this.getAll();

        const unCarrito = carritosTotal.find(elemnto=>elemnto.id == unID)
         if (unCarrito){
            const Carritos = carritosTotal.filter(elemnto=>elemnto.id != unID)
            await fs.promises.writeFile(this.NombreArchivo,JSON.stringify(Carritos,null,2));
       
            return `carrito ID: ${unID}  fue eliminado con exito`
            
          }else{
                   return "NO SE ENCUENTRA el carrito"
           }

      } catch (error) {
        console.log("no se puede eliminar el carrito");
        return ("no se puede eliminar el carrito");
      }
    }


    async deleteAll(){
      try {
        const carritosTotal = await this.getAll();
        
        await fs.promises.writeFile(this.NombreArchivo,"");
    
        return `Se Eliminaron Todos Los Carritos`
      } catch (error) {
        console.log("no se puede eliminar los Carritos");
      }
    }

  async del_Prod_Carrito(id_Carrito,id_prod){

    const carritosTotal = await this.getAll();
    const indiceCarr = carritosTotal.findIndex(elemnto=>elemnto.id == id_Carrito);

    if (indiceCarr >=0){
        const indiceProd = carritosTotal[indiceCarr].productos.findIndex(elemnto =>elemnto== id_prod);

        if (indiceProd >= 0){
            carritosTotal[indiceCarr].productos.splice(indiceProd,1);
            await   fs.promises.writeFile(this.NombreArchivo,JSON.stringify(carritosTotal,null,2));
        return `Producto nro: ${id_prod} eliminado del carrito nro: ${id_Carrito}`  
        }else{
           return `Producto nro: ${id_prod} no existe}` 
        }            
        
    }else{

    return "NO existe el carrito"
    }
  

    }

}


export{Carritos};
