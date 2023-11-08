// localhost:3000/api/users/[userId]/tasks

import { NextResponse } from "next/server";
import { Task } from "../../../../../models/task";
import { getResponseMessage } from "../../../../../helper/responseMessage";

export async function GET(request, {params}){
    const { userId } = params;
    try {
        const tasks = await Task.find({
            userId:userId
        })
        return NextResponse.json(tasks)
    } catch (error) {
        console.log(error);
        return getResponseMessage('Failed to get specific user tasks...!', 404, false)
    }
}