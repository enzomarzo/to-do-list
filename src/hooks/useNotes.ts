import { useState, useEffect } from "react";

export interface Note {
  text: string;
  done: boolean;
}

const LOCAL_STORAGE_KEY = "notes";

const useNotes = () => {
  const initialNotes = [];
  const [items, setItems] = useState<Note[] | []>([]);

  useEffect(() => {
    const storedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    setItems(storedNote ? JSON.parse(storedNote) : "");
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addNote = (text: string) => {
    const newNote: Note = { text, done: false };
    console.log(newNote);
    setItems([...items, newNote]);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...items, newNote])
    );
  };

  const deleteNote = (note: Note) => {
    const updatedNotes = items.filter((n) => n !== note);
    setItems(updatedNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const editNote = (text: string, note: Note) => {
    const updatedNotes = items.map((n) => (n === note ? { ...n, text } : n));
    setItems(updatedNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  return {
    notes: items,
    addNote,
    deleteNote,
    editNote,
  };
};

export default useNotes;
