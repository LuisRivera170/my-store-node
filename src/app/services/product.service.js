const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor() {
    this.validProductElements = ['name', 'price', 'image'];
    this.products = [];
    this.init();
  }

  init() {
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: index,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
      Object.keys(data).forEach((key) => this.validProductElements.includes(key) || delete data[key]);
      const newProduct = {
        id: this.products.length,
        ...data
      }
      this.products.push(newProduct);
      return newProduct;
  }

  async find(limit) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(limit ? this.products.slice(0, limit) : this.products);
      }, 1000);
    });
  }

  async findOne(id) {
    const product  = this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Producto is blocked');
    }
    return product
  }

  async filter() {
    return this.products[Math.floor(Math.random()*this.products.length)];
  }

  async update(id, data) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw boom.notFound('Product not found');
    }
    Object.keys(data).forEach((key) => this.validProductElements.includes(key) || delete data[key]);
    const product = this.products[productIndex];
    this.products[productIndex] = {
      ...product,
      ...data
    }
    return this.products[productIndex];
  }

  async delete(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(productIndex, 1);
    return { id };
  }

}

module.exports = ProductService;
