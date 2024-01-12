import React, { useState } from 'react'
import { TiPin } from 'react-icons/ti';
import Card from 'react-bootstrap/Card';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import EditModal from './editModal';
import Helper from '../helper';

const PinnedNotes = ({ note, notes, setNotes, fetchNotes, pinnedNotes, setPinnedNotes }) => {
    const [modalShow, setModalShow] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editTagline, setEditTagline] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const helperInstance = new Helper();

    const editHandler = (id) => {
        const noteToEdit = notes.find((item) => item.id === id);
        if (noteToEdit) {
            setEditTitle(noteToEdit.title || '');
            setEditTagline(noteToEdit.tagline || '');
            setEditDesc(noteToEdit.desc || '');
            setModalShow(true);
        }
    };

    const removeHandler = async (id) => {
        await helperInstance.deleteNotes(id);
        setNotes((prevNotes) => prevNotes.filter((item) => item.id !== id));
        fetchNotes();
    };

    const unpinHandler = (note) => {
        const unpinNote = pinnedNotes.filter(data => data.id !== note.id);
        setPinnedNotes(unpinNote);
        setNotes(prevArr => [note, ...prevArr]);
    };    

    return (
        <>
            <section className="grid grid-cols-3 grid-rows-1">
                <Card key={note.id} style={{ width: '18rem', backgroundColor: "rgb(177, 177, 177)" }}>
                    <Card.Body>
                        <div className='flex justify-between'>
                            <Card.Title>{note.title}</Card.Title>
                            <OverlayTrigger
                                placement='top'
                                delay={{ show: 100, hide: 150 }}
                                overlay={<Tooltip>Unpin</Tooltip>}
                            >
                                <span className="d-inline-block">
                                    <TiPin onClick={() => unpinHandler(note.id)} className='text-2xl cursor-pointer' />
                                </span>
                            </OverlayTrigger>
                        </div>
                        <Card.Subtitle className="mb-2 text-muted">{note.tagline}</Card.Subtitle>
                        <Card.Text>
                            {note.desc}
                        </Card.Text>
                        <Card.Text className="flex gap-2 mt-2">
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 100, hide: 150 }}
                                    overlay={<Tooltip id="pin">Edit</Tooltip>}
                                >
                                    <span className="d-inline-block">
                                        <FaEdit
                                            className="text-2xl cursor-pointer"
                                            onClick={() => {
                                                setModalShow(true);
                                                editHandler(note.id);
                                            }}
                                        />
                                    </span>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 100, hide: 150 }}
                                    overlay={<Tooltip id="pin">Delete</Tooltip>}
                                >
                                    <span className="d-inline-block">
                                        <MdDelete
                                            className="text-2xl cursor-pointer"
                                            onClick={() => removeHandler(note.id)}
                                        />
                                    </span>
                                </OverlayTrigger>
                            </Card.Text>
                    </Card.Body>
                </Card>
            </section>
            <EditModal
                editTitle={editTitle}
                editTagline={editTagline}
                editDesc={editDesc}
                setEditDesc={setEditDesc}
                setEditTagline={setEditTagline}
                setEditTitle={setEditTitle}
                notes={notes}
                setNotes={setNotes}
                note={note}
                show={modalShow}
                fetchNotes={fetchNotes}
                onHide={() => setModalShow(false)}
            ></EditModal>
        </>
    )
}

export default PinnedNotes