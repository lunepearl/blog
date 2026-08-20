const express = require("express")
const { loginUser, registerUser } = require("../controllers/auth.controller")
const { loginUserMiddleware, registerUserMiddleWare, authenticateUserMiddleware } = require("../middlewares/auth.middleware")

const authRouter = express.Router();
authRouter.post("/login", loginUserMiddleware, loginUser)

authRouter.post("/register", registerUserMiddleWare, registerUser)


module.exports = { authRouter }