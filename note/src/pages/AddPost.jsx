import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import authService from "../firebase/user";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        navigate("/"); // redirect if not logged in
      }
    });
    return unsub; // cleanup
  }, []);

  const handleSave = () => {
    if (content.trim() !== "") {

      const noteData = {
        id: Date.now().toString(),
        owner: user.uid,
        title: title,
        content: content,
      };
      console.log("Saved Note:", noteData);
      authService.addNoteToDatabase(noteData);
      setTitle("")
      setContent("")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000);
    }
  };

  return (
    <div className="h-fit">
      {/* Header */}
      <div className="font-bold border-b border-[#565656] pb-1">
        <p>🔥 Add Notes...</p>
      </div>

      {/* Form Section */}
      <div className="text-[#DFD0B8] py-4 flex flex-col gap-4">
        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="py-2 px-4 bg-[#121212] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter title of your note"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Notes Editor */}
        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="font-bold">
            Enter your notes below...
          </label>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={content}
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
              skin: "oxide-dark", // dark mode skin
              content_css: "dark",
              autoresize_bottom_margin: 20,
            }}
            onEditorChange={(newValue) => setContent(newValue)}
          />
        </div>

        {/* Save Button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200"
          onClick={handleSave}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default AddPost;
