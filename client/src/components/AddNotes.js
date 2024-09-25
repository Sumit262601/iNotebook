import React, { useContext, useState } from 'react'
import contextValue from "../context/notes/noteContext"

const AddNotes = (porps) => {
  const context = useContext(contextValue);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    porps.showAlert("Added Successfully", "success")
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-5 px-5'>
      <h1 className='text-center'>Add Notes</h1>
      <form action='' className='px-5'>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Title *</label>
            <input type="text" className="form-control border border-3" onChange={onChange} value={note.title} minLength={5} required id="title" name="title" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="form-label">Describtion *</label>
            <input type="text" className="form-control border border-3" id="description" name="description"  onChange={onChange} value={note.description} minLength={5} required />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="form-label">Tag *</label>
            <input type="text" className="form-control border border-3" id="tag" name="tag" onChange={onChange} value={note.tag} />
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
    </div>
  )
}

export default AddNotes