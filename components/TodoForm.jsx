'use client'

import { useEffect, useState } from "react";
import '../styles/TodoFrom.css';
import { useRouter } from "next/navigation";
import addTodo from "@/public/functions/addTodo";
import BackButton from "./BackButton";
import Link from "next/link";

const textProperties = {
  'text_align':'text-left',
  'font_weight':'font-normal',
  'font_style':'non-italic',
  'text_underline':'no-underLine',
  'text_color':'black',
  'list_type':'list-disc'
}
 

export default function TodoForm(){
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState();
  const [error, setError] = useState('');

  const handleResize = () =>{
    setShow(window.innerWidth);
}

  useEffect (()=>{ 
    handleResize();
  },[])

  window.addEventListener("resize", handleResize);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description) {
      setError('All fields are required');
      return;
    }
    // Prepare the data to send
      await addTodo(title,description,textProperties.text_align,textProperties.font_weight,textProperties.font_style,textProperties.text_underline,textProperties.text_color,textProperties.list_type,setTitle,setDescription)
  }
  


    return (
        <form  onSubmit={handleSubmit} >
           {
                show && show<1000 && (  <BackButton />
                )
            }
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-filds"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <div >{error}</div>}
        <button className="submit-btn" type="submit">Add Todo</button>
      </form>
    )
}