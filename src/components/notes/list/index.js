import React, { Fragment } from 'react';
import { Button, Column, Tag, Title, List } from "rbx";
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// Moment - Used to verify a date and extract information.
// List - Notes from components/notes to LIST.ITEM (Notes loop).

// onClick - The note you click will change color and will be displayed on the screen.
// substring (0,15) - Will display 16 characters of title.

//Regular expression (REGEX) - (/(<([^>]+)>)/ig, "") - Technique to select elements and not show html commands used in the text.
//EX: Title in bold - Will not show <b>, only the title already edited.

function ListNotes(props) {
    return (
        <Fragment>
            <Column.Group breakpoint="mobile">
                <Column size={6} offset={1}>
                    <Title  size={6}>
                            {props.notes.length} Notes
                    </Title>
                    <Column size={2}>
                        <Button state="active" color="custom-blue" outlined size="small" onClick={() => props.createNote()}>
                            Create a new note
                        </Button>
                    </Column>
                </Column>
            </Column.Group>
            <List   className="notes-list">
                    {props.notes.map((item, key) =>
            <List.Item key={key} onClick={() => props.selectNote(item._id)} active={item == props.current_note}>
                <Title  size={6}>
                        {item.title.replace(/(<([^>]+)>)/ig, "").substring(0,15)}
                </Title>
                <Title  size={6} subtitle spaced={false}>
                        {item.body.replace(/(<([^>]+)>)/ig, "").substring(0,30)}
                </Title>

                <Column.Group   breakpoint="mobile">
                    <Column     size={10}>
                        <Tag    color="dark">
                                {Moment(item.created_at).format('DD/MM/YYYY')}
                        </Tag>
                    </Column>
                </Column.Group>
                <Column size={2}>
                    <FontAwesomeIcon    icon={faTrash}
                                        onClick={() => props.deleteNote(item)}
                                        color="grey" />
                </Column>
            </List.Item>
        )}
            </List>
        </Fragment>
    )
}

export default ListNotes;