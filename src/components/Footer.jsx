'use client'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-slate-800 text-white text-lg flex justify-around px-8 py-1 items-center h-40'>
            <div>
                <h1 className='text-2xl'>This is footer</h1>
                <p>description of footer</p>
            </div>
            <div>
                <h1 className='text-2xl'>Social Media Links</h1>
                <ul>
                    <li>
                        <a href="">Whatsapp</a>
                    </li>
                    <li>
                        <a href="">Facebook</a>
                    </li>
                    <li>
                        <a href="">Instagram</a>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default Footer