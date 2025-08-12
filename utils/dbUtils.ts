import mysql from "mysql2/promise";

export async function getDbConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "admin",
    database: process.env.DB_NAME || "saucedemo7",
  });
}

export async function getAllProducts() {
  const conn = await getDbConnection();
  const [rows] = await conn.execute("SELECT * FROM products");
  await conn.end();
  return rows;
}

export async function getProductByName(name: string) {
  const conn = await getDbConnection();
  const [rows] = await conn.execute("SELECT * FROM products WHERE name = ?", [
    name,
  ]);
  await conn.end();
  return rows[0];
}
