import { Router } from "express";
import ProductManager from "../../ProductManager.js";
import { validarDatos, validarIdP } from "../middlewares/productsValidations.middleware.js";
import { __dirname } from "../utils.js";


const router = Router()

const productManager = new ProductManager(__dirname + '/productos.json');

//Muestra todos los productos
router.get('/', async (req, res) => {

    const limit = req.query.limit;A

    const products = await productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }

})

//Agrega un producto el cual recibe por el body
router.post('/', validarDatos, async (req, res) => {

    const obj = req.body
    const createProduct = await productManager.addProduct(obj)
    res.json({ message: 'Product created', product: createProduct })



})

router.put('/:idProduct', validarIdP, async (req, res) => {

    const { idProduct } = req.params
    const obj = req.body
    if (obj.id) {

        res.json({ message: "No se puede modificar el ID" })

    } else {

        const searchProduct = await productManager.updateProduct(+idProduct, obj)

        res.json({ message: 'Producto Actualizado' })

    }
})

router.delete('/:idProduct', validarIdP, async (req, res) => {

    const { idProduct } = req.params
    const deleteProduct = await productManager.deleteProductById(+idProduct)

    res.json({ message: "Producto Eliminado" })

})

router.get('/:idProduct',validarIdP, async (req, res) => {

    const { idProduct } = req.params
    const searchProduct = await productManager.getProductById(+idProduct)
    res.json({searchProduct})

})
export default router