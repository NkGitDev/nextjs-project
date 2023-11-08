import { NextResponse } from "next/server";
import User from "../../../../models/user"

export async function DELETE(request,{params}){

    // // Testing Code
    // console.log(params)
    // const userId = params.userId
    // or with destructure
    // const {userId} = params
    // console.log('User Id is :',userId)

    // Main Code
    const { userId } = params
    try {
        const user = await User.deleteOne({
            _id:userId
        });
        return NextResponse.json({
            msg:'User Deleted..!!',
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg:"Error in delete user..",
        });
    }
}

export async function GET(request, {params}){
    try {
        const {userId} = params;
        const user = await User.findOne({_id:userId})
        const response = NextResponse.json(user)
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse({
            msg:'Error to get specific user data'
        })
    }
}

export async function PUT(request, {params}){
    const { userId } = params;

    const { name, email, password, about, profileUrl, address } = await request.json()

    try {
        const user = await User.findOneAndUpdate({_id:userId}, {$set:{
            name:name,
            email:email,
            password:password,
            about:about,
            profileUrl:profileUrl,
            address:address
        }},{new:true})
    
        const response = NextResponse.json(user);
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg:'Failed to update user..!!'
        })
    }

}