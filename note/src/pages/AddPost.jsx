import React from 'react'
import { NoteEditor } from './index'
function AddPost() {
  return (

    <div className='h-fit'>
      <div className="font-bold border-b border-[#565656] pb-1">
        <p>🔥 Add Notes...</p>
      </div>

      <div className='text-[#DFD0B8] py-4 flex flex-col gap-1'>
        <div className='flex flex-col gap-2 '>
          <label htmlFor="title" className='font-bold '>Title</label>
          <input type='text' name='title' id='title' className='w-full py-2 px-4 bg-[#121212]  rounded-lg ' placeholder='Enter title of our Note' required />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="notes" className='font-bold '>Enter your notes below...</label>
          <NoteEditor />
        </div>
      </div>
    </div>
  )
}

export default AddPost