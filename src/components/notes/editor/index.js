import React, { Fragment, useState, useEffect } from 'react';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // Quill visual theme

function Editor(props) {
    const [currentContent, setCurrentContent] = useState('');

    // Autosave method
    const [timer, setTimer] = useState(null);


    // Generating the title through the body. 
    // It will show the first 16 characters of the note as the title.
    const updateNote = (content) => {
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 15);
        props.updateNote(props.note, {'title': title, 'body': content});
    }



    // The API will be updated after 3 seconds that the user has not typed.
    // When the user types before 3 seconds, the timer is reset and the API will not be updated.
    const handleChange = (content, delta, source) =>{
        clearTimeout(timer);
    if(source == 'user'){
        setCurrentContent(content);
        setTimer(setTimeout(() => updateNote(content), 3000))
    }
}



    useEffect(()=> {
        setCurrentContent(props.note.body)
    }, [props.note]);

    // Editing options available for user to create their note.
    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean'],
        ]
    }


    // Text editor
    return (
        <Fragment>
            <ReactQuill value={currentContent} onChange={handleChange} modules={modules}/>
        </Fragment>
    )
}

export default Editor;