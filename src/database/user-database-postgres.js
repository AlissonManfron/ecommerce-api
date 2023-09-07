import { sql } from "./db.js"
import bcrypt from 'bcryptjs'

export default class UserDatabasePostgres {

  async create(user) {
    const { name, email, password } = user

    const hash = await bcrypt.hash(password, 10)

    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hash})`
  }

  async find(email) {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length > 0) {
      return users[0]
    } else {
      return null
    }
  }

  async getAll() {
    return await sql`SELECT * FROM users`
  }

}