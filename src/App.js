import { useState, useEffect } from "react";
import Header from "./components/header";
import InputField from "./components/inputfield";
import Notes from "./components/notes";
import PinnedNotes from "./components/pinnedNotes";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Helper from "./helper";

function App() {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState("");
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);

  async function fetchNotes() {
    const helperInstance = new Helper();
    const Note = await helperInstance.getNotes();
    setNotes(Note);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const notesPerPage = 6;

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  const notesToShow = notes.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <InputField fetchNotes={fetchNotes} title={title} setTitle={setTitle} tagline={tagline} setTagline={setTagline} desc={desc} setDesc={setDesc} setNotes={setNotes} />
      <div className='flex flex-col md:items-center ml-10 mt-10'>
        <h5 className="font-semibold text-lg text-black mb-1">Pinned</h5>
        <div className="w-full md:w-8/12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {pinnedNotes.map((note) => {
            return (
              <PinnedNotes
                key={note.id}
                notes={notes}
                note={note}
                fetchNotes={fetchNotes}
                pinnedNotes={pinnedNotes}
                setPinnedNotes={setPinnedNotes}
                setNotes={setNotes}
                setEdit={setEdit}
              />
            )
          })}
        </div>
      </div>
      <div className='flex flex-col md:items-center ml-10 mt-5'>
        <h5 className="font-semibold text-lg text-black mb-1">Other</h5>
        <div className="w-full md:w-8/12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {notesToShow.map((element) => {
            return (
              <Notes
                key={element.id}
                notes={notes}
                setNotes={setNotes}
                element={element}
                fetchNotes={fetchNotes}
                setPinnedNotes={setPinnedNotes}
                setEdit={setEdit}
              />
            )
          })}
        </div>
      </div>
      <div className="flex justify-center items-center mt-32 mb-4">
        <Pagination
          count={totalPages}
          style={{ color: 'rgb(133, 133, 133)' }}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default App;
