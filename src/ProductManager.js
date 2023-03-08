import fs from 'fs'


export default class ProductManager {

    constructor(path) {

        this.path = path

    }

    async getProducts() {

        if (fs.existsSync(this.path)) {

            const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(infoArchivo)


        } else {
            console.log('Archivo no existe')
            return []
        }

    }

    async addProduct(product) {

        const products = await this.getProducts()
        const id = await this.#createId(products)
        const code = await this.#createCode(products)
        const newProducts = { id, code, ...product }
        products.push(newProducts)
        await this.#saveProducts(products)
        return newProducts

    }

    async getProductById(id) {

        const products = await this.getProducts()
        const product = products.find(p => p.id === id)
        if (product) {

            return product

        } else {

            return 'El producto no existe'

        }

    }

    async deleteProductById(id) {

        const products = await this.getProducts()
        let checkExist = false;
        let arrayNewProducts = []

        products.forEach(element => {

            if (element.id === id) {
                return checkExist = true;
            }
        })

        if (checkExist !== true) {

            console.log("No existe el producto")
        } else {
            arrayNewProducts = products.filter((p) => p.id !== id)
            await this.#saveProducts(arrayNewProducts)
        }


    }

    async updateProduct(id, obj) {

        const products = await this.getProducts()
        const indexProduct = products.findIndex(p => p.id === id)
        if (indexProduct === -1) {
            return 'Usuario no encontrado'
        }
        const updatedProduct = { ...products[indexProduct], ...obj }
        products.splice(indexProduct, 1, updatedProduct)
        await this.#saveProducts(products)



    }

    async #createId(products) {

        const id =
            products.length === 0
                ? 1
                : products[products.length - 1].id + 1
        products.forEach(element => {

            if (element.id === id) {

                id + 1

            }
        })
        return id
    }

    async #createCode(products) {

        let numberCode =
            products.length === 0
                ? 1
                : products[products.length - 1].id + 1

        let code = `PRCO${numberCode}`

        products.forEach(element => {

            if (element.code === code) {

                numberCode + 1
                code = `PRCO${numberCode}`

            }

        })

        return code
    }

    async #saveProducts(products) {

        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

}

/* const producto1 = {

    title: "GFORCE RTX 4090",
    description: "Placa de video",
    price: 560000,
    thumbnail: "/image.jpg",
    stock: 30

} */
/* const producto2 = {

    title: "GFORCE RTX 3090",
    description: "Placa de video",
    price: 360000,
    thumbnail: "/image.jpg",
    stock: 15

}
const producto3 = {

    title: "Asrock A320M-HDV R4.0 Ryzen M-ATX ",
    description: "Motherboard",
    price: 20000,
    thumbnail: "/image.jpg",
    stock: 10

}
const producto4 = {

    title: "GeiL DDR4 16GB 3000MHz Super Luce RGB Black",
    description: "Motherboard",
    price: 30000,
    thumbnail: "/image.jpg",
    stock: 15

}

async function prueba() {

    const manager = new ProductManager('Products.json')
    //Crea Productos
    await manager.addProduct(producto1)
    await manager.addProduct(producto2)
    await manager.addProduct(producto3)
    await manager.addProduct(producto4)
    //Busca Productos por ID
    await manager.getProductById(1)
    //Muestra todos los productos
    const products = await manager.getProducts()
    console.log(products)
    //Elimina producto por ID
    await manager.deleteProductById(10) 
    //Actualiza producto poniendo la id y el elemento a actualizar con el dato que se quiera actualizar
    await manager.updateProduct(3, { nombre: "mother" })


}

prueba() */