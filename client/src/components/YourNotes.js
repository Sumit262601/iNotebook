import React, { useContext, useEffect, useRef, useState } from 'react'
import contextValue from "../context/notes/noteContext"
import NotesItem from './NotesItem';
import { useNavigate } from 'react-router-dom'

const YourNotes = (props) => {
    const context = useContext(contextValue);
    const navigate = useNavigate();
    
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    // USING useEffect TO FECTCHING A DATA IN ONE'S TIME FROM DATABASAE
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else {
            navigate('/login');
        }
    }, [getNotes, navigate]);

    // Using useRef to getting a refrence of modal for edit notes
    const ref = useRef(null)
    const refClose = useRef(null)

    // UPDATE NOTE A CARRING A REF FUNCTION OF MODAL 
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        console.log("Updating notes", note)
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Update Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                {/* Launch static backdrop modal */}
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action='' className='px-5'>
                                <div className="mb-4">
                                    <label htmlFor="title" className="form-label">Title *</label>
                                    <input type="text" className="form-control border border-3" value={note.etitle} onChange={onChange} minLength={5} required id="etitle" name="etitle" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label">Describtion *</label>
                                    <input type="text" className="form-control border border-3" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="tag" className="form-label">Tag *</label>
                                    <input type="text" className="form-control border border-3" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-center'>
                {notes.length === 0 && `Your notes is Empty. Please write here some notes.`}
            </div>
            <div className='container my-5'>
                <h2 className='text-center'>Your Notes</h2>
                <div className='row my-3'>
                    {notes.map((note) => {
                        return <NotesItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default YourNotes