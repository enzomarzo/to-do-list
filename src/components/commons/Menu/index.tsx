import React, { useEffect, useState } from 'react';
import useNotes from '../../../hooks/useNotes';
import styles from './menu.module.scss'

const Menu = () => {
  const { notes, addNote, deleteNote, editNote } = useNotes()
  const { value, setValue } = useState()

  return (
    <nav className={styles["cmp-menu"]}>
      <form
        className={styles["cmp-menu__add-note"]}
        onSubmit={event => {
          event.preventDefault();
          addNote((event.target as HTMLFormElement).elements.note.value);
          (event.target as HTMLFormElement).reset();
        }}
      >
        <input className={styles["cmp-menu__add-note-input"]} name="note" />
        <button className={styles["cmp-menu__add-note-button"]} type="submit">+</button>
      </form>

      <ul className={styles["cmp-menu__list"]}>
        {notes && notes.map(note => {
          return (
            <div className={styles["cmp-menu__list-items"]} key={note.text}> {note.text} </div>
          )
        })}
      </ul>
    </nav>
  )
};


export default Menu