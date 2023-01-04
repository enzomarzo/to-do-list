import React, { useEffect, useState } from 'react';
import styles from './nav.module.scss'

interface Note {
  text: string;
  done: boolean;
}

const Text = () => {
  const [notes, setNotes] = useState<Note[] | []>([]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem('notes') || ''))
  }, [])

  const addNote = (text: string) => {
    const newNote: Note = { text, done: false };
    setNotes([...notes, newNote]);
    localStorage.setItem('notes', JSON.stringify([...notes, newNote]));
  };

  const deleteNote = (note: Note) => {
    const updatedNotes = notes.filter(n => n !== note);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const editNote = (text: string, note: Note) => {
    const updatedNotes = notes.map(n => (n === note ? { ...n, text } : n));
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.text}>
            {note.text}
            <button onClick={() => deleteNote(note)}>Delete</button>
            <button onClick={() => editNote('edited note', note)}>Edit</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={event => {
          event.preventDefault();
          addNote((event.target as HTMLFormElement).elements.note.value);
          (event.target as HTMLFormElement).reset();
        }}
      >
        <input name="note" />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};


export default Text