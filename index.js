const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
// app.get("/home", (req, res) => {
//   res.send("<h1>Server is running on 8000</h1>");
// });

// app.get("/info", (req, res) => {
//   res.json({ name: "ABC", age: 20 });
// });

// // Headers, body, params/urlparams , query/queryparams

// app.post("/addUser", (req, res) => {
//   console.log(req.headers['access-token'])
//   res.json(req.body);
// });

// let productsArr = ["Iphone", "Laptop", "Smart Watch", "Headphones"];

// app.post("/addProduct", (req, res) => {
//   const productToBeAdded = req.body.product;
//   console.log(productToBeAdded);
//   productsArr.push(productToBeAdded);
//   res.json({ message: "Product added Successfully" });
// });

// app.method( "/route", () => {controller})
// app.delete("/delete/:name", (req, res) => {
//   // You will remove 2 elements from array start
//   // and 2 elements from index 2
//   // If we want to remove based on name of product

//   console.log(req.params.name);
//   const filteredArr = productsArr.filter((elem) => elem !== req.params.name);
//   productsArr = filteredArr;
//   res.json({ message: "Product deleted successfully" });
// });

// app.put("/update/:index", (req, res) => {
//   const idx = req.params.index;
//   const newProduct = req.body.product;
//   // productsArr.splice(idx, 1, newProduct);
//   productsArr[idx] = newProduct
//   res.json({ message: "Product updated Successfully" });
// });

// app.get("/products", (req, res) => {
//   res.json({ products: productsArr });
// });

app.set("privateKey", "secret");

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
