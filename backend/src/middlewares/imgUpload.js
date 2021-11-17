const multer = require("multer");
const path = require("path");
const { pathToFileURL } = require("url");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../storage/imgs/"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname.toLocaleLowerCase()));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|JPG|JPEG|PNG|png|svg|SVG/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: file must has jpg|jpeg|JPG|JPEG|PNG|png|svg|SVG extension.");
  },
});

module.exports = upload;
