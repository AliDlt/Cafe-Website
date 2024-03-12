const express = require("express");
const morgan = require("morgan");
const app = express();

// use static files
app.use(express.static("public"));

app.use(morgan("tiny"));

// template engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// routes
app.use(require("./src/routes/businessInfoRoutes"));
app.use(require("./src/routes/productRoutes"));
app.use(require("./src/routes/categoryRoutes"));
app.use(require("./src/routes/homeRoutes"));

app.listen(5000, () => {
  console.log("server is running ... on port 5000 ");
});
