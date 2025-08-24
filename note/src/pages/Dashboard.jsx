import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import authService from '../firebase/user';
import NoteEditor from './NoteEditor';

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsub; // cleanup
    }, []);

    const handleLogout = () => {
        authService.logout();
    }

    if (!user) return <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
    </div>;

    return (
        <div className='text-[#DFD0B8] grid md:grid-cols-[250px_1fr] grid-rows-[50px_1fr] w-full h-screen py-4 px-2 gap-2'>
            <div className=' bg-[#121212] p-4 text-center rounded-2xl row-span-2 max-md:hidden'>
                <div className='bg-[#1E1E1E] w-full h-full rounded-xl py-4 '>
                    <p className='font-bold'>Welcome </p>
                    <p>{user.displayName}</p>
                </div>
            </div>

            {/*Navbar */}
            <div className='flex justify-between px-4 items-center w-full'>
                <div className=''>
                    <p className='font-extrabold text-lg w-fit text-nowrap '>
                        Note Nostre...
                    </p>
                </div>
                <div className='flex w-full items-center gap-10 justify-end'>
                    <div className='items-center flex justify-center w-[50%]'>
                        <input type="text" name="search" id="search" placeholder='Search by title...' className='bg-[#0c0c0f] w-full px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex items-center justify-end'>
                        <button onClick={handleLogout} className='font-semibold bg-[#1b1b1f] duration-200 hover:bg-[#0c0c0f] cursor-pointer px-4 py-2 rounded-md'>Logout</button>
                    </div>
                </div>
            </div>

            {/*container main */}
            <div className="bg-[#1e1e1e] w-full h-full p-4 rounded-2xl overflow-hidden">
                <div className="bg-[#121212] w-full h-full rounded-xl p-4 flex flex-col ">

                    {/* Header */}
                    <div className="font-bold border-b border-[#565656] pb-1">
                        <p>My Notes...</p>
                    </div>

                    {/* Scrollable content */}
                    <div className="py-4 grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 overflow-y-scroll scroll-grid">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <h1
                                key={i}
                                className="bg-[#1e1e1e] rounded-lg p-2 text-center h-[300px]"
                            >
                                helloo {i + 1}
                            </h1>
                        ))}
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Dashboard;
