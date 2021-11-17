const { Schema, model } = require("mongoose");
const postSchema = new Schema({
  title: String,
  description: String,
  img: String,
  nameImg: String,
});

postSchema.methods.setimgUrl = function setimgUrl(filename) {
  const url = "http://localhost:4000/";
  this.img = url + "public/" + filename;
  this.nameImg = filename;
};

module.exports = model("posts", postSchema);