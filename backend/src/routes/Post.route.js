const { Router } = require("express");
const postCtrl = require("../controllers/Post.controller");
const upload = require("../middlewares/imgUpload");
const route = Router();

route.get("/list", postCtrl.list);
route.get("/listid/:id", postCtrl.listById);
route.post("/add", upload.single("img"), postCtrl.add);
route.delete("/delete/:id", postCtrl.delete);
route.put("/update/:id", upload.single("img"), postCtrl.update);

module.exports = route;
