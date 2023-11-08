import { NextResponse } from "next/server";

export function GET(request, {params}){
    // console.log(params)
    const {userId, postId} = params
    console.log('Userid', userId)
    console.log('Postid', postId)
    return NextResponse.json(params);
}
