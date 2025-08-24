import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function NoteEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="h-full w-full ">
      <Editor
        apiKey= {import.meta.env.VITE_TINYMCE_API_KEY} 
        value={content}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table help wordcount"
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
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => console.log(content)}
      >
        Save Note
      </button>
    </div>
  );
}

export default NoteEditor;
