import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './note.module.scss';
import { useRouter } from 'next/router';
import { IUseNotes } from '../../../hooks/useNotes';
import Button from '../../foundation/Button/Button';

interface IProps {
  noteActions: IUseNotes;
}

const Note = ({ noteActions }: IProps) => {
  const { getNote, editNote } = noteActions;
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
    if (!note) return;
    editNote(title, content, note);
  };

  const onChangeTitle = (ev: FormEvent<HTMLInputElement>) => {
    const inputEl = ev.target as HTMLInputElement;
    setTitle(inputEl.value);
  };

  const onChangeContent = (ev: FormEvent<HTMLTextAreaElement>) => {
    const contentEl = ev.target as HTMLInputElement;
    setContent(contentEl.value);
  };

  if (!note) return null;

  return (
    <div className={styles['cmp-note']}>
      <h1 className={styles['cmp-note__title']}>
        <input className={styles['cmp-note__title-input']} value={title} onChange={onChangeTitle}></input>
      </h1>
      <textarea
        className={styles['cmp-note__content']}
        rows={10}
        value={content}
        onChange={onChangeContent}
        placeholder="Add your notes"
      />
      <Button className={styles['cmp-note__edit-button']} onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default Note;
