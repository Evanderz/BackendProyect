import mongoose from "mongoose";

const URI = 'mongodb+srv://Evanderz:Yanilu_22@cluster0.zbrgysq.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)

    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error))