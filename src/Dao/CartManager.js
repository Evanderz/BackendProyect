import fs from 'fs'
import ProductManager from './ProductManager';

const productManager = new ProductManager('./product.json');

export default class CartManager {

    constructor(path) {

        this.path = path

    }


    async getCarts() {

        if (fs.existsSync(this.path)) {

            const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(infoArchivo)


        } else {
            console.log('Archivo no existe')
            return []
        }

    }


    async addCart() {

        const carts = await this.getCarts()
        const id = await this.#createId(carts)
        const product = []
        const newCart = { id, product }
        carts.push(newCart)
        await this.#saveCarts(carts)
        return newCart

    }

    async getCartById(id) {

        const carts = await this.getCarts()
        const cart = carts.find(p => p.id === id)
        

            return cart

        

    }


    async updateCart(idC, idP) {

        const carts = await this.getCarts()
        const cart = carts.find((cart) => cart.id === idC);
       
       if(!cart){

        return null
       }

      const products = await productManager.getProductById(idP)
      if(!products){

        return null
      }
       const prod = cart.product.find((prod)=>prod.id === idP)

if(!prod){

cart.product.push({idP, quantity:1})


}else{

    products.quantity++
}
await this.#saveCarts(carts);
return cart
       

    }


    async #createId(carts) {

        const id =
            carts.length === 0
                ? 1
                : carts[carts.length - 1].id + 1
        carts.forEach(element => {

            if (element.id === id) {

                id + 1

            }
        })
        return id
    }

    async #saveCarts(carts) {

        await fs.promises.writeFile(this.path, JSON.stringify(carts))
    }







}