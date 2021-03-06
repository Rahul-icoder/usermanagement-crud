const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "crudUser",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch((err) => console.log("error",err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("disconnected",()=>{
  console.log("Mongoose disconnected")
})