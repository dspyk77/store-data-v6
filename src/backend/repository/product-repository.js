import DbConnection from '@/backend/config/db-connection';
import ProductMapper from '@/backend/mapper/product-mapper';

export default class ProductRepository {

  static async findAll() {
    console.log('[ProductRepository#findAll]');
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM products
    `);

    const productData = results[0];

    const products = ProductMapper.fromObjectCollection(productData);

    return products;
  }

  static async findById(id) {
    console.log(`[ProductRepository#findById] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const results = await dbConnection.execute(`
      SELECT *
      FROM products
      WHERE id = ${id}
    `);

    const productDatum = results[0][0];

    const product = ProductMapper.fromObject(productDatum);

    return product;
  }

  static async create(product) {
    console.log(`[ProductRepository#create] ${product}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      INSERT INTO products (name, category, price, weight)
      VALUES (?, ?, ?, ?)
    `;

    const values =
    [product.getName(), product.getCategory(), product.getPrice(), product.getWeight()];

    await dbConnection.execute(sql, values);
  }

  static async update(product) {
    console.log(`[ProductRepository#update] ${product}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      UPDATE products
      SET name = ?,
          category = ?,
          price = ?,
          weight = ?
      WHERE id = ?
    `;

    const values = [
      product.getName(),
      product.getCategory(),
      product.getPrice(),
      product.getWeight(),
      product.getId()
    ];

    await dbConnection.execute(sql, values);
  }

  static async destroy(id) {
    console.log(`[ProductRepository#destroy] ${id}`);
    const dbConnection = await DbConnection.getConnection();

    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    await dbConnection.execute(sql, [id]);
  }
}
