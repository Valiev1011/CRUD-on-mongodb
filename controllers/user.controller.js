const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/User");

const addUser = async (req, res) => {
  try {
    //addUser
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res.status(400).send({ message: "Ma'lumotlarni to'liq kiriting" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "Bunday email mavjud" });
    }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ message: "Foydalanuvchi qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUsers = async (req, res) => {
  try {
    //getUsers
    const users = await User.find({});
    if (!users) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUserById = async (req, res) => {
  try {
    //getUserById
    const id = req.params.id;
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};
const loginUser = async (req, res) => {
  try {
    //loginUser
    const { name, email, password } = req.body;
    const user = await User.find({ $and: [{ email }, { password }] });
    console.log(user);
    if (user.length == 0) {
      res.status(400).send({ message: "Wrong email or password" });
    } else {
      res.send({ message: "You logged in" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const id = req.params.id;

    const user = await User.updateOne({
      _id: id,
      $set: { name: name, email: email, password: password },
    });

    if (user.matchedCount == 0) {
      return res.status(400).send({ message: "there's no such id" });
    }
    res.json({ message: "updated", user });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleUser = async (req, res) => {
  try {
    //deleUser
    const id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    res.send({ message: "User Deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  addUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
  deleUser,
};
