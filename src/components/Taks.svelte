
    <div class="main-input-wrapper">
    <div class="input-wrapper">
        <input type="text" 
        placeholder="Add task" 
        on:keyup={(e)=>{ task.name = e.target.value;}} 
        bind:value={task.name}>
        {#if task.name.length > 0 } 
        <button on:click={()=> clearInput()} transition:blur={{ amount: 10 }}>
            <span class="material-symbols-outlined" >
                cancel
             </span>
        </button>
     
        {/if}
    </div>
    <button class="add-task" on:click={()=>{addTasks()}}>Add</button>
    </div>
    <div class="tasks-wrapper">
        {#if taskList.length > 0}
        {#each taskList as taskn}
        <div class="task-w">
            <input class="task" type="text" bind:value={taskn.name} disabled={editTaskId !== taskn._id} on:keyup={(e)=> taskn.name = e.target.value}/>
            <button on:click={()=>deleteTask(taskn)} class="delete">
                <span class="material-symbols-outlined" >
                    delete
                 </span>
            </button>
            <button on:click={()=>editTask(taskn)} class="edit">
                <span class="material-symbols-outlined" >
                    {editTaskId !== taskn._id ? "edit" : "save"}
                 </span>
            </button>
        </div>
        
        {/each}
        {/if}
    </div>

    <script>
  import { onMount } from 'svelte';

  
        import { blur } from 'svelte/transition';
        let task  = {name:'', _id:null}
        let taskList = []
        let editTaskId = null
        
        onMount(async ()=>{
          
            await getAllTasks()
        })
        async function getAllTasks (){
            try{
            const response = await fetch('http://localhost:4000/api/task/getAllTasks');
            const result = await response.json();
            taskList = [...result.tasks]
          }catch(error){
            console.log(error)
          }
        }
        async function addTasks(){
            
                    try{
                        const response = await fetch('http://localhost:4000/api/task/create', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name:task.name})
                    });
                    response.ok && await getAllTasks()
                    
                    }catch(error){
                        console.log(error)
                    }
                     
        
            clearInput()
            console.log(taskList)
        }

        function clearInput(){
            task = {name: '', _id:null}
        }

        async function deleteTask (_task){
        
            try{
                        const response = await fetch(`http://localhost:4000/api/task/deleteTask/${_task._id}`, {
                        method: 'DELETE',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name:_task.name})
                    });

                    response.ok && await getAllTasks()
                    }catch(error){
                        console.log(error)
                    }
        }
        async function editTask(_task){
            
            if(editTaskId === _task._id){
                editTaskId = null
                try{
                const response = await fetch(`http://localhost:4000/api/task/updateTask/${_task._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                 },
                body: JSON.stringify({name:_task.name})
                    });

                 response.ok && await getAllTasks()
                 }catch(error){
                 console.log(error)
            }
             
            }else{
                editTaskId = _task._id
            }
            
        }

        // TODO: do modal alert to notify users when they delete or update a task, also confirm modal to ask the users if they are sure to delete an task
    </script>

    <style>
        .main-input-wrapper{
            width: 30rem;
           display:flex;
            align-items:center;
            justify-content: center;
           gap: 1rem;
        }
        .input-wrapper{
            border: 1px solid gray;
            display: flex;
            justify-content:space-between;
            align-items: center;
            height: 2.5rem;
            width: 15rem;
        }
        .input-wrapper input:focus{
            outline: none;
        }
        .input-wrapper button, .input-wrapper input{
            border: none;
            background-color: transparent;
            margin: 0;

        }
        .input-wrapper button{
            padding-bottom: 0;
        }
        .input-wrapper button span{
            font-size: 1.2rem;
        }

        .main-input-wrapper .add-task{
            height: 2.5rem;
            width: auto;
            padding:  0 1rem 0  1rem;
            margin: 0;
            color: #FFFFFF;
            background-color: #000000;

        }
        .tasks-wrapper{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .task-w{
            display:flex;
            gap: 1rem;
            border: 1px solid #cccccc;
            align-items: center;
            padding:  0.5rem 1rem 0.5rem 1rem;

        }
        .task-w .task{
            width: 20rem;
            font-size: 1.2rem;
            margin: 0;
        }
        .task-w button{
            border: none;
            margin: 0;
            padding: 0.2rem;
            height: auto;
          
            
        }
        .task-w .delete:hover, .task-w .edit:hover{
            background-color: transparent
        }
        .task-w .edit{
            background-color: #84B9EF;
        }
        .task-w .delete{
            background-color: #952E4B;
        }
        .task-w button span{
            color: #ffffff;
        }
        .task-w .delete span:hover{
            color: #952E4B;
        }
        .task-w .edit span:hover{
            color: #84B9EF;
        }
        
    </style>