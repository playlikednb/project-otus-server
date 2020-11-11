
import mongoose from 'mongoose'

export default () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }

    mongoose.connect(process.env.DB_HOST!, options)
    const db = mongoose.connection
    db.on("error", (err) => console.error(err.message))
    db.once("open", () => console.info("Connected to Database!"))
}