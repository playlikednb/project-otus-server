import express from 'express'
import { User } from '../database/schema';
const router = express.Router();

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    picture: string;
    level: number;
    created: string;
    password: string;
}

router.get("/users", (req, res) => {
    User.find((err, tasks) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        return res.status(200).send(tasks);
    });
});

// Get user by ID
router.get("/user/:id", function (req, res) {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        if (!user) {
            return res.status(404).send({ error: "Not found" });
        }
        return res.status(200).send(user);
    });
});

// Create new user
router.post("/api/user", function (req, res) {
    const user = new User(req.body);

    user.save((err) => {
        if (err) {
            if (err.name === "ValidationError") {
                return res.status(400).send({ error: "Validation error" });
            } else {
                return res.status(500).send({ error: "Server error" });
            }
        }
        return res.status(200).send(user);
    });
});

// Delete user
router.delete("/api/user", function (req, res) {
    User.findByIdAndDelete(req.body.id, (err, user) => {
        if (err) {
            return res.status(500).send({ error: "Server error" });
        }
        if (!user) {
            return res.status(404).send({ error: "No user with such ID" });
        }
        return res.status(200).send(user);
    });
});

export default router;
