import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user'
import taskRouter from './routes/task'
import dbConnect from './database/connect'

dotenv.config()
dbConnect()

const app = express()

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.get('/', function (req, res) {
    res.send('Hello World!!!');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
})