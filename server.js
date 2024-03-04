const express = require("express");
const app = express();

// use static files
app.use(express.static("public"));

// template engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// routes
app.use(require("./src/routes/homeRouter"));

app.listen(5000, () => {
  console.log("server is running ... on port 5000 ");
});
