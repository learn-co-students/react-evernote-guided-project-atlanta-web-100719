import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  return (
    <ul>
      {props.userArray.map((user) => user.notes.map((note) => <NoteItem title={note.title} body={note.body}/> ))}
    </ul>
  );
}

export default NoteList;
