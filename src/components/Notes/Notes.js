import React, { useState } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import "./Notes.css";

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
      <div className="note-container">
        {notes.map((noteItem, index) => {
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
      </div>
    </React.Fragment>
  );
};

export default Notes;
