import { useEffect, useState } from 'react';
import './App.css';
import authService from './firebase/user';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Landing from './pages/Landing';
import { Dashboard } from './pages';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // auth check done
    });
    return unsub;
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="w-full min-h-dvh flex justify-center items-center text-white bg-black">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Dashboard />
      ) : (
        <Landing />
      )}
    </>
  );
}


export default App;
