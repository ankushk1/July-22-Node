const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/july22DB");


const db = mongoose.connection;

db.on("error", () => {
  console.log('err connecting to DB')
})

db.once("open", () => {
  console.log('Successfully connected to DB');
})


//CcX5UCRk8GbFndjT
//ankush011