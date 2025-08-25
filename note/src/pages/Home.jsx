import React, { useEffect, useState } from 'react'
import authService from '../firebase/user';
import { Link, Navigate } from 'react-router-dom';

function Home() {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(null)
    

    useEffect(() => {
        setLoading(true)
        authService.readNotes((fetchedNotes) => {
            setNotes(fetchedNotes.reverse());
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." className='rounded-2xl' />
    </div>

    return (
        <div>
            <div className="bg-[#121212] w-full h-full min-h-[81dvh] rounded-xl p-1 navxsm:p-4 flex flex-col ">

                {/* Header */}
                <div className="font-bold border-b border-[#565656] pb-1">
                    <p>🔥 My Notes...</p>
                </div>

                {/* Scrollable content */}

                {notes && notes.length > 0 ? (
                    <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                        {notes.map((note, index) => (
                            <Link key={note.id} to={`/dashboard/${note.id}`}>
                                <div
                                    key={note.id || index}
                                    className="bg-[#1e1e1e] text-white p-4 max-navxsm:p-2 rounded-md navxsm:rounded-xl shadow-md hover:shadow-lg transition h-fit"
                                >
                                    <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: note.content }} className='line-clamp-1' />
                                    <p className="text-xs text-gray-500 mt-2">🗓 {new Date(Number(note.id)).toDateString()}</p>

                                    <button
                                        onClick={() => authService.deleteNote(note.id)}
                                        className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded ml-1"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 py-4">No notes found...</div>
                )}


            </div>
        </div>
    )
}

export default Home