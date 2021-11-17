const postCtrl = {};
const { deleteImg } = require("../helpers/deleteImg");
const postModel = require("../models/Post.model");

postCtrl.list = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json({
      ok: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

postCtrl.listById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById({ _id: id });
    post
      ? res.json({ ok: true, post })
      : res.status(404).json({ ok: false, message: "Post not found." });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

postCtrl.add = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new postModel({
      title,
      description,
    });
    if (req.file) {
      const { filename } = req.file;
      newPost.setimgUrl(filename);
    }
    await newPost.save();
    res.status(201).json({ ok: true, newPost });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

postCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById({ _id: id });
    if (!post) {
      return res.json({ ok: false, message: "Post not found." });
    }
    if (post.nameImg) {
      deleteImg(post.nameImg);
    }
    await post.deleteOne();
    res.json({
      ok: true,
      message: "Post has been deleted.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

postCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById({ _id: id });
    if (!post) {
      return res.json({ ok: false, message: "Post not found." });
    }
    if (req.file) {
      if (post.nameImg) {
        deleteImg(post.nameImg);
      }
      const { filename } = req.file;
      post.setimgUrl(filename);
      await post.save();
    }
    await post.updateOne(req.body);
    res.json({
      ok: true,
      message: 'Post has been updated.'
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = postCtrl;
