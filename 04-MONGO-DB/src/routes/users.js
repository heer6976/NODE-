const routes = require("express").Router()
const userControler = require("../controllers/users")
const auth = require("../middleware/auth")


routes.get("/", auth, userControler.getAll)
routes.post("/register", userControler.register)
routes.post("/reset", auth, userControler.resetPassword)

// try route changing here
routes.get("/:userId", userControler.getOne)
routes.put("/:userId", userControler.updateOne)
routes.delete("/:userId", userControler.deleteOne)

routes.route("/blog/:userId")
    .post(userControler.createBlog)
    .put(userControler.updateBlog)
    .delete(userControler.deleteBlog)

routes.post("/login", userControler.login)
routes.post("/logout", userControler.logout)
routes.post("/sendOTP", userControler.sendOTP)
routes.post("/forgotPassword", userControler.forgotPassword)

module.exports = routes