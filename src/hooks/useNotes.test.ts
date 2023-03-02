import { act, renderHook } from '@testing-library/react';
import { expect, jest, it } from '@jest/globals';
import mockRouter from 'next-router-mock';

import useNotes, { INote } from './useNotes';

jest.mock('next/router', () => require('next-router-mock'));

describe('useNotes', () => {
  beforeEach(() => {
    mockRouter.push("/initial-path");
    const { result } = renderHook(() => useNotes());
    const title = 'Test Title';
    const content = 'Test Content';
    act(() => result.current.addNote(title, content));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should add a note to the array and localStorage', () => {
    const { result } = renderHook(() => useNotes());
    const title = 'New Note';
    const content = 'New test Content';
    act(() => result.current.addNote(title, content));

    expect(result.current.notes).toHaveLength(2);
  });

  it('should get a note by id', () => {
    const { result } = renderHook(() => useNotes());
    const lastNote = result.current.notes.slice(-1);
    const lastNoteId = lastNote[0].id;

    const foundNote = result.current.getNote(lastNoteId);
    expect(foundNote).toEqual(lastNote[0]);
  });

  it('should delete a note from the array and localStorage', () => {
    const { result } = renderHook(() => useNotes());
    expect(result.current.notes).toHaveLength(1);

    const lastNote: INote[] = result.current.notes.slice(-1);
    const lastNoteId: INote['id'] = lastNote[0].id;
    const foundNote: INote | undefined = result.current.getNote(lastNoteId);
    if (!foundNote) throw new Error(`Note with id ${lastNoteId} not found`);

    act(() => result.current.deleteNote(foundNote));

    expect(result.current.notes).toEqual([]);
  });
});
