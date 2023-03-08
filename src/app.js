import express from 'express'
import ProductManager from './ProductManager.js'



const app = express()
const productManager = new ProductManager('./product.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // req.params - req.query - req.body
    res.send('Bienvenidos')
})

//Muestra todos los productos
app.get('/products', async (req, res) => {

    const limit = req.query.limit;

    const products = await productManager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }

})

//Agrega un producto el cual recibe por el body
app.post('/products', async (req, res) => {

    const obj = req.body
    const createProduct = await productManager.addProduct(obj)
    res.json({ message: 'Product created', product: createProduct })

})

app.get('/products/:idProduct', async (req, res) => {

    const { idProduct } = req.params
    const searchProduct = await productManager.getProductById(+idProduct)
    res.json({ searchProduct })

})




app.listen(8080, () => {

    console.log('Escuchando al puerto 8080');

})