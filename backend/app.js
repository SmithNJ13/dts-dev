const express = require("express")
const cors = require("cors")
const app = express();
const TaskRoutes = require("./route/TaskRoutes")

app.use(cors())
app.use(express.json())

app.use("/", TaskRoutes)

module.exports=app;
