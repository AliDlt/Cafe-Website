const sqlite3 = require("sqlite3").verbose();

class CategoryModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable(); // Call the method to create the table when the model is instantiated
  }

  createTable() {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                image TEXT
            )
        `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating categories table:", err);
      } else {
        console.log("Categories table created successfully");
      }
    });
  }

  getAllCategories(callback) {
    this.db.all("SELECT * FROM categories", (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  getCategoryById(categoryId, callback) {
    this.db.get(
      "SELECT * FROM categories WHERE id = ?",
      [categoryId],
      (err, row) => {
        if (err) {
          return callback(err);
        }
        callback(null, row);
      }
    );
  }

  createCategory(categoryData, callback) {
    const { name, image } = categoryData;
    this.db.run(
      "INSERT INTO categories (name, image) VALUES (?, ?)",
      [name, image],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  }

  updateCategory(categoryId, updatedData, callback) {
    const { name, image } = updatedData;
    this.db.run(
      "UPDATE categories SET name = ?, image = ? WHERE id = ?",
      [name, image, categoryId],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.changes);
      }
    );
  }

  deleteCategory(categoryId, callback) {
    this.db.run(
      "DELETE FROM categories WHERE id = ?",
      [categoryId],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.changes);
      }
    );
  }
}

module.exports = CategoryModel;
