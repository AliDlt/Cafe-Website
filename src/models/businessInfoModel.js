const sqlite3 = require("sqlite3").verbose();

class BusinessInfoModel {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath);
    this.createTable(); // Call the method to create the table when the model is instantiated
  }

  createTable() {
    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS business_info (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                colors TEXT,
                logo TEXT
            )
        `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating business_info table:", err);
      } else {
        console.log("BusinessInfo table created successfully");
        // Insert default entry after table creation
        const defaultEntry = {
          name: "کافه رویا",
          colors: ["#FF5733", "#FFC300", "#C70039"],
          logo: "/img/defaultLogo.png",
        };
        this.updateBusinessInfo(defaultEntry, (err, id) => {
          if (err) {
            console.error("Error inserting default entry:", err);
          } else {
            console.log("Default entry inserted successfully with ID:", id);
          }
        });
      }
    });
  }

  getBusinessInfo(callback) {
    this.db.get(
      "SELECT * FROM business_info ORDER BY id DESC LIMIT 1",
      (err, row) => {
        if (err) {
          return callback(err);
        }
        callback(null, row);
      }
    );
  }

  updateBusinessInfo(updatedData, callback) {
    const { name, colors, logo } = updatedData;
    this.db.run(
      "INSERT OR REPLACE INTO business_info (id, name, colors, logo) VALUES (1, ?, ?, ?)",
      [name, JSON.stringify(colors), logo],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  }
}

module.exports = BusinessInfoModel;
