import express from "express";
import User from "../Model/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    // console.log("users", users);
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(req.body);
    const result = await newUser.save();
    console.log(result);
    res.status(200).json({
      status: "success",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // const username = req.query.username;
    // console.log(userId);

    const user = await User.findById(userId);
    // : await User.findOne({ username: username });
    // if we dont want to show some property
    const { password, ...other } = user._doc;
    res.status(200).json({
      status: "success",
      user: other,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
      user: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

router.post("/get-user-info", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        status: "no user found",
        user: null,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

export default router;
