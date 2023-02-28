import { render, fireEvent } from '@testing-library/react';
import * as nextRouter from 'next/router';
import Note from './Note';

describe('Note component', () => {
  const noteActions = {
    getNote: jest.fn(),
    editNote: jest.fn(),
    addNote: jest.fn()
  };

  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockReturnValue({
    query: { noteId: '001' }
  });

  it('renders without throwing an error', () => {
    expect(() => render(<Note noteActions={noteActions} />)).not.toThrow();
  });

  it('calls the onSave function when the Save button is clicked', () => {
    const { getByTestId } = render(<Note noteActions={noteActions} />);
    fireEvent.click(getByTestId('save'));
    expect(noteActions.addNote).toHaveBeenCalled();
  });

  it('calls the handleKeyboardSave function when Ctrl/Cmd + S keys are pressed', () => {
    const { container } = render(<Note noteActions={noteActions} />);
    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
    });
    container.dispatchEvent(keyboardEvent);
    expect(noteActions.addNote).toHaveBeenCalled();
  });

});
