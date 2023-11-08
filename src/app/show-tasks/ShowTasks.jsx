'use client'

import React, { useContext, useEffect, useState } from 'react'
import { deleteTask, getUserTasks } from '../../services/taskService'
import UserContext from '../../context/userContext'
import Task from './Task'
import { toast } from 'react-toastify'
import Image from 'next/image'
import note from '../assets/note.png'
import LoadingSpinner from '../login/loading'

const ShowTasks = () => {

    const [tasks, setTasks] = useState([])
    const context = useContext(UserContext)

    async function loadUserTasks(userId){
        try {
            const tasks = await getUserTasks(userId)
            setTasks([...tasks].reverse())
            console.log(tasks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if (context.user) {
            loadUserTasks(context.user._id)
        }
    },[context.user])

    async function deleteTaskFromParent(taskId){
        try {
            const result = await deleteTask(taskId)
            console.log(result);
            const newTasks = tasks.filter((item) => item._id != taskId)
            setTasks(newTasks)
            // toast.success('Task deleted',{
            //     position:'top-center'
            // })
        } catch (error) {
            console.log(error);
            toast.error('Error in delete task',{
                position:'top-center'
            })
        }
    }

  return (
    <div>
        <div className='flex justify-center'>
            <div className='justify-center'>

            {!context.user ? <LoadingSpinner/>: 

            <h1 className={`text-center font-extrabold text-2xl ${tasks.length === 0 ? '' :'bg-slate-800'}  text-white p-3 rounded-lg`}>{tasks.length === 0 ? <div><h1 className='bg-red-500 p-3 rounded-lg'>Empty Taskbar</h1><Image src={note} alt="No Image" className='w-60'/></div> : `My Tasks (${tasks.length})`}</h1>
            
            // testing purpose
            // <div>
            //     {tasks.length !== 0 && `tasks has item` &&`no item..`}
            // </div>
            
            
            }

            
    
            </div>
        </div>
        {tasks.map((task) => (
            <Task task={task} key={task._id} deleteTaskFromParent={deleteTaskFromParent}/>
        ))}
    </div>
  )
}

export default ShowTasks;