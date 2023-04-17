import { Router } from 'express';
import ProductManager from '../Dao/ProductManager.js';
import MessageManager from '../Dao/MessageManagerMongo.js';
import { __dirname } from '../utils.js';

const router = Router();
const productManager = new ProductManager(__dirname + '/productos.json');
const messageManager = new MessageManager()

// ruta para el formulario de carga de productos (GET)
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

// router.get('/', async (req, res) => {
//     res.render('index');
// });

// ruta para el formulario de carga de productos (GET)
router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

//chat
router.get('/chat', async (req, res) => {
    
    res.render('chat');
    
});




export default router;
