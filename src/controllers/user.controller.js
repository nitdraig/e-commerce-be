const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    next(error);
  }
};
