import { Router } from "express";
import CartManager from "../../CartManager.js";
import {validarIdC } from "../middlewares/cartsValidations.middleware.js"
import { validarIdP } from "../middlewares/productsValidations.middleware.js"


const router = Router()

const cartManager = new CartManager('./carts.json')

router.post('/',async (req, res) => {

    const createCart = await cartManager.addCart()
    res.json({ message: 'Cart created', product: createCart })

})

router.get('/:idCart',validarIdC,async(req,res)=>{

    const { idCart } = req.params
    const searchCart = await cartManager.getCartById(+idCart)
    res.json({searchCart})


})

router.post('/:idCart/product/:idProduct',validarIdC,validarIdP, async (req,res)=>{

const {idCart} = req.params
const {idProduct} = req.params

const searchCart = await cartManager.updateCart(+idCart,+idProduct)

res.json("Producto agregado")


})

export default router