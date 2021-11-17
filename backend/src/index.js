const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('./database')

require("./database");

const app = express();

app.set("Port", 4000);
app.use('/public/',express.static(__dirname + "/storage/imgs"))

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/", require("./routes/Post.route"));
// app.use("/", require())\
app.listen(app.get("Port"), () => {
  console.log(`Server running in ${app.get("Port")} port.`);
});
