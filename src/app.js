import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'




const app = express()
const port = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// routes

app.use('/api/products', productsRouter)
app.use ('/api/carts', cartsRouter)



app.listen(port, () => {

    console.log('Escuchando al puerto 8080');

})