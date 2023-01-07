import React, { FormEvent, KeyboardEventHandler, useEffect, useMemo, useState } from 'react';
import styles from './note.module.scss';
import { useRouter } from 'next/router';
import { IUseNotes } from '../../../hooks/useNotes';
import Button from '../../foundation/Button/Button';

interface IProps {
  noteActions: IUseNotes;
}

const Note = ({ noteActions }: IProps) => {
  const { getNote, editNote, addNote } = noteActions;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { noteId } = router.query;
  const note = useMemo(() => {
    return noteId ? getNote(noteId.toString()) : '';
  }, [getNote, noteId]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const onSave = () => {
    note ? editNote(title, content, note) : addNote(title, content);
  };

  const handleKeyboarSave: KeyboardEventHandler<HTMLDivElement> = (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 's') {
      ev.preventDefault();
      onSave();
    }
  };

  const onChangeTitle = (ev: FormEvent<HTMLInputElement>) => {
    const inputEl = ev.target as HTMLInputElement;
    setTitle(inputEl.value);
  };

  const onChangeContent = (ev: FormEvent<HTMLTextAreaElement>) => {
    const contentEl = ev.target as HTMLInputElement;
    setContent(contentEl.value);
  };

  return (
    <div onKeyDown={handleKeyboarSave} className={styles['cmp-note']}>
      <h1 className={styles['cmp-note__title']}>
        <input
          placeholder="Name a title"
          className={styles['cmp-note__title-input']}
          value={title}
          aria-label="Note title"
          onChange={onChangeTitle}
        />
      </h1>
      <textarea
        className={styles['cmp-note__content']}
        rows={10}
        value={content}
        aria-label="Note content"
        onChange={onChangeContent}
        placeholder="Add your notes. Do not forget to save it :)"
      />
      <Button className={styles['cmp-note__edit-button']} onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default Note;
