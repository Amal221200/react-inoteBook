import React from 'react'

const NoteItem = ({ title, description, tag }) => {
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero dolor commodi repellendus delectus, quo accusantium, fugiat inventore, nostrum corporis vitae distinctio nisi illum nemo assumenda sit adipisci in est consequatur culpa vel excepturi eaque!</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem