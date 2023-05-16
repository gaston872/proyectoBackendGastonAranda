import fs from 'fs'

export default class ProductManager {

    #products
    #path

    constructor(){
        this.#products = []
        this.#path = './src/classes/files/productos.json'
    }

    cargarProductos = async(limit) => {
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
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, '\t'))
    }

    getProducts = async () => {
        const products = await this.cargarProductos()
        console.log('Lista de productos:');
        /* this.# */products.forEach(product => {
            console.log(product);
        });
    }

    getProductById = async(id) => {
        const products = await this.cargarProductos()
        const productoBuscado = /* this.# */products.find(p=> p.id == id)
        if(!productoBuscado){
            return 'not found'/* console.log('not found'); */ 
        }else {
            return productoBuscado /* console.log(productoBuscado); */  
        }
    }

    getProductBylimit = async(limit) => {
        const products = await this.cargarProductos()

    const productosLimitados = products.slice(0, limit)
    return console.log(productosLimitados);
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
        const products = await this.cargarProductos()
        const index = /* this.# */products.findIndex(product => product.id === id);
        if (index !== -1) {
            const eliminado = /* this.# */products.splice(index, 1)[0];
            for (let i = index; i < products.length; i++) {
                products[i].id = i + 1;}
            await this.saveProducts();
            console.log('Producto eliminado:', eliminado);
        } else {
            console.log('Producto no encontrado');
        }
    }

    actualizarProducto = async (id, newInfo) => {
        this.#products = await this.cargarProductos();
        const index = this.#products.findIndex(product => product.id === id);

        if (index !== -1) {
            const updatedProduct = { ...this.#products[index], ...newInfo };
            this.#products[index] = updatedProduct;
            await this.saveProducts();
            console.log('Producto modificado:', updatedProduct);
            return updatedProduct;
        } else {
            console.log('Producto no encontrado');
            return null;
        }
    }
}

const manager = new ProductManager();

/* manager.addProduct('Producto 1', 'Descripción 1', 10, 'thumbnail1.jpg', 'CODE1', 20);
manager.addProduct('Producto 2', 'Descripción 2', 20, 'thumbnail2.jpg', 'CODE2', 15);
manager.addProduct('Producto 3', 'Descripción 3', 15, 'thumbnail3.jpg', 'CODE3', 30);
manager.addProduct('Producto 4', 'Descripción 4', 25, 'thumbnail4.jpg', 'CODE4', 12); */
//manager.deleteProduct(3)
//manager.actualizarProducto(2, {price: 18, stock: 16})
//manager.getProducts(); 
//manager.getProductBylimit(2)
//console.log(manager.getProductById(2));

/* async function test() {
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

test(); */