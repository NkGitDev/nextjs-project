'use client'
import { NextResponse } from 'next/server'
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { userLogin } from '../../services/userService'
import { useRouter } from 'next/navigation'
import UserContext from '../../context/userContext'
import LoadingSpinner from './loading'


const LoginPage = () => {

    const router = useRouter()
    const context = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)

    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState('')
    const validationErrors = validationForm()

    function validationForm(){
        const errors = {}

        if (!loginData.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!loginData.password) {
            errors.password = 'Password is required'
        } else if (loginData.password.length < 6) {
            errors.password = 'Password must be 6 digit or character'
        }
        return errors;
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(loginData);
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return;
        } 
        else {
            setErrors(validationErrors)
        }


        if (loginData.email.trim() === '' || loginData.password.trim() === '') {
            toast.error('Invalid data',{
                position:'top-center'
            })
            return;
        }

        try {
            setIsLoading(true)
            const result = await userLogin(loginData);
            console.log(result)
            toast.success('Login Successfully...!!',{
                position:'top-center'
            })
            context.setUser(result.user)
            setLoginData({
                email:'',
                password:''
            })
            router.push('/profile/user')
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error(error.response.data.message,{
                position:'top-center'
            })
        }

    }


  return (
    <div>
        <div className='grid grid-cols-12'>
        {isLoading ? (<div className='justify-center col-span-4 col-start-6'><LoadingSpinner/></div>):
            
            <div className='m-0 col-span-4 col-start-5 bg-gray-300 rounded-md overflow-hidden'>
                <div className='flex p-3 m-0 justify-center bg-slate-700 items-center'>
                    <h1 className='text-2xl text-white'>Login</h1>
                </div>
                <div className='p-4'>
                    <form action='#!' onSubmit={handleLogin} disabled={isLoading}>
                    <div className='mt-3'>
                            <label htmlFor="user_name">Email</label>
                            <input type="email" name='email' id='user_name' className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-gray-400'
                            // {...register('email', { required: 'Email is required.', pattern: { value:/\S+@\S+\.\S+/, message: 'Invalid Email' } })} 
                            onChange={e=>{
                                setLoginData({
                                    ...loginData,
                                    email:e.target.value
                                })
                            }}
                            value={loginData.email}
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
                                setLoginData({
                                    ...loginData,
                                    password:e.target.value
                                })
                            }}
                            value={loginData.password}
                            />
                            <p className='text-red-600'>{errors.password}</p>
                            {/* <p className='text-red-600'>{errors.password && errors.password.message}</p> */}
                        </div>
                        <div className='flex justify-center mt-3'>
                            <button type='submit' className='bg-slate-700 text-white px-5 py-2 rounded-md hover:bg-slate-600'>Login</button>
                            <button type='button' className='bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 ms-3'>Reset</button>
                        </div>
                    </form>
                    {/* {JSON.stringify(loginData)} */}
                </div>
            </div>}
        </div>
    </div>
  )
}

export default LoginPage