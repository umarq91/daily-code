import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteData, Tag } from "../types";
import Note from "../component/Note";

function Dashboard() {
  const { notes, deleteNote } = useLocalStorage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Dashboard</h1>
        <button
          onClick={() => navigate("/new")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          + Add New Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note: NoteData) => (
            <Note note={note} deleteNote={deleteNote} />
          ))
        ) : (
          <p className="text-gray-500 text-lg text-center col-span-full">
            No notes available. Click "Add New Note" to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
