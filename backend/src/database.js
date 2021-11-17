const mongoose = require("mongoose");

const URI = "mongodb://localhost/merngallery";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then((db) =>
    console.log("Database connected in collection", db.connection.name)
  )
  .catch((error) => console.log("Cannot connect to database.", error.message));

module.exports = mongoose;
