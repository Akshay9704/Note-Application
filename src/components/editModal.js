import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import Helper from "../helper"

const EditModal = ({ fetchNotes, element, editTitle, editTagline, editDesc, setEditDesc, setEditTagline, setEditTitle, notes, setNotes, ...props }) => {
    const helperInstance = new Helper();

    const updateHandler = async (id) => {
        const updatedNotes = notes.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    title: editTitle,
                    tagline: editTagline,
                    desc: editDesc
                };
            }
            return item;
        });
        try {
            await helperInstance.editNotes(id,{
                title: editTitle,
                tagline: editTagline,
                desc: editDesc
            });
        } catch (error) {
            console.error("Error updating note:", error);
        } finally {
            fetchNotes();
        }
        setNotes(updatedNotes);
        props.onHide();
    };

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className='py-4 px-4'>
                <AiOutlineClose onClick={props.onHide} className='text-black text-xl cursor-pointer' />
                <div className='flex flex-col gap-3 items-center mt-4'>
                    <input onChange={(e) => setEditTitle(e.target.value)} value={editTitle} id="editTitle" className='border w-9/12 border-black rounded-lg py-2 px-3 placeholder-black' placeholder='Title'></input>
                    <input onChange={(e) => setEditTagline(e.target.value)} value={editTagline} id="editTagline" className='border w-9/12 border-black rounded-lg py-2 px-3 placeholder-black' placeholder='Tagline'></input>
                    <input
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        type="input"
                        id="editDesc"
                        className="border w-9/12 border-black rounded-lg py-2 px-3 placeholder-black"
                        placeholder="Description"
                    />
                </div>
            </div>
            <button onClick={() => updateHandler(element.id)}>Edit</button>
        </Modal>
    );
};

export default EditModal;
