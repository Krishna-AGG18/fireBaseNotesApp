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
    <div className='text-white'>
      <p>Welcome {user.displayName}</p>

      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Dashboard;
