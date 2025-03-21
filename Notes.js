import React, {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import HighlightWithinTextarea from 'react-highlight-within-textarea';

const Notes = () => {
  const [notes,setNotes] = useState([]);
    const [updatedNotes, setUpdated] = useState([]);
    const [search,setSearch] = useState("");
    const [state,setState] = useState(false);
    const [noSearch,setNoSearch] = useState("");
  
    useEffect(() => searchItem(search),[search,state]);
    const add = () => {
      var title = document.getElementById("title");
      var content = document.getElementById("content");
      if(title.value=="" && content.value=="") {
        alert("Either of title or content should be given");
      }
      else{
      const p = {
        id:uuidv4(),
        title:title.value,
        content: content.value
        };
      setNotes([...notes,p]);
      setUpdated([...updatedNotes,p]);
      title.value = ""
      content.value="";
    }
    }
    const deleteItem = (index) => {
      const k = [...notes];
      let index1 = index
      for(let i in k){
        if(k[i].id===updatedNotes[index].id) index1 = i
      }
      k.splice(index1,1);
      setNotes(k);
      setState(!state);
    }
    const editItem = (index) => {
      var a = prompt("Enter your title");
      var b = prompt("Enter your content");
      const k = [...notes];
      let index1 = index;
      for(let i in k){
        if(k[i].id===updatedNotes[index].id)
            index1 = i
      }
      if(a==="" || a==null) a = notes[index1].title;
      if(b==="" || b==null) b = notes[index1].content;
      k[index1].title = a;
      k[index1].content = b;
      setNotes(k);
      setState(!state);
    }

    const searchItem = (data) => {
      if(data!=="" && data!==null){
        const k = notes.filter(item => item.title.toLowerCase().includes(data.toLowerCase()));
        if(k.length==0) setNoSearch("No Such item has found");
        else setNoSearch("");
        setUpdated(k);
      }
      else {
        setUpdated(notes);
        setNoSearch("");
        setSearch(null);
      }
    }
  
    const handleSearch = event => {
      setSearch(event.target.value);
    }
  
    const returnElement = (item,index) => {
      const changetitle = (value) => {
        const k = [...notes];
        k[index].title = value;
        setNotes(k);
        setUpdated(k);
      }
      const changecontent = (value) => {
        const p = [...notes];
        p[index].content = value;
        setNotes(p);
        setUpdated(p);
      }
  
      return(
          <div className='item'>
            <div className='todo-title'>
            <HighlightWithinTextarea  highlight={search} value={item.title} placeholder='Title' onChange={changetitle}/>
            </div>
            <hr></hr>
            <div className='todo-content'>
            <HighlightWithinTextarea  highlight={search} value={item.content} placeholder='' onChange={changecontent}/>
            </div>
          </div>
      );
  
    }

    return (
      <center><div className="todo-list">
        <h1>My Notes</h1>
        <input
          type='text'
          value={search}
          placeholder="Search..."
          id = "search"
          onChange={handleSearch}
        ></input><br></br>
        <p style={{color:'red'}}>{noSearch}</p>
        {updatedNotes.map((item,index) => (
          <div className ="todo-item">
            {returnElement(item,index)}
            <div>
            <button onClick={() => deleteItem(index)}>Delete</button>
            </div>
          </div>
        ))
        }<br></br>
        <div className='inputdiv'>
        <input 
          type = "text"
          name = "title"
          id = "title"
          placeholder = "Enter Title"
          className='inputs'
        /><br></br>
        <input 
          type = "text"
          name = "content"
          id = "content"
          placeholder = "Enter Content"
          className='inputs'
        /><br></br>
        <button onClick = {add}>Add Notes</button>
        </div>
      </div>
      </center>
    );
};

export default Notes;