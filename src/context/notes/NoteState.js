import { useState } from 'react'
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000'

    const fetchNotes = async () => {
        try {
            const res = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
            const data = await res.json()
            setNotes(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const ini_notes = []
    const [notes, setNotes] = useState(ini_notes)

    const addNote = async (title, description, tag) => {
        try {
            const res = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "authToken": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })

            const data = await res.json()
            setNotes([...notes, data])
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })

            const data = await res.json()
            const upNotes = notes.filter(note => note._id !== data._id)
            setNotes(upNotes)
        } catch (error) {
            console.error(error.message)
        }
    }

    const editNote = async (id, title, description, tag) => {
        try {
            const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    "authToken": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })

            const data = await res.json()

            const newNotes = JSON.parse(JSON.stringify(notes))

            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === data._id) {
                    newNotes[index].title = title
                    newNotes[index].description = description
                    newNotes[index].tag = tag
                    break;
                }
            }

            setNotes(newNotes)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState