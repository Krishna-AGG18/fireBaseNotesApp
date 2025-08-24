import { useEffect, useState } from 'react';
import './App.css';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Landing from './pages/Landing';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        navigate("/dashboard");  // 🔥 go to dashboard
      } else {
        navigate("/");           // 🔥 stay on landing
      }
    });
    return unsub;
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
      </div>
    );
  }

  return (
    <Landing />  // 🔥 default UI for "/"
  );
}

export default App;
