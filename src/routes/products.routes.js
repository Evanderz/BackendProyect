import { Router } from "express";
//import ProductsManager from "../Dao/ProductsManager.js";
import ProductsManager from "../Dao/ProductManagerMongo.js";

const router = Router()


const productsManager = new ProductsManager()

router.get('/',async (req,res)=>{

const products = await productsManager.getAllProducts()
res.json({message: 'Products', products})

})

router.post ('/',async (req,res)=>{

    const newProduct = await productsManager.addProduct(req.body)
    res.json({message:'Product added',product:newProduct})


})

export default router