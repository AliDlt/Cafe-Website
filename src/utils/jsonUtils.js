const fs = require("fs");

// Function to read data from a JSON file
exports.readDataFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(data));
    });
  });
};

// Function to write data to a JSON file
exports.writeDataToFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};
