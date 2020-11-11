import express from 'express'
import { Task, User } from '../database/schema';
import { IUser } from './user';
const router = express.Router();

interface ITask {
    title: string;
    body: string;
    owner: string;
    assignment: [string];
    created: string;
    value: string;
}

// Get all tasks
router.get("/tasks", (req, res) => {
    Task.find((err, tasks) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        return res.status(200).send(tasks);
    });
});

// Get task by ID
router.get("/task/:id", function (req, res) {
    Task.findById(req.params.id, (err, task) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        if (!task) {
            return res.status(404).send({ error: "Not found" });
        }
        return res.status(200).send(task);
    });
});

// Create new task
router.post("/api/task", function (req, res) {
    const task = new Task(req.body);

    task.save((err) => {
        if (err) {
            if (err.name === "ValidationError") {
                return res.status(400).send({ error: "Validation error" });
            } else {
                return res.status(500).send({ error: "Server error" });
            }
        }
        return res.status(200).send(task);
    });
});

// Add/change some values
router.patch("/api/task/:id", function (req, res) {
    var updateObject = req.body;
    var { id } = req.params;
    Task.findOneAndUpdate({ _id: id }, { $set: updateObject }, {
        new: true
    }, (err, task) => {
        if (err) {
            return res.status(500).send({ error: "Server error: " + err });
        }
        return res.status(200).send(task);
    });
});

// Delete task
// Удалить можно только юзеру с level >= 3
router.delete("/api/task/:id", function (req, res) {
    User.findById(req.body.userId, (err, user: IUser) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        if (!user) {
            return res.status(404).send({ error: "Not found user with ID: " + req.params.userId });
        }
        if (user.level < 3) {
            return res.status(403).send({ error: "You don't have permission" });
        }

        Task.findByIdAndDelete(req.params.id, (err, task) => {
            if (err) {
                return res.status(500).send({ error: "Server error" });
            }
            if (!task) {
                return res.status(404).send({ error: "No task with such ID" });
            }
            return res.status(200).send(task);
        });
    });

});

export default router;