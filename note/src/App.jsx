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
      <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
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
