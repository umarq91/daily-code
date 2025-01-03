import { useEffect, useState } from "react";
import { NoteData } from "../types";

const LOCAL_STORAGE_KEY = "notes";

export const useLocalStorage = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);

  useEffect(() => {
    const notes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  useEffect(() => {
    if (notes.length === 0) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(data: NoteData) {
    setNotes([...notes, data]);
  }

  function updateNote(title: string, data: NoteData) {
    const noteIndex = notes.findIndex((note) => note.title === title);
    const newNotes = [...notes];
    newNotes[noteIndex] = data;
    setNotes(newNotes);
  }

  function findNote(title: string) {
    return notes.find((note) => note.title === title);
  }

  function deleteNote(title: string) {
    const newNotes = notes.filter((note) => note.title !== title);
    setNotes(newNotes);
  }

  return {
    notes,
    addNote,
    findNote,
    updateNote,
    deleteNote,
  };
};
