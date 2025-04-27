const {Router} = require("express")
const TaskController = require("../controller/TaskController")

const TaskRouter = Router()

TaskRouter.get("/", TaskController.index)
TaskRouter.get("/:id", TaskController.getById)
TaskRouter.post("/", TaskController.create)
TaskRouter.patch("/", TaskController.update)
TaskRouter.delete("/:id", TaskController.destroy)


module.exports = TaskRouter