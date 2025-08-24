import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import authService from '../firebase/user';

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

    if (!user) return <p className="text-white">Loading...</p>;

    return (
        <div className='text-white flex w-full h-screen'>
            <div className='flex-1/7 bg-red-100'>
                <p>Welcome {user.displayName}</p>
            </div>
            <div className='flex-6/7 bg-red-400'>
                <button onClick={handleLogout}>logout</button>
            </div>
        </div>
    )
}

export default Dashboard;
