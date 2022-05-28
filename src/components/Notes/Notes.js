import React, { useState } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <React.Fragment>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        console.log(index);
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Notes;
