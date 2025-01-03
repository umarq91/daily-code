import React, { useEffect, useState } from "react";
import { NoteData, Tag } from "../types";
import ReactMarkdown from "react-markdown"; // Import the correct Markdown renderer
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import remarkGfm from 'remark-gfm'; 

const NotePage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { findNote, updateNote } = useLocalStorage();
  const [noteDetails, setNote] = useState<NoteData | null>(null);

  useEffect(() => {
    if (title) {
      const data = findNote(title); // Fetch the note by title
      if (data) {
        setNote(data); // Set note details if found
      }
    }
  }, [title, findNote, navigate]);

  function updateItem(updatedData: NoteData) {
    if (title) {
      updateNote(title, updatedData); // Update note in localStorage
      navigate("/"); // Redirect back to the dashboard
    }
  }

  if (!noteDetails) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => navigate(`/${title}/edit`)}
      >
        Edit
      </button>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-4">
        {noteDetails.title}
      </h1>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {noteDetails.tags.map((tag: Tag) => (
          <span
            key={tag.id}
            className="bg-indigo-200 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Body: Markdown Content */}
      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {noteDetails?.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NotePage;
