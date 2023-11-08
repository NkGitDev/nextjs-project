'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import taskImage from '../assets/task1.png'
import {addTask} from '../../services/taskService'
import {toast} from 'react-toastify'

const AddTask = () => {
  const [task, setTask] = useState({
    title:'',
    content:'',
    status:'none',
    userId:'65019db6a490609c817dcb52'
  })

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const result = await addTask(task);
      console.log(result)
      toast.success('New task added successfully...!',{
        position:'top-center'
      })
      setTask({
        title:'',
        content:'',
        status:'none'
      })
    } catch (error) {
      console.log(error);
      toast.error('Failed to add task...!!',{
        position:'top-center'
      })
    }
  }

  return (
    <div className='grid grid-cols-12 justify-center'>
        <div className='m-0 col-span-4 col-start-5 bg-gray-300 rounded-md overflow-hidden'>
          <div className='flex p-3 m-0 justify-center bg-slate-700 items-center'>
            {/* <Image src={taskImage} alt="No Image" style={{width:'20%'}}/> */}
            <h1 className='text-2xl text-white'>Add New Task</h1>
          </div>
          <div className='p-4'>
            <form action="#!" onSubmit={handleAddTask}>
              <div className='mt-3'>
                <label htmlFor="task_title">Title</label>
                <input type="text" name='task_title_inp' id='task_title' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400' 
                onChange={(e)=>{
                  setTask({
                    ...task,
                    title:e.target.value
                  })
                }} value={task.title}/>
              </div>

              <div className='mt-3'>
                <label htmlFor="task_content">Content</label>
                <textarea name='task_content_inp' id="task_content" rows="6" className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                onChange={(e)=>{
                  setTask({
                    ...task,
                    content:e.target.value
                  })
                }} value={task.content}></textarea>
              </div>

              <div className='mt-3'>
                <label htmlFor="task_status">Status</label>
                <select name="task_status_slt" id="task_status" className='rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                onChange={(e)=>{
                  setTask({
                    ...task,
                    status:e.target.value
                  })
                }} value={task.status}>
                  <option value="none" disabled>---Select Status---</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className='flex justify-center mt-3'>
                <button type='submit' className='bg-slate-700 text-white px-5 py-2 rounded-md hover:bg-slate-600'>Add Work</button>
                <button className='bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 ms-3'>Clear</button>
              </div>
            </form>
            {/* {JSON.stringify(task)} */}
          </div>
        </div>
    </div>
  )
}

export default AddTask;