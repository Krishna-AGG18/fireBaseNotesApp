import React, { useState } from "react";

const faqs = [
  {
    question: "Is my data really private?",
    answer: "Yes, your notes are protected with Firebase Authentication and encrypted storage.",
  },
  {
    question: "Can I access notes offline?",
    answer: "Currently, offline support is limited, but we are working on full offline capabilities.",
  },
  {
    question: "How do I share notes with others?",
    answer: "You can share your notes by exporting or using collaboration features coming soon.",
  },
  {
    question: "Is there a mobile app?",
    answer: "The app is web-based but fully responsive and optimized for mobile browsers.",
  },
  {
    question: "Can I export my notes?",
    answer: "Yes, you can export your notes in multiple formats including PDF and text files.",
  },
];

export default function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full rounded-2xl py-5 mx-auto  mb-10 px-6 bg-gradient-to-br from-[#3e0ab4] via-black to-[#3e0ab3]">
      <h3 className="text-2xl font-bold text-center mb-8 text-purple-200">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#301846]/70 p-5 rounded-xl shadow cursor-pointer" onClick={() => toggleFAQ(index)}>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg text-white">{faq.question}</h4>
              <span className="text-purple-400 text-xl select-none">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={`mt-3 text-purple-300 overflow-hidden transition-max-height duration-500 ease-in-out ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
