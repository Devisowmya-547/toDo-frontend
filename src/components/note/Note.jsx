import './note.css';
import { FaPlus } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from "react-icons/ai";
import { TbXboxX } from "react-icons/tb";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiNotepadBold } from "react-icons/pi";

function Note() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [arr, setArr] = useState([
    {title : "Add a new Note", desc : "Add Note Description"}
  ])
  const [noteFlag, setNoteFlag] = useState(arr.map(() => ({ edit: false })));

  useEffect(() => {
    async function fetchData(){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/note/getNotes/${email}`)
      .then((res) => {
        const notes = res.data.notes[0].notes
        setArr(notes)
        setNoteFlag(notes.map(() => ({ edit: false })));
      })
      .catch((err) => {
        console.log(err)
      })
    }
    fetchData()
  }, [email])

  const toggleEdit = (index, note, val) => {
    console.log(process.env.REACT_APP_BASE_URL)
    setTitle(note.title)
    setDesc(note.desc)
    setNoteFlag(prevFlags => 
      prevFlags.map((flag, i) => 
        i === index ? { ...flag, edit: val} : flag
      )
    );
  };

  async function addNoteFun(e){
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_BASE_URL}/note/addNote`, {email, title, desc})
    .then((res) => {
      alert(res.data.message)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  async function updateNoteFun(e){
    await axios.put(`${process.env.REACT_APP_BASE_URL}/note/updateNote`, {email, title, desc})
    .then((res) => {
      alert(res.data.message)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  async function deleteNoteFun(delTitle){
    if(window.confirm('Are you sure you want to delete this note?')){
      await axios.put(`${process.env.REACT_APP_BASE_URL}/note/deleteNote`, {email, delTitle})
      .then((res) => {
        alert(res.data.message)
        window.location.reload()
      })
      .catch(err => console.log(err))
    }
  }

  function gotoTask(){
    navigate('/task', {state : email})
  }

  return (
    <div className="note"> 
      <center><h1 style={{ marginLeft: '15px'}}>NOTES</h1></center>
      <form className='addForm' onSubmit={addNoteFun}>
        <button disabled={true} ><label htmlFor="noteTitle"><PiNotepadBold id='noteIcon'/></label></button>        
        <input required type="text" id='noteTitle' onChange={(e) => {setTitle(e.target.value)}} placeholder='Add new Note'/><br />
        <button id='addFormSave'><FaPlus id='addPlus'/></button>
      </form>
      <div className="notes">
        {
          arr.map((note, index) => {  
            return(
              <div className="noteHolder" key={index}>          
                <div className='titleHolder'>
                  {noteFlag[index].edit ? <input type='text' id='title' value={title} required onChange={(e) => {setTitle(e.target.value)}}/> : <h3>{note.title}</h3>}
                  <div>
                    {!noteFlag[index].edit ? <button onClick={() => toggleEdit(index, note, true)} ><HiPencil/></button> : <button onClick={() => toggleEdit(index, note, false)}><TbXboxX/></button>} 
                    {noteFlag[index].edit ? <button onClick={updateNoteFun}><AiFillSave /></button> : <button onClick={() => deleteNoteFun(note.title)}><MdDelete /></button>}
                  </div>
                </div>
                {noteFlag[index].edit ? <textarea type='textarea' id='desc' value={desc} required onChange={(e) => {setDesc(e.target.value)}}/> : <p>{note.desc}</p>}
              </div>              
            )
          })
        }
      </div> 
      <button onClick={gotoTask} id='gotoNote'>Task</button>
    </div>
  );
}

export default Note;
