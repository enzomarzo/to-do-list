import { AiOutlinePlus } from 'react-icons/ai';
import styles from './menu.module.scss';

interface IProps {
  addNote: (title: string, content?: string) => void;
}

const AddNote = ({ addNote }: IProps) => {
  return (
    <form
      className={styles['cmp-menu__add-note']}
      onSubmit={(ev) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;
        const inputEl = form.getElementsByTagName('input')[0] as HTMLInputElement;
        addNote(inputEl.value);
        form.reset();
      }}>
      <input
        placeholder="add a note title"
        aria-label="note Title"
        className={styles['cmp-menu__add-note-input']}
        name="note"
      />
      <button className={styles['cmp-menu__add-note-button']} type="submit">
        <AiOutlinePlus size="1.2em" className={styles['cmp-menu__add-note-icon']} />
        <span className={styles['cmp-menu__add-note-text']}>Add note</span>
      </button>
    </form>
  );
};

export default AddNote;
