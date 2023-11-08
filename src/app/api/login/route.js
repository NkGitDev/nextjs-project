import { NextResponse } from 'next/server';
import User from '../../../models/user';
import bcrypt from 'bcrypt';
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { connectDb } from "../../../helper/db"

connectDb();


export async function POST(request){
    const {email, password} = await request.json();

    // 1 find user
    try {
        const user = await User.findOne({
            email:email
        })
        if (user === null) {
            throw new Error('User not found');
            // toast.error('User is not found...!!',{
            //     position:'top-center'
            // })
        }

        // 2. match user password with database
        const matchedUser = bcrypt.compareSync(password, user.password);
        if (!matchedUser) {
            throw new Error('Password does not matched');
            // toast.error('Password does not matched...!!',{
            //     position:'top-center'
            // })
        }

        // 3. generate jwt token
        const token = jwt.sign({
            _id:user._id,
            email:user.email
        }, process.env.JWT_KEY)

        // 4. create response
        const response = NextResponse.json({
            message:'Successfully Login',
            success:true,
            user:user
        })

        // 5. set cookies
        response.cookies.set('loginToken', token, {
            expiresIn:'1d',
            httpOnly:true
        })

        console.log(user)
        console.log(token)

        return response;

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message:'Failed to login...!! '+error.message,
                success:false
            },
            {
                status:500,
            }
        );
    }
}