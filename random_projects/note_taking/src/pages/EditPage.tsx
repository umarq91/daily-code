import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteData } from "../types";
import NoteForm from "../component/NoteForm";

function EditPage() {
  const { title } = useParams();
  const navigate = useNavigate();
  const { findNote, updateNote } = useLocalStorage();
  const [note, setNote] = useState<NoteData | null>(null);

  useEffect(() => {
    if (title) {
      const data = findNote(title);
      if (data) {
        setNote(data);
      }
    }
  }, [title, findNote]);

  function updateItem(updatedData: NoteData) {
    updateNote(title!, updatedData); // Update note in localStorage
    navigate("/"); // Redirect back to the dashboard
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-5xl py-20 px-10 min-h-screen mx-auto bg-blue-200">
        {note ? (
          <NoteForm onSubmit={updateItem} data={note} />
        ) : (
          <p className="text-center text-lg font-semibold">Loading note...</p>
        )}
      </div>
    </div>
  );
}

export default EditPage;
