import React, { useContext } from 'react'
import UserContext from '../../context/userContext';
import { AiFillDelete } from 'react-icons/Ai';

import Swal from 'sweetalert2'

const Task = ({task, deleteTaskFromParent}) => {
  const {user} = useContext(UserContext)

  function deleteTask(taskId){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskFromParent(taskId)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }




  return (
    <div className='grid grid-cols-12'>
        <div className={`col-span-6 col-start-4 ${task.status === 'Completed'?'bg-green-500':'bg-gray-300'} m-2 p-4 rounded-md shadow-md`}>
            <div className='flex justify-between'>
              <h1 className='font-bold text-lg text-slate-800'>{task.title}</h1>
              <button onClick={() => {
                deleteTask(task._id)
              }} className='bg-red-500 text-sm font-bold shadow-md text-white px-2 py-1 rounded-full hover:bg-red-600 ms-3'>X</button>
              {/* <AiFillDelete/> */}
            </div>
            <p>{task.content}</p>
            <div className='flex justify-between'>
              <p className='font-semibold text-sm'>Status: {task.status.toUpperCase()}</p>
              <p>Author: <span className='font-semibold text-sm'>{user?.name}</span></p>
            </div>
        </div>
    </div>
  )
}

export default Task;