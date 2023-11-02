import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import router from "./src/routes/routes.js"
import { dbConnection } from "./src/config/dbConfiq.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const corsOption = {
    origin: true
}

// DB Conncetion
dbConnection()

// Middlewares
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

// Routes
app.use("/api/v1", router)

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" })
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})