import React from 'react';
import { INote, IUseNotes } from '../../../hooks/useNotes';
import styles from './menu.module.scss';
import { AiOutlinePlus, AiOutlineFileText, AiFillDelete } from 'react-icons/ai';
import Link from 'next/link';
import Button from '../../foundation/Button/Button';

interface IProps {
  noteActions: IUseNotes;
}

const Menu = ({ noteActions }: IProps) => {
  const { notes, addNote, deleteNote } = noteActions;
  const linkPath = (noteId: string) => `/?noteId=${noteId}`;

  const onRemove = (note: INote) => {
    deleteNote(note);
  };

  return (
    <nav className={styles['cmp-menu']}>
      <form
        className={styles['cmp-menu__add-note']}
        onSubmit={(ev) => {
          ev.preventDefault();
          const form = ev.target as HTMLFormElement;
          const imputEl = form.getElementsByTagName('input')[0] as HTMLInputElement;
          addNote(imputEl.value);
          form.reset();
        }}>
        <input className={styles['cmp-menu__add-note-input']} name="note" />
        <button className={styles['cmp-menu__add-note-button']} type="submit">
          <AiOutlinePlus size="1.2em" className={styles['cmp-menu__add-note-icon']} />
        </button>
      </form>

      <ul className={styles['cmp-menu__list']}>
        {notes &&
          notes.map((note) => (
            <div key={note.id} className={styles['cmp-menu__list-items']}>
              <Link href={linkPath(note.id)} className={styles['cmp-menu__list-items-link']}>
                <div>
                  <AiOutlineFileText className={styles['cmp-menu__list-items-icon']} />
                </div>
                <span className={styles['cmp-menu__list-items-text']}>{note.title}</span>
              </Link>

              <Button iconOnly className={styles['cmp-menu__list-items-remove']} onClick={() => onRemove(note)}>
                <AiFillDelete className={styles['cmp-menu__list-items-icon']} />
              </Button>
            </div>
          ))}
      </ul>
    </nav>
  );
};

export default Menu;
