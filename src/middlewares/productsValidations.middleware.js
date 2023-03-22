import ProductManager from "../../ProductManager.js";
import { __dirname } from "../utils.js";

const productManager = new ProductManager(__dirname + '/productos.json');

export const validarDatos = (req, res, next) => {
    const obj = req.body

    if (obj.title == null || obj.description == null || obj.price == null || obj.category == null) {

        res.send({message:"Faltan rellenar datos"})

    } else {

        next()

    }
}

 export const validarIdP = async (req, res, next) => {
    const { idProduct } = req.params
    const products = await productManager.getProducts()
    const indexProduct = products.findIndex(p => p.id === +idProduct)
    if (indexProduct === -1) {
        res.send ({message:"Producto no encontrado"})
    }else{

        next()
    }



}
 


