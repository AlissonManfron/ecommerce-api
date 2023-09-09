import { sql } from "./db.js";

export default class ProductDatabasePostgres {

  async create(product) {
    const { title, description, price, productGroup, imageUrl } = product

    await sql`INSERT INTO products (title, description, price, productGroup, imageUrl) VALUES (${title}, ${description}, ${price}, ${productGroup}, ${imageUrl})`
  }

  async findById(id) {
    const products = await sql`SELECT * FROM products WHERE id = ${id}`;

    if (products.length > 0) {
      return products[0]
    } else {
      return null
    }
  }

  async findByGroup(group) {
    const products = await sql`SELECT * FROM products WHERE LOWER(productGroup) ILIKE LOWER(${group})`;

    return products
  }

  async getAll() {
    return await sql`SELECT * FROM products`
  }

}