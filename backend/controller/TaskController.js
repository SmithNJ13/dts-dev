const Task = require("../model/Task")

const index = async(req, res) => {
    try {
        const task = await Task.getAll()
        res.status(200).send({Task: task})
    } catch (error) {
        res.status(500).send({Error: error.message})
    }
}

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const task = await Task.getByID(id)
        res.status(200).send(task)
    } catch (error) {
        res.status(404).send("No tasks found")
    }
}

const create = async(req, res) => {
    try {
        const data = req.body
        const task = await Task.create(data)
        res.status(201).send({data: task})
    } catch (error) {
        // console.log(req.body)
        res.status(400).send({error: error})
    }
}

const update = async(req, res) => {
    try {
        const data = req.body
        const updateData = await Task.update(data)
        res.status(200).send({data: updateData})
    } catch (error) {
        res.status(400).send({error: error})
    }
}

const destroy = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        await Task.delete(id)
        res.json({message: "Task deleted successfully!"})
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

module.exports = {index, getById, create, update, destroy}
