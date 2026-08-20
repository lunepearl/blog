const { verifyJWTToken, parseJoiError, createReturnError } = require("../utils/functions")
const { loginSchema, registerSchema } = require("../validation")

const authenticateUserMiddleware = async (req, res, next) => {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")?.[1]
    const payload = await verifyJWTToken(token)
    console.log(payload)
    if (!payload) {
        res.status(401).json({ message: "unauthorized" })
        return;
    }
    req.auth = payload
    next();
    return;

}

const isAdminMiddleWare = async (req, res, next) => {
    const auth = req?.auth;
    const isAdmin = await req?.auth?.role === "admin";
    if (!isAdmin) {
        res.status(403).json({ message: "Forbidden!" })
        return;
    }
    next();
    return;
}

const registerUserMiddleWare = async (req, res, next) => {
    try {
        const body = req?.body;
        console.log("register body", body)
        const { error } = await registerSchema.validate(body);
        console.log("register error", error)
        parseJoiError(error)
        next();
    } catch (error) {
        res.status(400).json(error)
    }
}
const loginUserMiddleware = async (req, res, next) => {
    try {
        const body = req?.body;
        const { error } = await loginSchema.validate(body);
        parseJoiError(error)
        next();
    } catch (error) {
        res.status(400).json(error)

    }
}

module.exports = { authenticateUserMiddleware, registerUserMiddleWare, loginUserMiddleware, isAdminMiddleWare }