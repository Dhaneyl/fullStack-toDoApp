import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from "dotenv"
import route from './backend/toDoRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.json());
dotenv.config()
const PORT = process.env.PORT || 3001
const MONGOURL = process.env.MONGO_URL



app.get('/', (req, res)=>{
    res.send('Hello world')
})

mongoose
.connect(MONGOURL)
.then(()=>{
    console.log("Database connected successful.")
    app.listen(PORT, ()=> console.log(`Server running on port:  http://localhost:${PORT}`))
}).catch((error)=> console.log(error));

app.use("/api/task", route)