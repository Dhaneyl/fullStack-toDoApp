import mongoose from "mongoose";
 
const toDoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:false
    }
})

export default mongoose.model("tasks", toDoSchema);