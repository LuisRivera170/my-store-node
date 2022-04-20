const { faker } = require('@faker-js/faker');

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
        image: faker.image.imageUrl()
      });
    }
  }

  create(data) {
      Object.keys(data).forEach((key) => this.validProductElements.includes(key) || delete data[key]);
      const newProduct = {
        id: this.products.length,
        ...data
      }
      this.products.push(newProduct);
      return newProduct;
  }

  find(limit) {
    return limit ? this.products.slice(0, limit) : this.products;
  }

  findOne(id) {
    return this.products.find(product => product.id === id);
  }

  filter() {
    return this.products[Math.floor(Math.random()*this.products.length)];
  }

  update(id, data) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    Object.keys(data).forEach((key) => this.validProductElements.includes(key) || delete data[key]);
    const product = this.products[productIndex];
    this.products[productIndex] = {
      ...product,
      ...data
    }
    return this.products[productIndex];
  }

  delete(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(productIndex, 1);
    return { id };
  }

}

module.exports = ProductService;
