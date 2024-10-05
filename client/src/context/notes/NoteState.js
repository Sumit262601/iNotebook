import { useState } from "react";
import NoteContext from "./noteContext";
// import { NOTE_API_END_POINT } from "../../utils/constant";

const NoteState = (props) => {
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // GET all notes
    const getNotes = async () => {
        // ADD API Call
        const response = await fetch(`https://cloud-api-ewam.onrender.com/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add notes
    const addNote = async (title, description, tag) => {
        // ADD API Call
        const response = await fetch(`https://cloud-api-ewam.onrender.com/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //auth-token when client login in iNotebook
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete Notes
    const deleteNote = async (id) => {
        // DELETE API Call
        const response = await fetch(`https://cloud-api-ewam.onrender.com/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                //auth-token when client login in iNotebook
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        console.log("Delete notes with id " + id);
        const newnotes = notes.filter((note) => { return note._id !== id })
        setNotes(newnotes);
    }

    // Edit Notes
    const editNote = async (id, title, description, tag) => {
        // Edit API Call
        const response = await fetch(`https://cloud-api-ewam.onrender.com/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                //auth-token when client login in iNotebook
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;