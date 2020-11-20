import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user'
import taskRouter from './routes/task'
import dbConnect from './database/connect'


dotenv.config()
dbConnect()

const app = express()
const server = http.createServer(app);
export const io = require('socket.io')(server);

io.on('connection', (socket: any) => {
    console.log("New client connected");
});

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.get('/', function (req, res) {
    res.send('Hello World!!!');
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
})
