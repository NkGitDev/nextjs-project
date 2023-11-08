import { getResponseMessage } from "../../../../helper/responseMessage"
import { Task } from "../../../../models/task"
import { NextResponse } from "next/server"

// api/tasks/{taskId}

// get task with userId
export async function GET(request, {params}){
    // console.log(params)
    const { taskId } = params
    try {
        const task = await Task.findOne({
            _id:taskId
        })
        return NextResponse.json(task)
    } catch (error) {
        console.log(error);
        return getResponseMessage('Failed to get a task...!!', 404, false)
    }
}

// update task with id
export async function PUT(request, {params}){
    const { taskId } = params
    const { title, content, status } = await request.json()

    try {
        const task = await Task.findOneAndUpdate({_id:taskId}, 
            {$set:
                {
                    title:title,
                    content:content,
                    status:status
                }
            },{new:true}
        )
        return NextResponse.json(task)
    } catch (error) {
        console.log(error)
        return getResponseMessage('Failed to update task', 500, false)
    }
}

// delete task with id
export async function DELETE(request, {params}){
    try {
        const { taskId } = params;
        const task = await Task.deleteOne({_id:taskId})
        return getResponseMessage('Task deleted...!!', 200, true)
    } catch (error) {
        console.log(error);
        return getResponseMessage('Failded to delete task...!!', 404, false)
    }
}