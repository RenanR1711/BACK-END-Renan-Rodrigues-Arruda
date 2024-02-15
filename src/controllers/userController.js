const User = require("../models/userModels");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const { userName, email, password, birtday, location, wallet } = req.body;
  const API_KEY = req.headers["api_key"];
  // const SALT_ROUNDS = 10;
  console.log(API_KEY);
  if (API_KEY !== "minha_chave_secreta") {
    res.status(401).send({ message: "nao autorizado" });
    return;
  }
  const hasPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      userName: userName,
      email: email,
      password: hasPassword,
      birtday: birtday,
      location: location,
      wallet: wallet,
    });
    await newUser.save();
    res.status(201).send({ menssage: "usuario criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau no no usuario!" });
  }
}
async function readAlluser(req, res) {
  try {
    const listUser = await User.find();
    res.send({ date: listUser });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau na lista dos usuarios!" });
  }
}

async function updateUser(req, res) {
  const userBody = req.body;
  const { userName, email, password, birtday, location, wallet } = req.body;
  try {
    console.log(req.params.id);
    const mongoPayload = {
      userName: userName,
      email: email,
      password: password,
      birtday: birtday,
      location: location,
      wallet: wallet,
    };
    const userUpdated = await User.findByIdAndUpdate(
      req.params.id,
      mongoPayload,
      { new: true }
    );
    console.log(userUpdated);
    res.send({ message: "usuario atualizado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "usuario não encontrado!" });
  }
}
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send({ menssage: "usuario deletado com sucesso!" });
  } catch (error) {}
}
module.exports = {
  createUser,
  readAlluser,
  deleteUser,
  updateUser,
};
