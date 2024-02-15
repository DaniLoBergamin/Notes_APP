import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from "rbx";
import "../../styles/notes.scss";
import { push as Menu } from 'react-burger-menu';
import List from "../notes/list";
import Editor from "../notes/editor";
import Search from '../notes/search';
import NoteService from '../../services/notes';



function Notes(props) {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });

    async function fetchNotes() {
    const response = await NoteService.index();
        if (response.data.length >= 1) {
            // data.reverse() - List notes from newest to oldest.
            setNotes(response.data.reverse())
            setCurrentNote(response.data[0])
        } else {
            // Empty setNotes - to be able to delete the last note.
            setNotes([]);
        }
    }



    // Method for creating notes (Create)
    const createNote = async (params) => {
        const note = await NoteService.create();
            fetchNotes();
    }

    // Method to delete notes (Delete)
    const deleteNote = async (note) => {
        await NoteService.delete(note._id);
            fetchNotes();
    }

    // Method to edit notes (Update)
    const updateNote = async (oldNote, params) => {
        const updatedNote = await NoteService.update(oldNote._id, params);
        const index = notes.indexOf(oldNote);   // What index is the element in the array.
        const newNotes = notes;                 // Saves momentarily saves the notes.
        newNotes[index] = updatedNote.data;
            setNotes(newNotes);                 // Updated notes.
            setCurrentNote(updatedNote.data);   // Updated notes.
    }

    // Method for searching notes (Search)
    const searchNotes = async (query) => {
        const response = await NoteService.search(query);
        setNotes(response.data)
    }

    // Through the id, it searches the notes and lists the currentNote
    const selectNote = (id) => {
        const note = notes.find((note) => {
        return note._id == id;
        })
            setCurrentNote(note);
    }



    useEffect(() => {
        fetchNotes();
    }, []);



    return (
        <Fragment>
            <Column.Group className="notes" id="notes">
                <Menu   pageWrapId={"notes-editor"}
                        isOpen={props.isOpen}
                        onStateChange={(state) => props.setIsOpen(state.isOpen)}
                        disableAutoFocus
                        outerContainerId={"notes"}
                        customBurgerIcon={false}
                        customCrossIcon={false}>
            <Column.Group>
                <Column size={10} offset={1}>
                    <Search searchNotes={searchNotes} fetchNotes={fetchNotes} />
                </Column>
            </Column.Group>
            <List   notes={notes}
                    selectNote={selectNote}
                    current_note={current_note} 
                    deleteNote={deleteNote}
                    createNote={createNote}/>
                </Menu>

                <Column size={12} className="notes-editor" id="notes-editor">
                    <Editor note={current_note} 
                            updateNote={updateNote} />
                </Column>
            </Column.Group>
        </Fragment>
    )
}

export default Notes;