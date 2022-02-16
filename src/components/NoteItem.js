import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = ({ note, updateNote }) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
          <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem