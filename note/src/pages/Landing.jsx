import DarkVeil from '../DarkVeil/DarkVeil.jsx';
import UseLogoLoop from '../LogoLoop/UseLogoLoop.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LandingFeatured from './LandingFeatured.jsx'  // 👈 import features component
import AnimatedFAQ from './AnimatedFAQ.jsx';

function Landing() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger animation when component loads
    setAnimate(true);
  }, []);
  const reviews = [
    {
      name: "Priya N.",
      role: "Student",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      quote: "Super clean, fast, and easy to use. Love the security!"
    },
    {
      name: "Rajesh S.",
      role: "Developer",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      rating: 5,
      quote: "The best notes app for privacy and syncing between devices."
    },
    {
      name: "Alex P.",
      role: "Designer",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      rating: 4,
      quote: "Beautiful UI and easy editing. Highly recommend for students."
    },
    {
      name: "Fatima A.",
      role: "Writer",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      quote: "Perfect for organizing my drafts, and free forever!"
    },
    {
      name: "Mike D.",
      role: "Engineer",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
      rating: 4,
      quote: "Multi-device sync works great—love the distraction-free editing."
    },
    {
      name: "Sara L.",
      role: "Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      rating: 5,
      quote: "Reliable backup and easy search help keep me productive."
    },
    {
      name: "Juan G.",
      role: "Teacher",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      quote: "Collaboration features make it ideal for sharing notes with students."
    },
    {
      name: "Chen W.",
      role: "Researcher",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 5,
      quote: "Organize year-wise summaries in seconds—highly recommend!"
    }
  ];
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

        <section className="w-full rounded-2xl py-5 mx-auto  mb-10 px-6 bg-gradient-to-br from-[#3e0ab4] via-black to-[#3e0ab3]">
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-200">What Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-[#301846]/80 rounded-xl p-6 flex flex-col items-center shadow">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mb-3" />
                <span className="font-semibold text-sm text-purple-300">{review.name}</span>
                <span className="text-xs text-purple-300 mb-2">{review.role}</span>
                <p className="text-center text-white text-base mb-2">{review.quote}</p>
                <div className="flex gap-1 mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-purple-400 text-lg">★</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} className="text-purple-900 text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AnimatedFAQ />
        {/* Behind the Build */}
        <div className='mx-auto w-full  flex flex-col gap-8'>
          <p className='font-semibold underline decoration-white decoration-2 underline-offset-4 w-fit border-b-amber-100 text-[clamp(1rem,4vw,1.5rem)] leading-snug px-2 sm:px-4'> Behind the Build </p>
          <UseLogoLoop />
        </div>

      </div>
    </div>
  )
}

export default Landing;
