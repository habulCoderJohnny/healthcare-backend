import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected successfully"))
        .catch(err => console.log(err))
}