import fs from 'fs'

export default class ProductManager {

    #products
    #path

    constructor(){
        this.#products = []
        this.#path = './files/productos.json'
    }

    cargarProductos = async() => {
        if(fs.existsSync(this.#path)){
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)
            return this.#products 
        } else {
            return []
        }
    }

    generarId = () => {
        let id
        if(this.#products.length === 0){
            id = 1
        } else {
            id = this.#products[this.#products.length-1].id + 1
        }
        return id
    }

    saveProducts = async() => {
        const data = JSON.stringify(this.#products, null, '\t')
        await fs.promises.writeFile(this.#path, data, 'utf-8')
    }

    getProducts() {
        console.log('Lista de productos:');
        this.#products.forEach(product => {
            console.log(product);
        });
    }

    getProductById = async(id) => {
        const product = this.#products.find(p=> p.id == id)
        if(!product){
            return console.log('not found'); 
        }else {
            return console.log(product);  
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('campos incompletos')
            return
        } else if (this.#products.find(prod => prod.code === code)) {
            console.error('Ya existe un producto con ese codigo')
            return
        }

        let id = this.generarId()

        let newProduct = {
            id, title, description, price, thumbnail, code, stock
        }
        
        this.#products.push(newProduct);
        
        await this.saveProducts()
        console.log('Se almacenó un producto', newProduct);
        return this.#products
    }

    deleteProduct = async(id) => {
        const index = this.#products.findIndex(product => product.id === id);
        if (index !== -1) {
            const eliminado = this.#products.splice(index, 1)[0];
            await this.saveProducts();
            console.log('Producto eliminado:', eliminado);
        } else {
            console.log('Producto no encontrado');
        }
    }

    actualizarProducto = async(id, newInfo) => {
        const product = this.getProductById(id);
        if (!product) {
            console.log('Producto no encontrado');
            return;
        }

        const updatedProduct = { ...product, ...newInfo };
        this.#products = this.#products.map(p => (p.id === id ? updatedProduct : p));
        await this.saveProducts();
        console.log('Producto modificado:', updatedProduct);
    }
}

const manager = new ProductManager();

async function test() {
        await manager.addProduct('Producto 1', 'Descripción 1', 10, 'thumbnail1.jpg', 'CODE1', 20);
        await manager.addProduct('Producto 2', 'Descripción 2', 20, 'thumbnail2.jpg', 'CODE2', 15);
        await manager.addProduct('Producto 3', 'Descripción 3', 15, 'thumbnail3.jpg', 'CODE3', 30);
        await manager.addProduct('Producto 4', 'Descripción 4', 25, 'thumbnail4.jpg', 'CODE4', 12);

        manager.getProducts();

        const productId = 1;
        const product = manager.getProductById(productId);
        console.log('Producto con ID', productId, ':', product);

        const newInfo = {
            title: 'Producto Modificado',
            price: 30,
        };
        await manager.actualizarProducto(productId, newInfo);
        manager.getProducts();

        const productoEliminarId = 3;
        await manager.deleteProduct(productoEliminarId);
        manager.getProducts();
}

test();