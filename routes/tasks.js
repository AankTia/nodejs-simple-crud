const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// List all tasks
router.get("/", (req, res) => {
    Task.getAll((err, tasks) => {
        if (err) {
            return res.status(500).send("Error retrieving tasks");
        }
        res.render("index", { tasks })
    });
});

// Show form to create a new task
router.get("/new", (req, res) => {
    res.render("create");
});

// Create a new task
router.post("/", (req, res) => {
    const taskData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };

    Task.create(taskData, (err, taskId) => {
        if (err) {
            return res.status(500).send("Error creating task");
        }
        res.redirect("/tasks");
    });
});

// Show form to edit a task
router.get("/:id/edit", (req, res) => {
    Task.getById(req.params.id, (err, task) => {
        if (err || !task) {
            return res.status(404).send("Task not found");
        }
        res.render("edit", { task })
    });
});

// Update a task
router.put("/:id", (req, res) => {
    const taskData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
    };

    Task.update(req.params.id, taskData, (err, changes) => {
        if (err) {
            return res.status(500).send("Error updating task");
        }
        res.redirect("/tasks");
    });
});

// Delete a task
router.delete("/:id", (req, res) => {
    Task.delete(req.params.id, (err, changes) => {
        if (err) {
            return req.status(500).send("Error deleting task");
        }
        res.redirect("/tasks");
    });
})

// Show a single task
router.get("/:id", (req, res) => {
    Task.getById(req.params.id, (err, task) => {
        if (err || !task) {
            return res.status(404).send("Task not found");
        }
        res.render("show", { task });
    });
});

module.exports = router;