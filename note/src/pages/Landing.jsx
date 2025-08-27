import DarkVeil from '../DarkVeil/DarkVeil.jsx';
import UseLogoLoop from '../LogoLoop/UseLogoLoop.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingFeatured from './LandingFeatured.jsx'  // 👈 import features component

function Landing() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger animation when component loads
    setAnimate(true);
  }, []);

  return (
    <div className='w-full min-h-[200dvh] relative text-white bg-black'>
      <DarkVeil />

      <div className='absolute top-0 w-full py-8 flex flex-col gap-8 px-4 sm:px-6 md:px-10'>
        {/* Navbar */}
        <nav>
          <div className='flex justify-between items-center gap-4 sm:gap-0 px-6 sm:px-10 py-4 rounded-full bg-white/20 backdrop-blur-md border-gray-400 border-[0.5px] w-full sm:max-w-[80%] lg:max-w-[70%] mx-auto'>
            <div className='font-bold text-center sm:text-left text-sm sm:text-base md:text-lg' id='logo'>
              Note Nostre
            </div>
            <div className='font-semibold flex gap-2 navxsm:gap-4 text-sm sm:text-base'>
              <Link to={"/login"}> <button className='cursor-pointer hover:underline'>Login</button></Link>
              <Link to={"/signup"}><button className='cursor-pointer hover:underline'>Signup</button></Link>
            </div>
          </div>
        </nav>

        {/* Hero Heading */}
        <div className={`${animate ? "aos" : ""} max-sm:w-full`}>
          <p className='mx-auto text-center font-extrabold max-w-4xl text-[clamp(1.5rem,6vw,3rem)] leading-tight'>
            Your notes. Your workflow. <br />Your vault.
          </p>
        </div>

        {/* Subtext */}
        <div className={`${animate ? "aos" : ""}`}>
          <p className='mx-auto text-center font-semibold max-w-3xl text-[clamp(1rem,4vw,1.5rem)] leading-snug px-2 sm:px-4'>
            Stay organized with powerful note management. <br />
            Fast, reliable, and built for productivity.
          </p>
        </div>

        {/* CTA Button */}
        <div className={`w-fit mx-auto ${animate ? "aos" : ""}`}>
          <Link to={"/login"}>
            <button className='rounded-full cursor-pointer bg-white text-gray-700 duration-200 hover:text-gray-800 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base'>
              Get Started
            </button>
          </Link>
        </div>

        {/* ⭐ Features Section */}
        <div className="mt-12">
          <LandingFeatured />
        </div>

        {/* Behind the Build */}
        <div className='mx-auto w-full sm:max-w-3xl flex flex-col gap-8'>
          <p className='font-semibold underline decoration-white decoration-2 underline-offset-4 w-fit border-b-amber-100 text-[clamp(1rem,4vw,1.5rem)] leading-snug px-2 sm:px-4'> Behind the Build </p>
          <UseLogoLoop />
        </div>

      </div>
    </div>
  )
}

export default Landing;
