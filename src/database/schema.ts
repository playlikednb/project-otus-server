import mongoose from 'mongoose'
const { Schema } = mongoose

const ENUM_VALUE = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
    CRITICAL: 'CRITICAL',
}

const TaskSchema = new Schema({
    title: { type: String, required: true },
    body: String,
    owner: String,
    assignment: [String],
    created: { type: Date, default: Date.now },
    value: { type: String, enum: Object.values(ENUM_VALUE), default: ENUM_VALUE.NORMAL }
})

const UserSchema = new Schema({
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    picture: String,
    level: { type: Number, min: 1, max: 3, default: 1 },
    created: { type: Date, default: Date.now },
    password: { type: String, required: true, minlength: 6 }
})

export const Task = mongoose.model("tasks", TaskSchema)
export const User = mongoose.model("users", UserSchema)
