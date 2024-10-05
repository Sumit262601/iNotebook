import React, { useContext, useEffect, useState } from 'react';
import contextValue from "../context/notes/noteContext";
import NotesItem from './NotesItem';
import { Link, useNavigate } from 'react-router-dom';

const YourNotes = (props) => {
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const context = useContext(contextValue);
    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
    }, [getNotes, navigate]);

    const updateNote = (currentNote) => {
        setIsModalOpen(true);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setIsModalOpen(false);
        props.showAlert("Update Successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative max-w-md w-full bg-[#EEF7FF] rounded-lg shadow-lg">
                        <div className="border-b-2 py-3 px-6 border-[#4D869C]">
                            <h1 className="text-2xl font-bold mb-2 text-[#3b4b76]">Edit Notes</h1>
                        </div>
                        <div className="p-6">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="etitle" className="block text-[#3b4b76] text-xl font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border-2 border-[#4D869C] rounded-md focus:outline-none focus:border-[#7AB2B2]"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="edescription" className="block text-[#3b4b76] text-xl font-bold mb-2">Description</label>
                                    <textarea
                                        type="text"
                                        rows={7}
                                        className="w-full p-2 border-2 border-[#4D869C] rounded-md focus:outline-none focus:border-[#7AB2B2]"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="etag" className="block text-[#3b4b76] text-xl font-bold mb-2">Tag</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border-2 border-[#327995] rounded-md focus:outline-none focus:border-[#7AB2B2]"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end p-4 space-x-4 border-t border-[#dbc9db]">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>Close</button>
                            <button className="bg-[#4D869C] hover:opacity-90 text-white px-4 py-2 rounded-md" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes section */}
            {notes.length === 0 ? (
                <div className='flex flex-col items-center justify-center'>
                    <div className="mt-36 flex flex-col items-center justify-center text-5xl text-[#4D869C]">
                        Sorry! Don't have a notes.
                        <span className="mt-8 mb-4">🥺</span>
                    </div>
                    <button className="border-2 border-customBorderColor px-8 py-1 rounded-lg bg-[#CDE8E5]"> 
                        <Link to='/addnotes'>Add Notes</Link> 
                    </button>
                </div>
            ) : (
                <div className="px-6 sm:px-10">
                    <h2 className="text-center xl:text-5xl md:text-3xl sm:text-3xl lg:text-4xl font-medium mb-3 text-[#3b4b76]">Your Notes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                        {notes.map((note) => (
                            <NotesItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default YourNotes;
