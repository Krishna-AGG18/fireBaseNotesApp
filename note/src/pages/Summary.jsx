import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import authService from "../firebase/user";
import { Link, useNavigate } from "react-router-dom";

function Summary() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        authService.readNotes((fetchedNotes) => {
          setNotes(fetchedNotes.reverse() || []);
        });
      } else {
        navigate("/"); // redirect if not logged in
      }
      setLoading(false);
    });

    return () => unsub(); // cleanup on unmount
  }, [navigate]);

  // Group notes by Year & Month (outside useEffect, depends on state)
  const groupedNotes = notes.reduce((acc, note) => {
    const date = new Date(Number(note.id)); // note.id is timestamp in ms
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = [];
    acc[year][month].push(note);

    return acc;
  }, {});
  if (loading) {
    return (
      <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="p-4 text-white overflow-y-auto scroll-grid min-h-screen max-sm:p-2">
        <h1 className="text-2xl font-bold border-b border-[#565656] pb-1">
          📒 Notes Summary : No Notes
        </h1>

        <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse rounded-2xl mt-1">
          <img src="https://i.pinimg.com/1200x/0d/be/bc/0dbebcf58880f2c06c305373c98fc71e.jpg" alt="Loading..." className="rounded-2xl h-full w-full object-cover"/> 
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 text-white overflow-y-auto scroll-grid min-h-screen">
      <h1 className="text-2xl font-bold border-b border-[#565656] pb-1">
        📒 Notes Summary
      </h1>

      {Object.entries(groupedNotes).map(([year, months]) => (
        <div key={year} className="mt-6">
          <h2 className="text-xl font-semibold">{year}</h2>

          {Object.entries(months).map(([month, monthNotes]) => (
            <div key={month} className="ml-4 mt-2">
              <h3 className="text-lg font-medium">{month}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {monthNotes.map((note) => (
                  <Link key={note.id} to={`/dashboard/${note.id}`}>
                    <div className="bg-[#222121] p-4 rounded-xl shadow-md hover:shadow-lg transition">
                      <h4 className="font-bold">{note.title}</h4>
                      <div
                        dangerouslySetInnerHTML={{ __html: note.content }}
                        className="line-clamp-2"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(Number(note.id)).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Summary;
