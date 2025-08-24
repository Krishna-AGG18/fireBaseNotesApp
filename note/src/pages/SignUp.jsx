import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../firebase/user';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [userName, setusername] = useState("")
  const [errorSignup, setErrorSignUp] = useState(false);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger animation when component loads
    setAnimate(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorSignUp(false);
    const user = await authService.createUser({ email, password, userName });
    if (user)
      navigate("/login");
    else
      setErrorSignUp(true);
  }

  return (
    <div className='w-full min-h-dvh relative text-white bg-gradient-to-t from-[#d8973c] via-[#273e47] to-[#bbac7e]'>
      <nav className='pt-8 text-[#273e47]'>
        <div className='flex justify-between items-center gap-4 sm:gap-0 px-6 sm:px-10 py-4 rounded-full bg-[#d8c99b] backdrop-blur-md border-[#2d3142]-400 border-[0.5px] max-w-[95%] sm:max-w-[80%] lg:max-w-[70%] mx-auto'>
          <div className='font-bold text-center sm:text-left text-sm sm:text-base md:text-lg' id='logo'>
            Note Nostre
          </div>
          <div className='font-semibold flex gap-2 navxsm:gap-4 text-sm sm:text-base'>
            <Link to={"/"}> <button className='cursor-pointer hover:underline' >Home</button></Link>
            <Link to={"/login"}><button className='cursor-pointer hover:underline'>Login</button></Link>
          </div>
        </div>
      </nav>

      <div className={`mt-10 max-w-4xl mx-auto flex ${animate ? "aos" : ""}`}>
        <div className='flex-1 sm:flex-1/2 bg-[#273e47] text-[#2D3142] h-[70dvh] p-4 max-sm:rounded-r-3xl sm:rounded-l-3xl max-sm:mx-4'>
          <form action="" onSubmit={handleSignUp} className='bg-[#d8c99b] w-full h-full max-sm:rounded-r-3xl  sm:rounded-l-3xl  text-[#273e47] flex flex-col p-4 gap-2'>
            <h1 className='text-center font-bold text-[18px]'>Sign Up</h1>
            <div>
              <p className='text-red-600 text-center'>{
                errorSignup && "Error in creating account, try again!"
              }</p>
            </div>

            <label htmlFor="username" className='font-semibold'>Username </label>
            <input type="text" name="username" id="username" placeholder='john doe ' className='p-2 bg-[#d8973c] text-[#273e47] rounded-md' required onChange={(e) => {
              setusername(e.target.value)
            }} />

            <label htmlFor="email" className='font-semibold'>Email </label>
            <input type="email" name="email" id="email" placeholder='john@gmail.com ' className='p-2 bg-[#d8973c] text-[#273e47] rounded-md' required onChange={(e) => {
              setEmail(e.target.value)
            }} />

            <label htmlFor="password" className='font-semibold'>Set Password</label>
            <input type="password" name="password" id="password" placeholder='Enter your password' className='p-2 bg-[#d8973c] text-[#273e47] rounded-md' required onChange={(e) => {
              setPass(e.target.value)
            }} />

            <button type="submit" value="Sign In" className='w-full cursor-pointer bg-[#273e47] duration-200 hover:bg-[#1c2f36] text-[#d8c99b] p-2 rounded-md mt-3'>Sign Up</button>

            <p className='text-center mt-2'>Already have account? &nbsp;
              <Link to={"/signup"} className='underline'>
                Click to Login.
              </Link>
            </p>
          </form>
        </div>
        <div className='max-sm:hidden flex-1/2 bg-[#d8973c] text-[#d8d5db] p-2 rounded-r-3xl w-full  flex'>
          <img src="https://i.pinimg.com/736x/87/2a/53/872a53adae6d5eb103b228e2c7f590b3.jpg" alt="funny image" className=' object-cover rounded-r-3xl ' /> </div>

      </div>
    </div>
  )
}

export default SignUp