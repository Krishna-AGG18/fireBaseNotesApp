import React from "react";
import { FileText, Shield, Edit3, Trash2 } from "lucide-react";

export default function LandingFeatured() {
  const features = [
    {
      title: "Organize Notes",
      desc: "Summaries arranged year and month wise for easy access.",
      icon: <FileText className="w-10 h-10 text-purple-400" />,
    },
    {
      title: "Private & Secure",
      desc: "Your notes are personal, protected with Firebase Authentication.",
      icon: <Shield className="w-10 h-10 text-violet-400" />,
    },
    {
      title: "Easy Editing",
      desc: "Add and edit notes anytime with a simple, distraction-free UI.",
      icon: <Edit3 className="w-10 h-10 text-fuchsia-400" />,
    },
    {
      title: "Free to Use",
      desc: "Delete notes anytime at no cost, keep only what matters.",
      icon: <Trash2 className="w-10 h-10 text-pink-400" />,
    },
  ];

  return (
    <div className="py-16 bg-[#180b3aa9] rounded-2xl backdrop-blur-lg">
      <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
        Why Choose Our Notes App?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-purple-900/20 backdrop-blur-md rounded-2xl shadow-lg p-6 
                       flex flex-col items-center text-center space-y-4 
                       transform transition duration-300 hover:scale-105 hover:bg-purple-900/30"
          >
            {f.icon}
            <h3 className="text-xl font-semibold text-purple-200">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
