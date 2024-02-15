const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { password, email } = req.body;
  //   const HASHED_PASSWORD = await bcrypt.hash(password, 10);

  try {
    const userExist = await User.find({ email: email });
    if (!userExist) {
      res.status(401).send({ message: "credenciais invalidas" });
      return;
    }
    if (!bcrypt.compareSync(password, userExist[0].password)) {
      res.status(401).send({ message: "credenciais invalidas" });
      return;
    }
    const TOKEN = jwt.sign({ userId: userExist._id, Permission });
    res.status(201).send({ menssage: "login efetuado!" });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau no login!" });
  }
}

async function forgotPassword(req, res) {
  const userBody = req.body;
  try {
    res.status(201).send({ menssage: "usuario criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.send({ menssage: "deu pau no no usuario!" });
  }
}

module.exports = {
  loginUser,
  forgotPassword,
};
