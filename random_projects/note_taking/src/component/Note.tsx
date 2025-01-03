import React from "react";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "../types";

type Props = {
  note: NoteData;
  deleteNote: (title: string) => void;
};

function Note({ note, deleteNote }: Props) {
  return (
    <Link
      to={`/${note.title}`}
      key={note.title}
      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
    >
      {/* Note Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {note.title}
      </h2>

      {/* Note Content */}
      <p className="text-gray-600 line-clamp-3 mb-4">{note.content}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {note.tags.map((tag: Tag) => (
          <span
            key={tag.id}
            className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium"
          >
            {tag.label}
          </span>
        ))}
      </div>
      <button
        onClick={() => deleteNote(note.title)}
        className="mt-10 text-red-600"
      >
        {" "}
        Delete
      </button>
    </Link>
  );
}

export default Note;
