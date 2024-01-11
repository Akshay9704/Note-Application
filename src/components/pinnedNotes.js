import React, { useState } from 'react'
import { TiPin } from 'react-icons/ti';
import Card from 'react-bootstrap/Card';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import EditModal from './editModal';

const PinnedNotes = ({ note, showNotes, setShowNotes }) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            {!showNotes && (
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
                                        <TiPin className='text-2xl cursor-pointer' />
                                    </span>
                                </OverlayTrigger>
                            </div>
                            <Card.Subtitle className="mb-2 text-muted">{note.tagline}</Card.Subtitle>
                            <Card.Text>
                                {note.desc}
                            </Card.Text>
                            <Card.Text className='flex gap-2 mt-2'>
                                <FaEdit className='text-2xl cursor-pointer' onClick={() => setModalShow(true)} /> <MdDelete className='text-2xl cursor-pointer' />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </section>
            )}
        </>
    )
}

export default PinnedNotes