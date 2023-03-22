import express from 'express';
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from '../ProductManager.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// configurar el servidor para que use la carpeta pública (public) como carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

// inicializar el socket.io con el servidor http
const io = new Server(httpServer);



const productManager = new ProductManager(__dirname + '/productos.json');

// obtener los productos del archivo productos.json
const products = await productManager.getProducts();

// configurar el socket.io para que escuche los eventos de conexión y desconexión de clientes
io.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado ${socket.id}`);

    // Practica teoria
    socket.emit('message0', 'Bienvenido! estas conectado con el servidor');

    socket.broadcast.emit('message1', `Un nuevo cliente se ha conectado con id: ${socket.id}`);

    socket.on('createProduct', async (product) => {

        const productsPush = products;
        productsPush.push(product);

        io.emit('product-list', productsPush);

        socket.broadcast.emit('message3', `El cliente con id: ${socket.id} ha creado un producto nuevo`);

        await productManager.addProduct(product);
    });

    socket.on('deleteProduct', async (id) => {

        const productsPush = products.filter((product) => product.id !== id);

        io.emit('product-list', productsPush);

        socket.broadcast.emit('message4', `El cliente con id: ${socket.id} ha eliminado un producto con id: ${id}`);

        await productManager.deleteProduct(id);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');

        io.emit('message2', `Un cliente se ha desconectado con id: ${socket.id}`);

    });
});

