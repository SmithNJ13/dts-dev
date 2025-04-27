const request = require('supertest');
const app = require("../app");
const db = require("../database/database");

describe("PATCH", () => {
  it("should update a task", async () => {
    const task = await db.query('INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *', ['Test Task', 'incomplete']);

    const updatedTask = {
      title: 'Updated Task Title',
      status: 'complete',
      description: 'Updated description',
      dueDate: '2025-01-01',
    };

    const response = await request(app)
      .patch(`http://localhost:5433/`)
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
    expect(response.body.status).toBe(updatedTask.status);
  });
});

describe("DELETE", () => {
    it("should delete a task", async () => {
      const task = await db.query('INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *', ['Test Task', 'incomplete']);
      const taskId = task.rows[0].task_id;
  
      const response = await request(app).delete(`http://localhost:5433/${taskId}`);
      expect(response.status).toBe(200);
  
      const deletedTask = await db.query('SELECT * FROM tasks WHERE task_id = $1', [taskId]);
      expect(deletedTask.rows.length).toBe(0);
    });
  });
  
