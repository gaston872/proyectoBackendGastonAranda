import express from 'express'
import ProductManager from './classes/ProductManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager()

app.get('/productos', async (req, res) => {
    const productos = await productManager.cargarProductos()
    res.send({productos})
})

app.get('/productos/:id', async (req, res) => {
    const producto = await productManager.getProductById(req.params.id)
    res.send({producto})
})


app.get('/productos', async (req, res) => {
    let limit = req.query.limit
    //const productos = await productManager.cargarProductos(limit)

    const productos = await productManager.cargarProductos(limit)

    const productosLimitados = productos.slice(0, limit)
    res.send({productosLimitados})

    /* for (let i = 0; i = limit; i++) {
        res.send(productos[i])
    } */
})

app.listen(8080, ()=>{
    console.log('Servidor levantado');
})