const express = require("express")

const { updateUser, updateUserPassword, getUserById } = require("../controllers/user.controller")
const { updateUserDetailsMiddleware, changeUserPasswordMiddleware, idMiddleware, authenticateUserMiddleware } = require("../middlewares");

const userRouter = express.Router();
userRouter.get("/user", authenticateUserMiddleware, getUserById)
userRouter.put("/user/:id", idMiddleware, authenticateUserMiddleware, updateUser)
userRouter.patch("/user/:id", idMiddleware, authenticateUserMiddleware, updateUserPassword)

module.exports = { userRouter }