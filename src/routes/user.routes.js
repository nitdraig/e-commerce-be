const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:userId", UserController.getUserByID);
router.get("/", UserController.getAllUsers);
module.exports = router;
