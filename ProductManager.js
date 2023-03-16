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
        const status = true
        const newProducts = { id, code, status, ...product }
        products.push(newProducts)
        await this.#saveProducts(products)
        return newProducts

    }

    async getProductById(id) {

        const products = await this.getProducts()
        const product = products.find(p => p.id === id)


        return product


    }

    async deleteProductById(id) {

        const products = await this.getProducts()
        let arrayNewProducts = []
        arrayNewProducts = products.filter((p) => p.id !== id)
        await this.#saveProducts(arrayNewProducts)

    }

    async updateProduct(id, obj) {

        const products = await this.getProducts()
        const indexProduct = products.findIndex(p => p.id === id)
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
