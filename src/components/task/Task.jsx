import './task.css';
import { FaPlus } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { AiFillSave } from "react-icons/ai";
import { useState } from 'react';

function Task() {
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState();
  const arr = [
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae.", completed : false, deadline : "dd/mm/yyyy"},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae.", completed : false, deadline : "dd/mm/yyyy"},
    {title : "Title", desc : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis dolores facilis nulla quaerat placeat obcaecati aut quidem maiores, rem, beatae quisquam ipsum itaque nemo! Ab ducimus architecto quam quae.", completed : false, deadline : "dd/mm/yyyy"}
  ]
  const [taskFlag, setTaskFlag] = useState(arr.map(() => ({ edit: false })));
  const toggleEdit = (index, task) => {
      setTitle(task.title)
      setDesc(task.desc)
      setDeadline(task.deadline)
      setCompleted(task.completed)
    setTaskFlag(prevFlags => 
      prevFlags.map((flag, i) => 
        i === index ? { ...flag, edit: true} : flag
      )
    );
  };

  return (
    <div className="task"> 
      <div className="header"><h1>Tasks</h1><button>< FaPlus/></button></div>
      <div className="notes">
        { 
          arr.map((task, index) => {  
            return(
              <div className="noteHolder" key={index}>
              <form >
                <div className='titleHolder'>
                  {taskFlag[index].edit ? <input type='text' id='title' value={title} required onChange={(e) => {setTitle(e.target.value)}}/> : <h3>{task.title}</h3>}
                  <div>
                    <button disabled={taskFlag[index].edit} onClick={() => toggleEdit(index, task)} ><HiPencil/></button> 
                    <button>{taskFlag[index].edit ? <AiFillSave /> : <MdDelete />}</button>
                  </div>
                </div>
                {taskFlag[index].edit ? <textarea type='textarea' id='desc' value={desc} required onChange={(e) => {setDesc(e.target.value)}}/> : <p>{task.desc}</p>}
                {taskFlag[index].edit ? <div><label htmlFor="status">Finished </label><input type='checkbox' id='status' checked={completed} onChange={(e) => {setCompleted(!completed)}} /></div> : <p>status : {task.completed ? "Finished" : "Not finished"}</p>}
                {taskFlag[index].edit ? <input type='text' id='deadline' value={deadline} required onChange={(e) => {setDeadline(e.target.value)}}/> : <p>deadline : {task.deadline}</p>}
              </form>
              </div>              
            )
          })  
        }
      </div> 
    </div>
  );
}

export default Task;
