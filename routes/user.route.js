const express = require("express");
const bcrypt = require("bcrypt");

const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const payload = req.body;

  try {
    phone = payload.phone;
    let userphone =await UserModel.findOne({ phone });
    if (userphone) {
      return res.status(401).send({ msg: "Phone!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(payload.password, salt);
    payload.password = hashedPass;

    const user = new UserModel(payload);
    user.save();
    res.send({ msg: "User registered successfully!", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Error" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return res.status(401).send({ msg: "Wrong Phone!" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send({ msg2: "Wrong Password!" });
    }

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.send({ msg: "Login Successful", token: token });
    console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

userRouter.delete("/user/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await UserModel.findByIdAndDelete({ _id: ID });
    res.send("Account Deleted!");
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Can not be deleted" });
  }
});

module.exports = { userRouter };



