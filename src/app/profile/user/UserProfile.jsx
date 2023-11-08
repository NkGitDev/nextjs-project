'use client'
import React from 'react'
import { useContext } from "react";
import UserContext from "../../../context/userContext";
import UserProvider from '../../../context/userProvider';
import LoadingSpinner from '../../login/loading';

const UserProfile = () => {

const context = useContext(UserContext)
console.log(context)


  return (
    <div>
        <UserProvider>
        <div className='flex justify-center'>
            <div className='text-center'>
                {context.user? (
                  <>
                    <h1 className='text-slate-800 text-5xl'>Welcome ! <span className='font-extrabold text-green-700'>{context.user.name}</span></h1>
                  </>
                ) : <div><h1>Profile Loading.....<LoadingSpinner/></h1></div>}
                {/* <h1 className='text-slate-800 text-3xl'>This is User Profile</h1> */}
                
            </div>
        </div>
        </UserProvider>
    </div>
  )
}

export default UserProfile;