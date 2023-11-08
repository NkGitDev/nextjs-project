// 'use server'
import mongoose, { connection } from "mongoose";
import User from '../models/user'

export const connectDb = async () => {

    try {
        const { connection } = await mongoose.connect(process.env.URL, {
            dbName: 'work-manager'
        })

        console.log('MongoDB is Connected...')
        // console.log(connection);
        console.log('Connected with host :',connection.host)

        // // testing of creating new user
        // const user = new User({
        //     name:'Ram',
        //     email:'ram@test.com',
        //     password:'ram1234',
        //     address:{
        //         city:'Delhi',
        //         pincode:56201
        //     }
        // })
        // await user.save()
        // console.log('New user is created...')

        
    } catch (error) {
        console.log('Failed to connect with database')
        console.log(error)

    }



    // try {
    //     const { connection } = await mongoose.connect(process.env.URL);
    //     connection.on('connected', () => {
    //         console.log('MongoDb is connected')
    //     })
    // } catch (error) {
    //     connection.on('error', (error) => {
    //         console.log('MongoDB connection error. Please make sure MongoDB is running. ',error)
    //         process.exit()
    //     })
    // }


}









// import mongoose from 'mongoose';

// export async function connectDb() {
//     try {
//         await mongoose.connect(process.env.URL);
//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully');
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//             process.exit();
//         })

//     } catch (error) {
//         console.log('Something goes wrong!');
//         console.log(error);

//     }
// }