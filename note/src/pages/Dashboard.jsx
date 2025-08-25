import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import authService from '../firebase/user';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { SiFirebase } from 'react-icons/si'

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    
    const items = [
        { name: "⊞ DashBoard", link: "/dashboard" },
        { name: "✏️ Add Note", link: "/dashboard/addNote" },
        { name: "🎯 Summary", link: "/dashboard/summary" }
    ]

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
       
        return unsub; // cleanup
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate("/")
    }

    if (!user) return <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
    </div>;

    return (
        <div className='text-[#DFD0B8] grid md:grid-cols-[250px_1fr] grid-rows-[50px_1fr] w-full h-screen py-4 px-2 gap-2'>

            {/* side bar */}
            <div className=' bg-[#121212] p-4 text-center rounded-2xl row-span-2 max-md:hidden '>
                <div className='bg-[#1E1E1E] w-full h-full rounded-xl py-4 flex flex-col gap-4 aos'>
                    <div className='flex flex-col gap-4 items-center'>
                        <SiFirebase className='text-4xl mx-auto animate-pulse' />
                        <p className='font-extrabold text-center mx-2 w-[90%]'>╰┈➤ Welcome </p>
                        <p className='font-bold capitalize text-center border-b-2 mx-2 w-[90%]'>Owner : {user.displayName}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center py-4  gap-4 flex-1 bg-[#1b1b1b] shadow-lg shadow-[#000] mx-4  rounded-2xl '>
                        <h1 className='font-bold underline underline-offset-4 decoration-2 decoration-[#dfd0b811] '>🔗 Quick Links</h1>

                        <div className='w-full px-2 h-[60%]'>
                            <ul className='font-semibold flex flex-col items-center gap-4 justify-evenly h-full'>
                                {
                                    items.map((item, ind) => (
                                        <NavLink
                                            end={item.link === "/dashboard"}   // only for dashboard link
                                            to={item.link}
                                            key={ind + 1}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "underline underline-offset-4 decoration-2 text-[#DFD0B8]"
                                                    : "text-[#DFD0B8] hover:underline"
                                            }
                                        >
                                            <li className="px-2 py-1 rounded-md">
                                                {item.name}
                                            </li>
                                        </NavLink>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    <div className='flex items-center justify-center'>
                        <button onClick={handleLogout} className='font-semibold bg-[#1b1b1f] duration-200 hover:bg-[#0c0c0f] cursor-pointer px-4 py-2 rounded-md'>ⓘ Logout</button>
                    </div>
                </div>
            </div>

            {/*Navbar */}
            <div className='flex justify-between px-4 items-center w-full'>
                <div className='flex items-center justify-center gap-2'>
                    <SiFirebase />
                    <p className='font-extrabold text-lg w-fit text-nowrap  '>
                        Note Nostre...
                    </p>
                </div>
                <div className='flex w-full items-center gap-10 justify-end'>
                    <div className='items-center flex justify-center w-[50%]'>
                        <input type="text" name="search" id="search" placeholder='Search by title...' className='bg-[#0c0c0f] w-full px-4 py-2 rounded-md' />
                    </div>
                    <div className='flex items-center justify-end md:hidden'>
                        <button onClick={handleLogout} className='font-semibold bg-[#1b1b1f] duration-200 hover:bg-[#0c0c0f] cursor-pointer px-4 py-2 rounded-md'>Logout</button>
                    </div>
                </div>
            </div>

            {/*container main */}
            <div className="bg-[#1e1e1e] w-full h-full p-4 rounded-2xl overflow-y-auto scroll-grid">
                <Outlet />
            </div>


        </div>
    )
}

export default Dashboard;
