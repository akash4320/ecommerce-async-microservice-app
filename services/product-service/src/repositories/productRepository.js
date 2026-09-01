const pool = require("../config/database");

const findAll = async () => {
  const [rows] = await pool.execute(
    `
      SELECT
        id,
        name,
        description,
        price,
        available_quantity,
        created_at,
        updated_at
      FROM products
      ORDER BY id
    `,
  );

  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT
        id,
        name,
        description,
        price,
        available_quantity,
        created_at,
        updated_at
      FROM products
      WHERE id = ?
    `,
    [id],
  );

  return rows[0];
};

module.exports = {
  findAll,
  findById,
};
