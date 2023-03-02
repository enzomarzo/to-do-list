import { render, fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import { IUseNotes } from '../../../hooks/useNotes';
import Note from './Note';

jest.mock('next/router', () => require('next-router-mock'));

describe('Note component', () => {
  const noteActions: IUseNotes  = {
    notes: [],
    getNote: jest.fn(),
    editNote: jest.fn(),
    addNote: jest.fn(),
    deleteNote: jest.fn()
  };

  beforeEach(() => {
    mockRouter.push('/initial-path');
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
      ctrlKey: true
    });
    container.dispatchEvent(keyboardEvent);
    expect(noteActions.addNote).toHaveBeenCalled();
  });
});
