const Router = require("express").Router
const client = require("../config/db")
const userController = require("../controllers/user-controller")
const router = new Router
const { body } = require('express-validator');
const authMiddleware  =  require("../middleware/auth-middleware")

router.post("/registration", 
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 25}),
    userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/activate/:link", userController.active)
router.post("/refresh", userController.refresh)
router.get("/users" ,authMiddleware,  userController.getUsers)
router.get("/getCookie", userController.getCookie)
module.exports = router