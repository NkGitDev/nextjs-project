import { NextResponse } from "next/server";
import { Task } from "../../../models/task";
import { getResponseMessage } from '../../../helper/responseMessage'
import jwt from 'jsonwebtoken'
// Tasks

// get all tasks
export async function GET(request){
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks)
    } catch (error) {
        console.log(error);
        return getResponseMessage('Failed to get all user tasks...!!', 404, false)
    }
}

// create all tasks
export async function POST(request){
    const { title, content, userId, status } = await request.json();

    // fetching logged in user id
    const loginToken = request.cookies.get('loginToken')?.value
    // console.log(loginToken)
    const data = jwt.verify(loginToken, process.env.JWT_KEY);
    console.log(data)

    try {
        const task = new Task({
            title,
            content,
            userId:data._id,
            status,
        });
    
        const createdTask = await task.save()
        const response = NextResponse.json(createdTask,{
            msg:'Task Created Successfully',
            status:201
        })
        return response;
    } catch (error) {
        console.log(error);
        // return NextResponse.json({
        //     msg:'Failed to create task',
        //     success:false
        // })

        // or created custom message function in helper folder
        return getResponseMessage('Failed to create new task', 500, false)
    }

}