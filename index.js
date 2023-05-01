class ProductManager {

    #products

    constructor(){
        this.#products = []
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

    addProduct = (title, description, price, thumbnail, code, stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('campos incompletos')
            return
        }

        let id = this.generarId()

        let newProduct = {
            id, title, description, price, thumbnail, code, stock
        }
        
        this.#products.push(newProduct);
        console.log('Se almacenó un producto');
    }

    getProducts = () => {
        return this.#products
    }

    getProductById = (id) => {
        const product = this.#products.find((product)=>{
            return product.id == id
        })
        if(!product){
            return 'not found'
        }else {
            return product 
        }
    }

}

const productManager = new ProductManager();
productManager.addProduct('evento1', 'descripcion', 5, 'fds', 'fds', 45)
productManager.addProduct('evento2', 'descripcion2', 7, 'fds', 'fds', 35)
productManager.addProduct('evento3', 'descripcion3', 8,  'fdfdfs', 'fgfds', 25)
console.log(productManager.getProducts());
console.log(productManager.getProductById(2));