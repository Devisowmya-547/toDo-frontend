import './note.css';
import { FaPlus } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from "react-icons/ai";
import { TbXboxX } from "react-icons/tb";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Note(email) {
  email = email.email;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [add, setAdd] = useState(false);
  const [arr, setArr] = useState([
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."}
  ])
  const [noteFlag, setNoteFlag] = useState(arr.map(() => ({ edit: false })));

  useEffect(() => {
    async function fetchData(){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/note/getNotes/${email}`)
      .then((res) => {
        setArr(res.data.notes[0].notes)
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

  return (
    <div className="note"> 
      <h1 style={{color: 'white', marginLeft: '15px'}}>Notes</h1>
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
        <div className="addFormHolder">
        { add ? 
          <form className='addForm' onSubmit={addNoteFun}>
            <br />
              <label htmlFor="noteTitle"><h2 style={{padding : '0', margin : '0'}}>Note title</h2></label>
              <input required type="text" id='noteTitle' onChange={(e) => {setTitle(e.target.value)}}/><br />
              <label htmlFor="noteDescription"><h2 style={{padding : '0', margin : '0'}}>Note Description</h2></label>
              <textarea required type="text" id='noteDescription' onChange={(e) => {setDesc(e.target.value)}}/><br />
              <button id='addFormSave'><AiFillSave /></button>
              <div><button onClick={() => {setAdd(false)}}><TbXboxX id='cross'/></button></div>
          </form>
          :    
          <div>
            <center>
              <button onClick={() => {setAdd(true)}} style={{display: "flex", padding: '0px'}}><h2>ADD NOTE</h2><FaPlus id='addPlus'/></button>
            </center>
          </div>   
        }
        </div>
      </div> 
    </div>
  );
}

export default Note;
