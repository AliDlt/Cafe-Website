const sqlite3 = require("sqlite3").verbose();

class ProductModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable(); // Call the method to create the table when the model is instantiated
  }

  createTable() {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                price REAL,
                description TEXT,
                image TEXT,
                category_id INTEGER,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )
        `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating products table:", err);
      } else {
        console.log("Products table created successfully");
      }
    });
  }

  getAllProducts(callback) {
    this.db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  getProductById(productId, callback) {
    this.db.get(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (err, row) => {
        if (err) {
          return callback(err);
        }
        callback(null, row);
      }
    );
  }

  createProduct(productData, callback) {
    const { name, price, description, image, category_id } = productData;
    this.db.run(
      "INSERT INTO products (name, price, description, image, category_id) VALUES (?, ?, ?, ?, ?)",
      [name, price, description, image, category_id],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  }

  updateProduct(productId, updatedData, callback) {
    const { name, price, description, image, category_id } = updatedData;
    this.db.run(
      "UPDATE products SET name = ?, price = ?, description = ?, image = ?, category_id = ? WHERE id = ?",
      [name, price, description, image, category_id, productId],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.changes);
      }
    );
  }

  deleteProduct(productId, callback) {
    this.db.run(
      "DELETE FROM products WHERE id = ?",
      [productId],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.changes);
      }
    );
  }
}

module.exports = ProductModel;
