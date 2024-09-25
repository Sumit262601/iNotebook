import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {
    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const { deleteNote } = context;
    
    return (
        <div className='my-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-text">{note.tag}</h6>
                    <i className="fa-solid fa-trash-can float-end fs-4" style={{color: "red"}} onClick={() => {
                        deleteNote(note._id); props.showAlert("Deleted Successfully", "success")
                    }}></i>
                    <i className="fa-solid fa-pen-to-square" style={{color: "blue"}} onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NotesItem