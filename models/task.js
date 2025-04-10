const db = require("../database");

class Task {
    // Get all tasks
    static getAll(callback) {
        const sql = "SELECT * FROM tasks ORDER BY created_at DESC";
        db.all(sql, [], (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, rows)
        });
    }

    // Get a single task by ID
    static getById(id, callback) {
        const sql = "SELECT * FROM tasks WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, row);
        });
    }

    // Create a new task
    static create(taskData, callback) {
        const { title, description, status } = taskData;
        const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
        db.run(sql, [title, description, status || "pending"], function (err){
            if (err) {
                return callback(err, null);
            }
            return callback(null, this.lastID);
        });
    }

    // Update an existing task
    static update(id, taskData, callback) {
        const { title, description, status } = taskData;
        const sql = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
        db.run(sql, [title, description, status, id], function (err) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, this.changes);
        });
    }

    // Delete a task
    static delete(id, callback) {
        const sql = "DELETE FROM tasks WHERE id = ?";
        db.run(sql, [id], function (err) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, this.changes);
        });
    }
}

module.exports = Task;