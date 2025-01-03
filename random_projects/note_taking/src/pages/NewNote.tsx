import { useNavigate } from "react-router-dom";
import NoteForm from "../component/NoteForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteData } from "../types";


function NewNote() {
  const { addNote } = useLocalStorage();
  const navigate = useNavigate();
  const addNewNote = (payload: NoteData) => {
    addNote(payload);
    navigate("/");
  };
  return (
    <div className="min-h-screen   w-full">
      <div className="max-w-5xl py-20 px-10 min-h-screen mx-auto bg-blue-200">
        <NoteForm onSubmit={addNewNote} />
      </div>
    </div>
  );
}

export default NewNote;
