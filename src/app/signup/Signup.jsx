'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {userSignUp} from '../../services/userService'
// import { useForm } from "react-hook-form"


const Signup = () => {
    const [signupData, setSignupData] = useState({
        name:'', 
        email:'', 
        password:'', 
        about:'', 
        profileUrl:'', 
    })


    


    // const { register, handleSubmit, formState: { errors }, watch } = useForm({
    //     shouldUseNativeValidation: true,
    // })
    // // const onSubmit = async (data) => {
    // //     console.log(data)
    // // }

    // const password = watch('password')



    const [errors, setErrors] = useState('')

    // Validations
    const validationErrors = validationForm()

    function validationForm(){
        const errors = {}
        if (!signupData.name || signupData.name === '' || signupData === null) {
            errors.name = 'Name is required'
        }
        if (!signupData.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!signupData.password) {
            errors.password = 'Password is required'
        } else if (signupData.password.length < 6) {
            errors.password = 'Password must be 6 digit or character'
        }

        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target)


        

        // Check Validations
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        }       
        else {
            // form submition
            setErrors(validationErrors)
            try {
                const result = await userSignUp(signupData);
                console.log(result)
                toast.success('Signup successfully...!!',{
                    position:'top-center'
                })
                setSignupData({
                    name:'', 
                    email:'', 
                    password:'', 
                    about:'', 
                    profileUrl:''
                })
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message);
                toast.error('Error in signup:' + error.response.data.message,{
                    position:'top-center'
                })
            }
        }
    }


    // reset form
    const resetForm = () => {
        setSignupData({
            name:'', 
            email:'', 
            password:'', 
            about:'', 
            profileUrl:''
        })
    }



    return (
        <div className='grid grid-cols-12'>
            <div className='m-0 col-span-4 col-start-5 bg-gray-300 rounded-md overflow-hidden'>
                <div className='flex p-3 m-0 justify-center bg-slate-700 items-center'>
                    <h1 className='text-2xl text-white'>SignUp</h1>
                </div>
                <div className='p-4'>
                    <form action='#!' onSubmit={handleSubmit}>
                        <div className='mt-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" name='name' id='username' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                            // {...register('name', {required:'User name is required'})} 
                            onChange={e=>{
                                setSignupData({
                                    ...signupData,
                                    name:e.target.value
                                })
                            }}
                            value={signupData.name}
                            />
                            <p className='text-red-600'>{errors.name}</p>
                            {/* <p className='text-red-600'>{errors.name && errors.name.message}</p> */}
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_name">Email</label>
                            <input type="email" name='email' id='user_name' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                            // {...register('email', { required: 'Email is required.', pattern: { value:/\S+@\S+\.\S+/, message: 'Invalid Email' } })} 
                            onChange={e=>{
                                setSignupData({
                                    ...signupData,
                                    email:e.target.value
                                })
                            }}
                            value={signupData.email}
                            />
                            <p className='text-red-600'>{errors.email}</p>
                            {/* <p className='text-red-600'>{errors.email && errors.email.message}</p> */}
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_password">Password</label>
                            <input type="password" name='password' id='user_password' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400' 
                            // {...register('password', {
                            //     required: 'Password is required',
                            //     minLength: { value: 6, message: 'Password must be 6 digit or character' }
                            // })}
                            onChange={e=>{
                                setSignupData({
                                    ...signupData,
                                    password:e.target.value
                                })
                            }}
                            value={signupData.password}
                            />
                            <p className='text-red-600'>{errors.password}</p>
                            {/* <p className='text-red-600'>{errors.password && errors.password.message}</p> */}
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="user_about">About</label>
                            <textarea  type="text" name='about' id='user_about' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                            onChange={e=>{
                                setSignupData({
                                    ...signupData,
                                    about:e.target.value
                                })
                            }}
                            value={signupData.about}
                            ></textarea>
                            {/* <p className='text-red-600'>{validate?validate.val_about:null}</p> */}
                        </div>
                        <div className='flex justify-center mt-3'>
                            <button type='submit' className='bg-slate-700 text-white px-5 py-2 rounded-md hover:bg-slate-600'>SignUp</button>
                            <button type='button' onClick={resetForm} className='bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 ms-3'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;