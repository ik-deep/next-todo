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
import { HexColorPicker } from "react-colorful";



export default function TodoDetails({ id }) {
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState();
    const [textAlign, setTextAlign] = useState(todo && todo.text_lign || 'left');
    const [textItalic, setTextItalic] = useState(todo && todo.font_style || 'normal');
    const [fontWeight, setFontWeight] = useState(todo && todo.font_weight || 'normal')
    const [textUnderLine, setTextUnderLine] = useState(todo && todo.text_underline || 'none')
    const [textColor, setTextColor] = useState(todo && todo.text_color || 'black');
    const [listType, setListType] = useState(todo && todo.list_type || 'disk');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const router = useRouter();

    useEffect(() => {
        todoById();
    }, [])


    const todoById = async () => {
        const { todo } = await getTodoById(id);
        setTodo(todo);
        setTitle(todo && todo.title)
        setDescription(todo && todo.description)
        setTextAlign(todo && todo.text_align);
        setTextItalic(todo && todo.font_style);
        setFontWeight(todo && todo.font_weight);
        setTextUnderLine(todo && todo.text_underline);
        setTextColor(todo && todo.text_color);
        setListType(todo && todo.list_type);

    }

    const handleClick = async () => {
        await removeTodo(id);
    }

    const editTodo = async () => {
        await updateTodo(title, description, textAlign, fontWeight, textItalic, textUnderLine, textColor, listType, id, router);
    }

    const handleFontWeight = () => {
        setFontWeight(fontWeight == 'normal' ? 'bold' : 'normal');
        console.log("clicked", fontWeight)
    }

    const handleTextDecoration = () => {
        setTextUnderLine(textUnderLine == 'none' ? 'underline' : 'none')
    }

    // const handleTextColor = () =>{
    //     setTextItalic(textColor=='black'?'italic':'non-italic')
    // }

    // const handleFonStyle = () =>{
    //     setTextItalic(fontStyle=='non-italic'?'italic':'non-italic')
    // }

    const handleFontStyle = () => {
        setTextItalic(textItalic == 'normal' ? 'italic' : 'normal')
    }

    const myStyleForTextArea = {
        color: textColor,
        fontWeight: fontWeight,
        textAlign: textAlign,
        fontStyle: textItalic,
        textDecoration: textUnderLine,
        listStyleType: listType

    }

    if (todo && todo.length == 0) {
        router.push('/todoForm');
    }

    return (

        <div >
            <BackButton />
            <div className=" flex justify-between items-center mb-3">
                <textarea type='text' id="title" className="text-4xl font-bold truncate title-detail" value={title} onChange={(e) => setTitle(e.target.value)} /><Link href={'/'}><RiDeleteBinLine className="text-2xl" onClick={handleClick} /></Link>
            </div>
            <div className='flex gap-2 cursor-pointer text-xl mb-2'>
                <RiBold onClick={handleFontWeight} className={fontWeight == 'bold' ? 'active-icon' : ''} />
                <GrItalic onClick={handleFontStyle} className={textItalic == 'italic' ? 'active-icon' : ''} />
                <MdFormatUnderlined onClick={handleTextDecoration} className={textUnderLine == 'underline' ? 'active-icon' : ''} />
                <MdOutlineFormatAlignCenter onClick={() => setTextAlign('center')} className={textAlign == 'center' ? 'active-icon' : ''} />
                <MdOutlineFormatAlignRight onClick={() => setTextAlign('right')} className={textAlign == 'right' ? 'active-icon' : ''} />
                <MdOutlineFormatAlignLeft onClick={() => setTextAlign('left')} className={textAlign == 'left' ? 'active-icon' : ''} />
                <MdOutlineFormatAlignJustify onClick={() => setTextAlign('justify')} className={textAlign == 'justify' ? 'active-icon' : ''} />
                <AiOutlineUnorderedList onClick={() => setListType('disc')} />
                <AiOutlineOrderedList onClick={() => setListType('decimal')} />
                <div className='relative'>
                    {
                        showColorPicker && <HexColorPicker className='color-picker' color={textColor} onChange={setTextColor} />
                    }<MdFormatColorFill color={textColor} background={textColor} onClick={() => setShowColorPicker(!showColorPicker)} />
                </div>


            </div>
            <hr className='mb-2 h-0.5 bg-black' />
            <textarea
                className={`p-2 focus:outline-0 text-desc`}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={myStyleForTextArea}
                onClick={() => setShowColorPicker(false)}
            ></textarea>
            <button className="submit-btn absolute left-4 bottom-4 p-2" onClick={editTodo} type="submit">Update Todo</button>
        </div>
    )
}