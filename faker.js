const faker = require('faker');

function generateProduct() {
    return {
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
    };
}

module.exports = generateProduct;