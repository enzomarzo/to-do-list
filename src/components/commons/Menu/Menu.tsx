import React, { useEffect, useState } from 'react';
import { INote, IUseNotes } from '../../../hooks/useNotes';
import styles from './menu.module.scss';
import { AiOutlineFileText, AiFillDelete, AiOutlineMenu, AiOutlineDoubleLeft } from 'react-icons/ai';
import Link from 'next/link';
import Button from '../../foundation/Button/Button';
import AddNote from './AddNote';

interface IProps {
  noteActions: IUseNotes;
}

const Menu = ({ noteActions }: IProps) => {
  const { notes, addNote, deleteNote } = noteActions;
  const [sortedNotes, setSortedNotes] = useState(notes);
  const [menuVisible, setMenuVisible] = useState(true);
  const linkPath = (noteId: string) => `/?noteId=${noteId}`;

  const onRemove = (note: INote) => deleteNote(note);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  useEffect(() => {
    const isSmallerScreen = window.matchMedia(`(max-width: ${768}px)`);
    if (!isSmallerScreen.matches) {
      setMenuVisible(false);
    }
  }, []);

  useEffect(() => {
    setSortedNotes(notes);
  }, [notes]);

  const onSortByDate = () => {
    const sortByDate = [...notes].sort((a, b) => (a.id > b.id ? 1 : -1));
    console.log({ sortByDate });
    setSortedNotes(() => sortByDate);
  };

  const onSortByName = () => {
    const sortByName = [...notes].sort((a, b) => (a.title > b.title ? 1 : -1));
    console.log({ sortByName });
    setSortedNotes(() => sortByName);
  };

  const noteItems = (
    <ul className={styles['cmp-menu__list']}>
      {sortedNotes?.map((note) => (
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

  const menuToggle = menuVisible ? (
    <>
      <AiOutlineMenu size="1.2em" className={styles['cmp-menu__hamburger-icon--closed']} />
      <span className={styles['cmp-menu__hamburger-text']}>Open Menu</span>
    </>
  ) : (
    <>
      <AiOutlineDoubleLeft size="1.2em" className={styles['cmp-menu__hamburger-icon--opened']} />
      <span className={styles['cmp-menu__hamburger-text']}>Close Menu</span>
    </>
  );

  const sortOptions = (
    <div className={styles['cmp-menu__sort']}>
      <span>Sort by:</span>
      <Button onClick={onSortByDate}>
        <span className={styles['cmp-menu__sort-options-text']}>Date</span>
      </Button>
      <Button onClick={onSortByName}>
        <span className={styles['cmp-menu__sort-options-text']}>Name</span>
      </Button>
    </div>
  );

  return (
    <>
      <Button
        iconOnly
        className={`${styles['cmp-menu__hamburger']} ${!menuVisible ? styles['cmp-menu__hamburger--opened'] : ''}`}
        onClick={toggleMenu}>
        {menuToggle}
      </Button>
      <nav className={`${styles['cmp-menu']} ${menuVisible ? styles['cmp-menu--collapsed'] : ''}`}>
        <AddNote addNote={addNote} />
        {noteItems}
        {sortOptions}
      </nav>
    </>
  );
};

export default Menu;
