const db = require("../database/database.js");
class Task {
    constructor(data) {
        this.id = data.task_id,
        this.title = data.title,
        this.description = data.description,
        this.status = data.status,
        this.postDate = data.post_date ? data.post_date.toLocaleDateString('en-GB') : null;
        this.due_date = data.due_date ? data.due_date.toLocaleDateString('en-GB') : null;
    }

    static async getAll() {
        const response = await db.query(`SELECT * FROM tasks`)
        if(response.rows.length === 0) {
            throw new Error("You have no tasks")
        }
        return response.rows.map(e => new Task(e))
    }

    static async getByID(id) {
        const response = await db.query(`SELECT * FROM tasks WHERE task_id = $1`, [id])
        if(response) {
            return response.rows[0]
        } else {
            throw new Error(`No tasks with ID ${id}`)
        }
    }

    static async create({id, title, description, postDate, due_date, status}) {
        const response = await db.query(`
            INSERT INTO tasks (title, description, post_date, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [title, description, postDate, due_date, status])
            return new Task(response.rows[0])
    }

    static async update({id, title, description, status, due_date}) {
        const response = await db.query(`
            UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE task_id = $5 RETURNING *`, [title, description, status, due_date, id])
        return response
    }

    static async delete(id) {
        await db.query(
            `DELETE FROM tasks WHERE task_id = $1`, [id]
        )
        return "Deletion successful"
    }

}
module.exports = Task;
