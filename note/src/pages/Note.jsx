import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import authService from '../firebase/user';
import { Editor } from '@tinymce/tinymce-react';
function Note() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editContent, setEditContent] = useState("")

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                authService.searchById(id).then((fetchedNote) => {
                    if (fetchedNote) {
                        setNote(fetchedNote)
                        setEditTitle(fetchedNote.title);
                        setEditContent(fetchedNote.content);
                    }
                    else {
                        navigate("/dashboard");
                        console.log("error in note page");

                    }
                })
            } else {
                navigate("/"); // redirect if not logged in
            }
            setLoading(false);
        });
        return unsub; // cleanup
    }, [navigate]);

    const handleUpdate = async () => {
        await authService.updateNote(id, {
            title: editTitle,
            content: editContent,
        })
        setNote({ ...note, title: editTitle, content: editContent });
        setIsEdit(false);
    }


    if (loading) {
        return (
            <div className="text-white w-full h-screen bg-white flex justify-center animate-pulse">
                <img src="https://i.pinimg.com/736x/16/99/b3/1699b3df4fdf77d8434d039e76ad269b.jpg" alt="Loading..." />
            </div>
        );
    }

    if (!user) return null; // prevent rendering if no user
    if (!note) {
        return (
            <div className="text-white p-4">
                <p>Note not found or still loading...</p>
            </div>
        );
    }

    return (
  isEdit ? (
    <>
        <div className='flex justify-start navxsm:items-center gap-4 max-navxsm:flex-col max-navxsm:justify-center '>
        <label htmlFor="title" className=' font-bold text-nowrap'>Edit Title:</label>
      <input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="p-2 bg-[#121212] rounded w-80"
        id='title'
        />
        </div>
      <div className="flex flex-col gap-2 mt-2 ">
        <label htmlFor="notes" className="font-bold">
          Edit your notes below...
        </label>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={editContent}
          init={{
            height: 400,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table help wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | help",
            skin: "oxide-dark", 
            content_css: "dark",
            autoresize_bottom_margin: 20,
          }}
          onEditorChange={(newValue) => setEditContent(newValue)}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded"
      >
        Save
      </button>
    </>
  ) : (
    <div className="bg-[#121212] w-full h-full min-h-[81dvh] rounded-xl p-4 flex flex-col">
      {/* Header */}
      <div className="font-bold border-b border-[#565656] pb-1 flex justify-between items-center">
        <p>💥{note?.title}</p>

        <div className="flex gap-2">
          <button
            onClick={() => {
              authService.deleteNote(note.id);
              navigate("/dashboard");
            }}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => setIsEdit(true)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-full p-4">
        <div dangerouslySetInnerHTML={{ __html: note?.content }} />
      </div>
    </div>
  )
);


}

export default Note