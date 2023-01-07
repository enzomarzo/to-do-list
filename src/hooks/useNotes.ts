import { useState, useEffect, memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import querystring from 'querystring';

export interface INote {
  id: string; // Date.now() just to keep it simple, without having an external lib and being able to use a unique key
  title: string;
  content: string;
}

export interface IUseNotes {
  notes: [] | INote[];
  addNote: (title: string, content?: string) => void;
  deleteNote: (note: INote) => void;
  editNote: (title: string, content: string, note: INote) => void;
  getNote: (id: string) => INote | undefined;
}

const LOCAL_STORAGE_KEY = 'notes';

const useNotes = (): IUseNotes => {
  const router = useRouter();
  const [storedNotes, setStoredNotes] = useState<INote[] | []>([]);

  // next js renders server side so it is needed a useEffect
  useEffect(() => {
    const storedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    setStoredNotes(storedNote ? JSON.parse(storedNote) : '');
  }, []);

  useEffect(() => {
    if (storedNotes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedNotes));
    }
  }, [storedNotes]);

  const addNote = useCallback(
    (title: string, content: string = '') => {
      if (!title) return;
      const newNote: INote = { id: Date.now().toString(), title, content };
      setStoredNotes([...storedNotes, newNote]);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...storedNotes, newNote]));

      // create a new route query with the note ID
      const queryString = querystring.stringify(router.query);
      const searchParams = new URLSearchParams(queryString);
      searchParams.set('noteId', newNote.id);
      const query = querystring.parse(searchParams.toString());
      router.push({ pathname: router.pathname, query });
    },
    [router, storedNotes]
  );

  const deleteNote = (note: INote) => {
    const updatedNotes = storedNotes.filter((n) => n !== note);
    setStoredNotes(updatedNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const editNote = (title: string, content: string, note: INote) => {
    if (!note) addNote(title);
    const updatedNotes = storedNotes.map((n) => (n === note ? { ...n, title, content } : n));
    setStoredNotes(updatedNotes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const getNote = useCallback(
    (id: string) => {
      const note = storedNotes && storedNotes.find((elem) => elem.id === id);
      return note;
    },
    [storedNotes]
  );

  return {
    notes: storedNotes,
    addNote,
    deleteNote,
    editNote,
    getNote
  };
};

export default useNotes;
