'use client'
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import UserContext from '../context/userContext';
import { logout } from '../services/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
import LoadingSpinner from '../app/login/loading';


const CustomNavbar = () => {

    const context = useContext(UserContext);
    console.log(context)

    const [isLogin, setIsLogin] = useState(false)

    const router = useRouter();

    function handleLogout(){
        setIsLogin(true)
        Swal.fire({
            title: 'Are you want to logout?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, LogOut!',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmLogout();
                Swal.fire(
                    'Logged Out!',
                    'You are successfully logout.',
                    'success'
                    )
                setIsLogin(false);
            }
        })

    }


    // logout confirmation
    async function confirmLogout(){
        try {
            const result = await logout()
            console.log(result);
            context.setUser(undefined)
            router.push('/')
            toast.success('Successfully Logout !!',{
                position:'top-center'
            })
        } catch (error) {
            console.log(error);
            toast.error('Error in logout',{
                position:'top-center'
            })
        }
    }





    return (
        <div>
            <nav className='bg-slate-500 text-white text-lg flex justify-between px-8 py-1 h-16 items-center'>
                <div>
                    <h1 className='text-2xl font-semibold'>
                        <Link href={"/"}>Work Manager</Link>
                    </h1>
                </div>
                <div>
                    <ul className='flex space-x-4'>
                        {context.user &&
                            
                            <>
                                <li>
                                    <Link href={"/"}>Home</Link>
                                </li>
                                <li>
                                    <Link href={"/add-tasks"}>Add Tasks</Link>
                                </li>
                                <li>
                                    <Link href={"/show-tasks"}>Show Tasks</Link>
                                </li>
                        
                            </>}
                        {/* // : <h1 className='text-xl font-semibold text-orange-500'>Data is Loading...</h1> */}
                    </ul>
                </div>
                <div>
                    <ul className='flex space-x-4'>
                        {context.user && (
                                <>
                                    <li>
                                        <Link href="/profile/user"><span className='bg-orange-500 text-white p-2 px-4 rounded-md'>Welcome! {context.user.name}</span></Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                        )}
                        {!isLogin && 
                        
                            !context.user && (
                                <>
                                    <li>
                                        <Link href="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/signup">SignUp</Link>
                                    </li>
                                </>
                            )
                        }
                                                
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default CustomNavbar;