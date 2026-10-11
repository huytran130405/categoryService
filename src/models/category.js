import { pool } from "../db.js";
export const all = async () =>
  (await pool.query("SELECT * FROM categories ORDER BY id")).rows;
export const byId = async (id) =>
  (await pool.query("SELECT * FROM categories WHERE id=$1", [id])).rows[0];
export const create = async ({ name, description }) =>
  (
    await pool.query(
      "INSERT INTO categories(name,description) VALUES($1,$2) RETURNING *",
      [name, description],
    )
  ).rows[0];
export const update = async (id, { name, description }) =>
  (
    await pool.query(
      "UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [name, description, id],
    )
  ).rows[0];
export const remove = async (id) =>
  (await pool.query("DELETE FROM categories WHERE id=$1", [id])).rowCount;
