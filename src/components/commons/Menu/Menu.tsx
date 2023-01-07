import React, { useEffect, useState } from 'react';
import { INote, IUseNotes } from '../../../hooks/useNotes';
import styles from './menu.module.scss';
import { AiOutlinePlus, AiOutlineFileText, AiFillDelete, AiOutlineMenu, AiOutlineDoubleLeft } from 'react-icons/ai';
import Link from 'next/link';
import Button from '../../foundation/Button/Button';
import AddNote from './AddNote';

interface IProps {
  noteActions: IUseNotes;
}

const Menu = ({ noteActions }: IProps) => {
  const { notes, addNote, deleteNote } = noteActions;
  const [menuVisible, setMenuVisible] = useState(true);
  const linkPath = (noteId: string) => `/?noteId=${noteId}`;

  const onRemove = (note: INote) => {
    deleteNote(note);
  };

  const toggleMenu = () => {
    console.log(menuVisible);
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const isSmallerScreen = window.matchMedia(`(max-width: ${768}px)`);
    if (!isSmallerScreen.matches) {
      setMenuVisible(false);
    }
  }, []);

  const renderNoteList = (
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
              <AiFillDelete className={styles['cmp-menu__list-items-remove-icon']} />
              <span className={styles['cmp-menu__list-items-remove-text']}>Delete note</span>
            </Button>
          </div>
        ))}
    </ul>
  );

  return (
    <>
      <Button
        iconOnly
        className={`${styles['cmp-menu__hamburger']} ${!menuVisible ? styles['cmp-menu__hamburger--opened'] : ''}`}
        onClick={toggleMenu}>
        {menuVisible ? (
          <>
            <AiOutlineMenu size="1.2em" className={styles['cmp-menu__hamburger-icon--closed']} />
            <span className={styles['cmp-menu__hamburger-text']}>Close Menu</span>
          </>
        ) : (
          <>
            <AiOutlineDoubleLeft size="1.2em" className={styles['cmp-menu__hamburger-icon--opened']} />
            <span className={styles['cmp-menu__hamburger-text']}>Open Menu</span>
          </>
        )}
      </Button>
      <nav className={`${styles['cmp-menu']} ${menuVisible ? styles['cmp-menu--collapsed'] : ''}`}>
        <AddNote addNote={addNote} />
        {renderNoteList}
      </nav>
    </>
  );
};

export default Menu;
