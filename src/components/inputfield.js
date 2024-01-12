import React, { useState } from 'react'
import Helper from "../helper";

const InputField = ({ title, setTitle, tagline, setTagline, desc, setDesc, setNotes, fetchNotes }) => {
    const [showInput, setShowInput] = useState(false);
    const [changeInput, setChangeInput] = useState("Take a note");

    const handleForm = (e) => {
        if (e.target.id === "title") {
            setTitle(e.target.value);
        } else if (e.target.id === "tagline") {
            setTagline(e.target.value);
        } else {
            setDesc(e.target.value);
        }
    }

    const handleInput = () => {
        setShowInput(true);
        setChangeInput("Description");
    }

    const handleClose = () => {
        setShowInput(false);
        setChangeInput("Take a note..");
    }

    const helperInstance = new Helper();
    const Note = async (data) => await helperInstance.addNotes(data);

    const addNoteHandler = async (e) => {
        e.preventDefault();
        if (title !== "" && tagline !== "" && desc !== "") {
            try {
                await Note({
                    title: title,
                    tagline: tagline,
                    desc: desc
                });
            } catch (error) {
                console.group(error);
            }finally {
                fetchNotes();
            }

            setNotes((note) => {
                return (
                    [...note, {
                        title: title,
                        tagline: tagline,
                        desc: desc,
                        id: new Date().getTime()
                    }]
                );
            });
        } else {
            alert("Invalid Input");
        }

        setDesc("");
        setTitle("");
        setTagline("");
    };


    return (
        <div className='inputfield' >
            <form className="input">
                {showInput === true ? (
                    <div>
                        <input id="title" onChange={handleForm} value={title} className='input_box placeholder-black' placeholder='Title'></input>
                        <input id="tagline" onChange={handleForm} value={tagline} className='input_box placeholder-black' placeholder='Tagline'></input>
                    </div>
                ) : null
                }
                <input
                    onClick={handleInput}
                    type="input"
                    id="input"
                    className="input_box placeholder-black"
                    placeholder={changeInput}
                    value={desc}
                    onChange={handleForm}
                />
                {showInput === true ? (
                    <span className="d-inline-block">
                        <button onClick={(e) => {
                            handleClose(e);
                            addNoteHandler(e);
                        }}
                            className='closebtn' style={{ position: 'absolute', bottom: '0', right: '20px' }}>Close & Save</button>
                    </span>
                ) : null}
            </form>
        </div >
    )
}

export default InputField