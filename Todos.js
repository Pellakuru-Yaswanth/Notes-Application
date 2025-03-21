import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Highlighter from 'react-highlight-words';
import HighlightWithinTextarea from 'react-highlight-within-textarea';

function Todos() {
  const [tasks,setTasks] = useState([{id:1,text:"Hello"},{id:2,text:"hi"}]);
    const [updatedTasks, setUpdated] = useState([]);
    const [search,setSearch] = useState("");
    const [state,setState] = useState(false);
    const [noSearch,setNoSearch] = useState("");
  
    useEffect(() => searchItem(search),[search,state]);
    const add = () => {
      var task = document.getElementById("task");
      if(task.value==="") {
        alert("Task content should be given");
      }
      else{
      const p = {
        id:uuidv4(),
        text:task.value,
        };
      setTasks([...tasks,p]);
      setUpdated([...updatedTasks,p]);
      task.value = ""
    }
    }
    const deleteItem = (index) => {
      const k = [...tasks];
      let index1 = index
      for(let i in k){
        if(k[i].id===updatedTasks[index].id) index1 = i
      }
      k.splice(index1,1);
      setTasks(k);
      setState(!state);
    }

    const searchItem = (data) => {
      if(data!=="" && data!==null){
        const k = tasks.filter(item => item.text.toLowerCase().includes(data.toLowerCase()));
        if(k.length==0) setNoSearch("No Such item has found");
        else setNoSearch("");
        setUpdated(k);
      }
      else {
        setUpdated(tasks);
        setNoSearch("");
        setSearch(null);
      }
    }
  
    const handleSearch = event => {
      setSearch(event.target.value);
    }

    const returnElement = (item,index) => {
      const onchange = (value) => {
        const k = [...tasks];
        k[index].text = value;
        setTasks(k);
        setUpdated(k);
      }
  
      return(
          <HighlightWithinTextarea id = {item.id} highlight={search} value={item.text} placeholder='Type here...' onChange={onchange}/>
      );
  
    }
  
    return (
      <center><div className="todo-list">
        <h1>My Todos</h1>
        <input
          type='text'
          value={search}
          placeholder="Search..."
          id = "search"
          onChange={handleSearch}
        ></input><br></br>
        <p style={{color:'red'}}>{noSearch}</p>
        {updatedTasks.map((item,index) => 
          <div className ="todo-listitem">
            <div className='todoitem'>
              {returnElement(item,index)}
            </div>
            <div>
            <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          </div>
        )}<br></br>
        <div className='inputs'>
        <input 
          type = "text"
          name = "text"
          id = "task"
          placeholder = "Type Tasks"
          className='inputs'
        /><br></br>
        <button onClick = {add}>Add Notes</button>
        </div>
      </div>
      </center>
    );
  }
  export default Todos;
  