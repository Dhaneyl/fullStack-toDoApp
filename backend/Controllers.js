import Task from './Models.js'
export const create = async(req, res)=>{
    try{
        const taskData = new Task(req.body)
        const {id} = taskData;

        // const taskExist = await Task.findOne({id});

        // if(taskExist){
        //     return res.status(400).json({message: "User already exists"});
        // }
        const savedTask = await taskData.save();
        res.status(200).json(savedTask)
        console.log(savedTask)
    }catch(error){
        res.status(500).json({error: "Internal Server error."})
        console.log(error)
    }
}

export const fetch = async (req, res)=>{
    try{
        const tasks = await Task.find()
        if(tasks.length === 0){
             return res.status(404).json({message: "Task not found."})
        }else{
         return res.status(200).json({tasks})
        }
     } catch(error){
         res.status(500).json({error: "Internal Server error."})
         console.log(error)
     }
}


export const update = async (req, res)=>{
    try{
        const id = req.params.id
        const taskExist = await Task.findOne({_id:id});

        if(!taskExist){
            return res.status(404).json({message: "Task not found"})
        }else{
            const updateTask = await Task.findByIdAndUpdate(id, req.body, {new:true})
            return res.status(201).json(updateTask)
        }
    }catch(error){
        res.status(500).json({error: "Internal Server error."})
        console.log(error)
    }
}


export const deleteTask = async(req, res) =>{
    try{
        const id = req.params.id
        const taskExist = await Task.findOne({_id:id})

        if(!taskExist){
            return res.status(404).json({message:"Task not found"})
        }else{
            const deletedTask = await Task.findByIdAndDelete(id, req.body, {new:true})
            return res.status(201).json(deletedTask)
        }
    }catch(error){
        res.status(500).json({error: "Internal Server error."})
         console.log(error)
    }
}