"use client"
import { useEffect, useState } from 'react';
import getTodoById from '@/public/functions/getTodoById';
import '../styles/TodoFrom.css'
import { useRouter } from "next/navigation";
import removeTodo from '@/public/functions/removeTodo'
import { RiDeleteBinLine } from 'react-icons/ri';
import { RiBold } from "react-icons/ri";
import { GrItalic } from "react-icons/gr";
import { MdFormatUnderlined } from "react-icons/md";
import { MdOutlineFormatAlignCenter } from "react-icons/md";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdFormatColorFill } from "react-icons/md";
import updateTodo from '@/public/functions/updateTodo';
import BackButton from './BackButton';
import Link from 'next/link';


export default function TodoDetails({ id }) {
    const [description,setDescription] = useState('')
    const [title,setTitle] = useState('');
    const [todo, setTodo] = useState([{title:"Dummy",description:"Dummy"}]);
    const [show,setShow] = useState();
    const [textAlign,setTextAlign] = useState(todo && todo.text_lign);
    const [textItalic,setTextItalic] = useState(todo && todo.text_italic);
    const [fontWeight,setFontWeight] = useState(todo && todo.font_weight)
    const [textUnderLine,setTextUnderLine] = useState(todo && todo.text_underline)
    const [textColor,setTextColor] =useState(todo && todo.text_color);
    const [listType,setListType] = useState(todo && todo.list_type);
    const router = useRouter();

    useEffect(() => {
        todoById();
        handleResize();
    }, [])

    const handleResize = () =>{
         setShow(window.innerWidth);
    }

    const todoById = async () => {
        const { todo } = await getTodoById(id);
        setTodo(todo);
        setTitle(todo && todo.title)
        setDescription(todo && todo.description)
        setTextAlign(todo && todo.text_align);
        setTextItalic(todo && todo.text_italic);
        setFontWeight(todo &&  todo.font_weight);
        setTextUnderLine(todo && todo.text_underline);
        setTextColor(todo && todo.text_color);
        setListType(todo && todo.list_type);
    }

    const handleClick=async ()=>{
        await removeTodo(id);
    }

    const editTodo =async () =>{
          await updateTodo(title,description,textAlign,fontWeight,textItalic,textUnderLine,textColor,listType,id,router);
    }

    const myStyleForTextArea = {
        color:textColor,
        fontWeight:fontWeight,
        textAlign:textAlign,
        fontStyle:textItalic,
        textDecoration:textUnderLine,
        listStyleType:listType
    }

// window.addEventListener("resize", handleResize);
    return (
        <div>
            {
                show && show<1000 && (
                    <BackButton/>
                )
            }
            <div className=" flex justify-between items-center">
                <h1 className="text-4xl font-bold truncate title-detail">{title}</h1> <Link href={'/todoList'}><RiDeleteBinLine className="text-2xl" onClick={handleClick}/></Link>
            </div>
            <div className='flex gap-2 cursor-pointer text-xl'>
                <RiBold onClick={() => setFontWeight('font-bold')} />
                <GrItalic onClick={() => setTextItalic('italic')} />
                <MdFormatUnderlined onClick={() => setTextUnderLine('underline')} />
                <MdOutlineFormatAlignCenter onClick={() => setTextAlign('text-center')} />
                <MdOutlineFormatAlignRight onClick={() => setTextAlign('text-right')} />
                <MdOutlineFormatAlignLeft onClick={() => setTextAlign('text-left')} />
                <MdOutlineFormatAlignJustify onClick={() => setTextAlign('text-justify')} />
                <AiOutlineUnorderedList onClick={()=> setListType('list-disc')}/>
                <AiOutlineOrderedList onClick={()=> setListType('list-decimal')}/>
                <div className='relative'>
                    <input type='color' className='absolute opacity-0' value={'white'} onChange={(e)=> setTextColor(e.target.value)}/><MdFormatColorFill />
                </div>
               
            </div>
            <hr className='mb-2 h-0.5 bg-black'/>
            <textarea
                className={`p-2 focus:outline-0 ${textAlign} ${textItalic} ${fontWeight} ${textUnderLine} text-[${textColor}] list-outside`}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={myStyleForTextArea}
            ></textarea>
            <button className="submit-btn absolute left-4 bottom-4 p-2" onClick={editTodo} type="submit">Update Todo</button>
        </div>
    )
}