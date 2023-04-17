import express from 'express';
import { Router } from 'express';
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './Dao/ProductManagerMongo.js';
import MessageManager from './Dao/MessageManagerMongo.js';
import './db/dbConfig.js'


const app = express();
const router = Router();
const messageManager = new MessageManager()

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



//websocket
const infoMensajes = []


const productManager = new ProductManager()


// configurar el socket.io para que escuche los eventos de conexión y desconexión de clientes

    const socketServer = new Server(httpServer);
    socketServer.on("connection", async socket => {
        const products = await productManager.getAll();
        const messages = await messageManager.getAllMessages();

        socket.emit("products", products);

        socket.on("newProduct", async data => {
            await productManager.addProduct(data);
            const products = await productManager.getAll();
            socket.emit("products", products);
        });

        socket.on("deleteProduct", async id => {
            await productManager.deleteById(id);
            const products = await productManager.getAll();
            socket.emit("products", products);
        });

        socket.emit("messages", messages);

        socket.on("newMessage", async data => {
            await messageManager.addMessage(data);
            socket.emit("messages", messages);
        });
    });


