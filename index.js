require('dotenv').config()
require("./src/db")

const express = require("express");
const appRouter = require("./src/routes")
const server = express();
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(appRouter);

const PORT = process?.env?.PORT || 5000

server.listen(PORT, (error) => {
    console.log(error)
})