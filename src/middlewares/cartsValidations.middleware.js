import CartManager from "../../CartManager.js"
const cartManager = new CartManager('./carts.json')


export const validarIdC = async (req, res, next) => {
    const { idCart } = req.params
    const carts = await cartManager.getCarts()
    const indexCart = carts.findIndex(p => p.id === +idCart)
    if (indexCart === -1) {
        res.send({ message: "Carrito no encontrado" })
    } else {

        next()
    }
}