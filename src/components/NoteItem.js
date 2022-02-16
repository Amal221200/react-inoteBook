import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = ({ id, title, description, tag }) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <i className="far fa-edit mx-2"></i>
          <i className="far fa-trash-alt mx-2" onClick={()=> {deleteNote(id)}}></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem