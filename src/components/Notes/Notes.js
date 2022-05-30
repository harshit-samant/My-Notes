import React, { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import "./Notes.css";

let localNotes = [];

const getNotes = () => {
  if (localStorage.getItem("notes")) {
    localNotes = JSON.parse(localStorage.getItem("notes"));
  }
};

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
    setNotes(localNotes);
  }, []);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      localStorage.setItem("notes", JSON.stringify([newNote, ...prevNotes]));
      return [newNote, ...prevNotes];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      const filteredNotes = prevNotes.filter((noteItem, index) => {
        return index !== id;
      });

      localStorage.setItem("notes", JSON.stringify(filteredNotes));
      return filteredNotes;
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
