'use client'

import { useEffect, useState } from 'react';
import './todo.css';
import { FiFilePlus } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { GoSearch } from "react-icons/go";
import Link from 'next/link';
import getAllTodoList from '@/public/functions/getAllTodoList';



export default function TodoList() {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        todoData();
    }, [])


    async function todoData() {
        const { todos } = await getAllTodoList();
        setTodos(todos);
        setFilteredData(todos);
    }
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        filterData(value);
    };

    const filterData = (term) => {
        const lowercasedTerm = term.toLowerCase();
        const newFilteredData =todos && todos.filter(item =>
            item.title.toLowerCase().includes(lowercasedTerm) || item.description.toLowerCase().includes(lowercasedTerm)
        );
        console.log(newFilteredData)
        setFilteredData(newFilteredData);
    };

    const handleSerchBox = () => {
        setDisplaySearch(prev => !prev);
    }



    return (
        <>
            <div className='container'>
                <div className='mb-3 flex justify-between'>
                <Link href={"/todoForm"}>
                    <button className='text-white bg-black flex rounded-lg p-2 gap-2  items-center'>
                        <FiFilePlus/>  <h2>Add Todo </h2>
                    </button>
                    </Link>


                    <button className='search-class flex rounded-lg p-2  items-center' >
                        <input className='focus:outline-0 ml-2' type="text"
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Search..." 
                            style={{ display: displaySearch ? 'block' : 'none' }} 
                            ></input><GoSearch className="text-2xl" onClick={handleSerchBox} />
                    </button>
                </div>

                <ul className='todo-list'>
                    {
                        todos && todos.length != 0 ? filteredData.map((item) => {
                            return (<>
                                <Link href={`/editDetails/${item._id}`}>
                                    <li key={item._id} className='li-tag'>
                                        <div className='flex justify-between'>
                                            <h3 className='todo-title truncate'>{item.title}</h3>
                                            <p className='todo-description'>{item.createdAt.slice(0, 10)}</p>
                                        </div>
                                        <p className='todo-description truncate'>{item.description}</p>
                                    </li>
                                </Link>
                            </>)
                        })
                        :(
                            < div className='text-l p-2 mt-5 flex justify-center items-center bg-white rounded-lg'>
                             <ImFilesEmpty className='text-2xl'/> <h1 className='text-center'>Todo list is empty! Please add new todo.</h1>
                            </div>
                         
                        )
                    }

                </ul>
            </div>
        </>
    )
}