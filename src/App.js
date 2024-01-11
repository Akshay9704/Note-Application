import { useState, useEffect } from "react";
import Header from "./components/header";
import InputField from "./components/inputfield";
import Notes from "./components/notes";
import Helper from "./helper";
import PinnedNotes from "./components/pinnedNotes";

function App() {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState("");
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([{
    title: "",
    tagline: "",
    desc: ""
  }]);
  const [showNotes, setShowNotes] = useState(true);

  async function fetchNotes() {
    const helperInstance = new Helper();
    const Note = await helperInstance.getNotes();
    setNotes(Note);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Header />
      <InputField fetchNotes={fetchNotes} title={title} setTitle={setTitle} tagline={tagline} setTagline={setTagline} desc={desc} setDesc={setDesc} setNotes={setNotes} />
        <div className='flex flex-col items-center mt-10'>
          <div className="w-8/12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => {
              <PinnedNotes key={note.id} note={note} showNotes={showNotes} setShowNotes={setShowNotes}/>
            })}
          </div>
        </div>
      <div className='flex flex-col items-center mt-2'>
        <div className="w-8/12 bg-black grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((element) => {
            return (
              <Notes fetchNotes={fetchNotes} key={element.id} element={element} notes={notes} setNotes={setNotes} setEdit={setEdit} showNotes={showNotes} setShowNotes={setShowNotes} setPinnedNotes={setPinnedNotes} />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
