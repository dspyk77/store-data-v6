export default class Product {

  #id;
  #name;
  #category;
  #price;
  #weight;

  constructor(id, name, category, price, weight) {
    this.#id = id;
    this.#name = name;
    this.#category = category;
    this.#price = price;
    this.#weight = weight;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getCategory() {
    return this.#category;
  }

  getPrice() {
    return this.#price;
  }

  getWeight() {
    return this.#weight;
  }

  setId(id) {
    this.#id = id;
  }

  setName(name) {
    this.#name = name;
  }

  setCategory(category) {
    this.#category = category;
  }

  setPrice(price) {
    this.#price = price;
  }

  setWeight(weight) {
    this.#weight = weight;
  }

  toString() {
    return `Product: ` +
      `id=${this.#id}, ` +
      `name=${this.#name}, ` +
      `category=${this.#category}, ` +
      `price=${this.#price}, ` +
      `weight=${this.#weight}`;
  }
}
