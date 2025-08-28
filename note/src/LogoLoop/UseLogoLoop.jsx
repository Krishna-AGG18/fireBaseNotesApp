import LogoLoop from './LogoLoop.jsx';
import { 
  SiReact, 
  SiTailwindcss, 
  SiFirebase, 
  SiVite, 
  SiJavascript, 
  SiAuth0 // using Auth0 shield for "secure"
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { node: <SiAuth0 />, title: "Secure Auth", href: "https://auth0.com" }
];

function UseLogoLoop() {
  return (
    <div style={{ height: '100px', position: 'relative', overflow: 'hidden'}} className='text-white w-full mx-auto'>
      <LogoLoop
        logos={techLogos}
        speed={50}
        direction="right"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Tech Stack"
      />
    </div>
  );
}


export default UseLogoLoop