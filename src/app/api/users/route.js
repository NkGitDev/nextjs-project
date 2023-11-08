import { NextResponse } from "next/server"
import { connectDb } from "../../../helper/db"
import User from "../../../models/user";
import bcrypt from 'bcrypt'

connectDb()

export async function GET(request) {
    // // Testing purpose
    // const users = [
    //     {
    //         name: 'maneesh',
    //         age: 28,
    //         feePaid: true
    //     },
    //     {
    //         name: 'rakesh',
    //         age: 24,
    //         feePaid: false
    //     },
    //     {
    //         name: 'rohan',
    //         age: 25,
    //         feePaid: true
    //     }
    // ]

    // return NextResponse.json(users)


    // Main Code
    const user = await User.find().select(['-password','-about'])   // we can hidden or show property with this select()
    const response = NextResponse.json(user)
    return response;

}

export async function POST(request) {
    // // Testing purpose
    // console.log(request)
    // const body = request.body
    // console.log(body)
    // console.log(request.bodyUsed)
    // console.log(request.method)
    // console.log(request.cookies.set('Cookie Name','My Cookie'))
    // console.log(request.cookies)
    // console.log(request.headers)
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextUrl.searchParams)

    // const jsonData = await request.json()
    // console.log('Json Data :',jsonData)

    // const textData = await request.text()
    // console.log('Text Data :',textData)

    // return NextResponse.json(

    //     {
    //         msg:'This is post API'
    //     }
    // )




    // Now come to Main Work
    // Fetch user details from users
    const { name, email, password, about, profileUrl, address } = await request.json()

    console.log({ name, email, password, about, profileUrl, address })

    // Create New User
    
    const user = new User({
        name, 
        email, 
        password, 
        about, 
        profileUrl, 
        address
    });

    try {
        // 1. Password hashing(encryption)
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        console.log(user)
        const createUser = await user.save()
        const response = NextResponse.json(user,{
            message:'User Created Successfully',
            status:201,
        });
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: 'Failed to create user',
            status:false
        },{status:500});

    }
}


// // Testing Code
// export function PUT() {

// }

// export function DELETE(request) {
//     console.log('delete api called.')
//     return NextResponse.json(
//         {
//             message: 'deleted message',
//             status: true
//         },
//         {
//             status: 200,
//             statusText: 'This is status text'
//         }
//     )
// }