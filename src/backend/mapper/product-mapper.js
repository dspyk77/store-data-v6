import Product from '@/backend/model/product';

export default class ProductMapper {

  static fromObject(object) {
    return new Product(object.id, object.name, object.category, object.price, object.weight);
  }

  static fromObjectCollection(objectCollection) {
    const results = [];

    for (let object of objectCollection) {
      results.push(this.fromObject(object));
    }

    return results;
  }

  static toObject(product) {
    const object = {
      id: product.getId(),
      name: product.getName(),
      category: product.getCategory(),
      price: product.getPrice(),
      weight: product.getWeight()
    };

    return object;
  }

  static toObjectCollection(products) {
    const objects = [];

    for (let product of products) {
      const object = this.toObject(product);

      objects.push(object);
    }

    return objects;
  }
}
