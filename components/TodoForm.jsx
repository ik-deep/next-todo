'use client'

import { useState } from "react";
import '../styles/TodoFrom.css';
import addTodo from "@/public/functions/addTodo";
import BackButton from "./BackButton";

const textProperties = {
  'text_align': 'left',
  'font_weight': 'normal',
  'font_style': 'normal',
  'text_underline': 'none',
  'text_color': 'black',
  'list_type': 'disc'
}


export default function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description) {
      setError('All fields are required');
      return;
    }
    // Prepare the data to send
    await addTodo(title, description, textProperties.text_align, textProperties.font_weight, textProperties.font_style, textProperties.text_underline, textProperties.text_color, textProperties.list_type, setTitle, setDescription)
  }



  return (
    <form onSubmit={handleSubmit} >
      <BackButton />
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
          className="text-desc"
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