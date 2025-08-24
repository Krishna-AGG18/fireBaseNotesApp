import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import authService from '../firebase/user';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [userName, setusername] = useState("")
  const [password, setPass] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const [animate, setAnimate] = useState(false);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard"); // already logged in → kick out of login
      }
    });
    return unsub;
  }, [navigate]);

  useEffect(() => {
    // trigger animation when component loads
    setAnimate(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin(false);
    const user = await authService.login({ email, password });
    if (user) navigate("/dashboard");
    else setErrorLogin(true);
  };

  return (
    <div className='w-full min-h-dvh relative text-white bg-gradient-to-t from-[#2D3142] via-[#ADACB5] to-[#d2bfe6]'>
      <nav className='pt-8 text-[#2d3142]'>
        <div className='flex justify-between items-center gap-4 sm:gap-0 px-6 sm:px-10 py-4 rounded-full bg-[#d8d5db] backdrop-blur-md border-[#2d3142]-400 border-[0.5px] max-w-[95%] sm:max-w-[80%] lg:max-w-[70%] mx-auto'>
          <div className='font-bold text-center sm:text-left text-sm sm:text-base md:text-lg' id='logo'>
            Note Nostre
          </div>
          <div className='font-semibold flex gap-2 navxsm:gap-4 text-sm sm:text-base'>
            <Link to={"/"}> <button className='cursor-pointer duration-200 hover:underline'>Home</button></Link>
            <Link to={"/signup"}><button className='cursor-pointer duration-200 hover:underline'>Signup</button></Link>
          </div>
        </div>
      </nav>

      <div className={`mt-10 max-w-4xl mx-auto flex ${animate ? "aos" : ""}`}>
        <div className='flex-1 sm:flex-1/2 bg-[#adacb5] text-[#2D3142] h-[70dvh] p-4 max-sm:rounded-r-3xl sm:rounded-l-3xl max-sm:mx-4'>
          <form onSubmit={handleLogin} className='bg-[#d8d5db] w-full h-full max-sm:rounded-r-3xl sm:rounded-l-3xl text-[#2D3142] flex flex-col p-4 gap-2 justify-center'>
            <h1 className='text-center font-bold text-[18px]'>LogIn</h1>
            <div>
              <p className='text-red-600 text-center'>{errorLogin && "Error in login, try again!"}</p>
            </div>
            <label htmlFor="username" className='font-semibold'>Username </label>
            <input type="text" name="username" id="username" placeholder='john doe ' className='p-2 bg-[#adacb5] text-[#2D3142] rounded-md' required onChange={(e) => {
              setusername(e.target.value)
            }} />
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input type="email" id="email" placeholder='john@gmail.com' className='p-2 bg-[#adacb5] text-[#2D3142] rounded-md' required onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password" className='font-semibold'>Password</label>
            <input type="password" id="password" placeholder='Enter your password' className='p-2 bg-[#adacb5] text-[#2D3142] rounded-md' required onChange={(e) => setPass(e.target.value)} />

            <button type="submit" className='w-full cursor-pointer bg-[#2D3142] duration-200 hover:bg-[#20232e] text-[#d8d5db] p-2 rounded-md mt-3'>Sign In</button>

            <p className='text-center mt-6'>Don't have account? &nbsp;
              <Link to={"/signup"} className='underline'>Click to create one.</Link>
            </p>
          </form>
        </div>
        <div className='max-sm:hidden flex-1/2 bg-[#2d3142] text-[#d8d5db] p-2 rounded-r-3xl w-full flex'>
          <img src="https://i.pinimg.com/736x/d8/d6/02/d8d602e5dbdce8ec65c4c0e6101e48c6.jpg" alt="funny" className='rounded-r-3xl object-cover' />
        </div>
      </div>
    </div>
  )
}

export default Login;
