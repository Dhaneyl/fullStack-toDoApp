import express from 'express'
import { fetch, create, deleteTask, update } from './Controllers.js';

const route = express.Router();
route.post("/create", create)
route.get("/getAllTasks", fetch)
route.delete("/deleteTask/:id", deleteTask)
route.put("/updateTask/:id", update)

export default route;