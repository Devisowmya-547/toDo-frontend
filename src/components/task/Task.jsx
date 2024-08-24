import './task.css';
import { FaPlus } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from "react-icons/ai";
import { TbXboxX } from "react-icons/tb";
import { useEffect, useState } from 'react';
import axios from 'axios';

function Task(email) {
  email = email.email;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState();
  const [add, setAdd] = useState(false);
  const [arr, setArr] = useState([
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae."}
  ])
  const [taskFlag, setTaskFlag] = useState(arr.map(() => ({ edit: false })));

  useEffect(() => {
    async function fetchData(){
      await axios.get(`${process.env.REACT_APP_BASE_URL}/task/getTasks/${email}`)
      .then((res) => {
        setArr(res.data.tasks[0].tasks)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    fetchData()
  }, [email])

  const toggleEdit = (index, task, val) => {
    console.log(process.env.REACT_APP_BASE_URL)
    setTitle(task.title)
    setDesc(task.desc)
    setDeadline(task.deadline)
    setCompleted(task.completed)
    setTaskFlag(prevFlags => 
      prevFlags.map((flag, i) => 
        i === index ? { ...flag, edit: val} : flag
      )
    );
  };

  async function addTaskFun(e){
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_BASE_URL}/task/addTask`, {email, title, desc, deadline})
    .then((res) => {
      alert(res.data.message)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  async function updateTaskFun(e){
    await axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`, {email, title, desc, deadline, done : completed})
    .then((res) => {
      alert(res.data.message)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  async function deleteTaskFun(delTitle){
    if(window.confirm('Are you sure you want to delete this task?')){
      await axios.put(`${process.env.REACT_APP_BASE_URL}/task/deleteTask`, {email, delTitle})
      .then((res) => {
        alert(res.data.message)
        window.location.reload()
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="task"> 
      <h1>Tasks</h1>
      <div className="notes">
        { 
          arr.map((task, index) => {  
            return(
              <div className="noteHolder" key={index}>          
                <div className='titleHolder'>
                  {taskFlag[index].edit ? <input type='text' id='title' value={title} required onChange={(e) => {setTitle(e.target.value)}}/> : <h3>{task.title}</h3>}
                  <div>
                    {!taskFlag[index].edit ? <button onClick={() => toggleEdit(index, task, true)} ><HiPencil/></button> : <button onClick={() => toggleEdit(index, task, false)}><TbXboxX/></button>} 
                    {taskFlag[index].edit ? <button onClick={updateTaskFun}><AiFillSave /></button> : <button onClick={() => deleteTaskFun(task.title)}><MdDelete /></button>}
                  </div>
                </div>
              <form >
                {taskFlag[index].edit ? <textarea type='textarea' id='desc' value={desc} required onChange={(e) => {setDesc(e.target.value)}}/> : <p>{task.desc}</p>}
                {taskFlag[index].edit ? <div className='status'><label htmlFor="status">Finished </label><input type='checkbox' id='status' checked={completed} onChange={(e) => {setCompleted(!completed)}} /></div> : <p>status : {task.done ? "Finished" : "Not finished"}</p>}
                {taskFlag[index].edit ? <input type='date' id='deadline' value={deadline} required onChange={(e) => {setDeadline(e.target.value)}}/> : <p>deadline : {task.deadline}</p>}
              </form>
              </div>              
            )
          })  
        }
        <div className="noteHolder">
        { add ? 
          <form className='addForm' onSubmit={addTaskFun}>
            <center>
              <input required type="text" placeholder='Task title' onChange={(e) => {setTitle(e.target.value)}}/><br />
              <textarea required type="text" placeholder='Task description' onChange={(e) => {setDesc(e.target.value)}}/><br />
              <label htmlFor='addDeadline'>Deadline : </label><input type="date" required placeholder='deadline' id='addDeadline' onChange={(e) => {setDeadline(e.target.value)}}/><br />
              <button><AiFillSave /></button>
            </center>
            <div><button onClick={() => {setAdd(false)}}><TbXboxX id='cross'/></button></div>
          </form>
          :    
          <div>
            <center><button onClick={() => {setAdd(true)}}><FaPlus id='addPlus'/></button>
            <h2>ADD TASK</h2></center>
          </div>   
        }
        </div>
      </div> 
    </div>
  );
}

export default Task;
