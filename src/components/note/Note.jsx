import './note.css';
import { FaPlus } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from "react-icons/ai";
import { useState } from 'react';

function Note() {
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const arr = [
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."}
  ]
  const [noteFlag, setNoteFlag] = useState(arr.map(() => ({ edit: false })));
  const toggleEdit = (index, note) => {
    setTitle(note.title)
    setDesc(note.desc)
    setNoteFlag(prevFlags => 
      prevFlags.map((flag, i) => 
        i === index ? { ...flag, edit: true} : flag
      )
    );
  };

  return (
    <div className="note"> 
      <div className="header"><h1>Notes</h1><button>< FaPlus/></button></div>
      <div className="notes">
        { 
          arr.map((note, index) => {  
            return(
              <div className="noteHolder" key={index}>
              <form >
                <div className='titleHolder'>
                  {noteFlag[index].edit ? <input type='text' id='title' value={title} required onChange={(e) => {setTitle(e.target.value)}}/> : <h3>{note.title}</h3>}
                  <div>
                    <button disabled={noteFlag[index].edit} onClick={() => toggleEdit(index, note)} ><HiPencil/></button> 
                    <button>{noteFlag[index].edit ? <AiFillSave /> : <MdDelete />}</button>
                  </div>
                </div>
                {noteFlag[index].edit ? <textarea type='textarea' id='desc' value={desc} required onChange={(e) => {setDesc(e.target.value)}}/> : <p>{note.desc}</p>}
                </form>
              </div>              
            )
          })  
        }
      </div> 
    </div>
  );
}

export default Note;
