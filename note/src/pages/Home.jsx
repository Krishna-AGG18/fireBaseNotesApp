import React from 'react'

function Home() {
    return (
        <div>
            <div className="bg-[#121212] w-full h-full rounded-xl p-4 flex flex-col ">

                {/* Header */}
                <div className="font-bold border-b border-[#565656] pb-1">
                    <p>🔥 My Notes...</p>
                </div>

                {/* Scrollable content */}
                <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 overflow-y-scroll scroll-grid">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <h1
                            key={i}
                            className="bg-[#1e1e1e] rounded-lg p-2 text-center h-[300px] aos"
                        >
                            helloo {i + 1}
                        </h1>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home