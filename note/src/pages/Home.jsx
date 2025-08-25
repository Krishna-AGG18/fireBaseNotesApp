import React, { useEffect, useState } from 'react'
import authService from '../firebase/user';
function Home() {
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        setLoading(true)
        authService.readNotes((fetchedNotes) => {
            setNotes(fetchedNotes);
            setLoading(false);

        });
    }, []);



    if (loading) return <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
        <img src="https://i.pinimg.com/1200x/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg" alt="Loading..." />
    </div>

    return (
        <div>
            <div className="bg-[#121212] w-full h-full min-h-screen rounded-xl p-4 flex flex-col ">

                {/* Header */}
                <div className="font-bold border-b border-[#565656] pb-1">
                    <p>🔥 My Notes...</p>
                </div>

                {/* Scrollable content */}

                {notes && notes.length > 0 ? (
                    <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                        {notes.map((note, index) => (

                            <div
                                key={note.id || index}
                                className="bg-[#1e1e1e] text-white p-4 rounded-xl shadow-md hover:shadow-lg transition h-fit"
                            >
                                <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: note.content }} className='line-clamp-1'/>
                                <p className="text-xs text-gray-500 mt-2">🗓 {new Date(Number(note.id)).toDateString()}</p>

                                <button
          onClick={() => authService.deleteNote(note.id)}
          className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
        >
          Delete
        </button>
                            </div>
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