'use client'
import React, { useEffect, useState } from 'react'
import UserContext from './userContext';
import { currentUser } from '../services/userService';
import { toast } from 'react-toastify';

const UserProvider = ({children}) => {

    const [user, setUser] = useState(undefined)

    useEffect(() => {
        async function loadUser(){
            try {
                const currentLoginUser = await currentUser();
                console.log(currentLoginUser)
                setUser({...currentLoginUser})
            } catch (error) {
                // console.log(error);
                // toast('Error in loading current user',{
                //     position:'top-center'
                // })
                setUser(undefined)
            }
        }
        loadUser();
    },[])

  return (
    <div>
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default UserProvider;