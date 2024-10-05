import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { format } from 'date-fns';

const NotesItem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;

    return (
        <div className='flex flex-col max-w-full rounded border-2 border-customSecondaryNotes p-3 bg-customBackgroundNotes'>
            <div>
                <div className="flex items-center justify-between card-title text-2xl border-b-2 border-customSecondaryNotes p-2 text-customPrimaryNotes">
                    {note.title}
                    <span className="text-lg text-black">{format(new Date(note.date), 'MM/dd/yyyy')} </span>
                </div>
                <textarea rows={6} className="text-base bg-customBackgroundNotes outline-none w-full text-customPrimaryNotes mt-3">{note.description}</textarea>
                <div className='mt-10'>
                    <span className="inline-block bg-customTagNotes border-[#4D869C] border-1 rounded-full px-3 py-1 text-sm font-semibold text-customPrimaryNotes mb-2">
                        {note.tag}
                    </span>
                </div>
            </div>

            <div className='flex items-center justify-between mt-2 p-2 border-t-2 border-customSecondaryNotes '>
                <i className="fa-solid fa-pen-to-square cursor-pointer text-xl"
                    style={{ color: "#3b4b76" }} // You can change this to text-customPrimaryNotes if you want to maintain consistency
                    onClick={() => { updateNote(note) }}
                />
                <i className="fa-solid fa-trash-can cursor-pointer text-xl"
                    style={{ color: "#d9534f" }} // Keep this as it is, or define a custom color if needed
                    onClick={() => {
                        deleteNote(note._id); props.showAlert("Deleted Successfully", "success");
                    }}
                />

            </div>

        </div>
    );
}

export default NotesItem;
