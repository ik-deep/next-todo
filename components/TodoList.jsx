'use client'

import { useEffect, useState } from 'react';
import './todo.css';
import { FiFilePlus } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import Link from 'next/link';
import getAllTodoList from '@/public/functions/getAllTodoList';
import PaginationComponent from './PaginationComponent';
import TodoListComponent from './TodoListComponent';



export default function TodoList() {
    const [displaySearch, setDisplaySearch] = useState(false);
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [paginatedTodos, SetPaginatedTodos] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        todoData();
    }, [])

    const handlePageChange = (even, value) => {
        setPage(value);
        var previusIndex = (value - 1) * 5;
        SetPaginatedTodos(filteredData.slice(previusIndex, previusIndex + 5));
    }


    async function todoData() {
        const { todos } = await getAllTodoList();
        SetPaginatedTodos(todos.slice(0, 5));
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
        const newFilteredData = todos && todos.filter(item =>
            item.title.toLowerCase().includes(lowercasedTerm) || item.description.toLowerCase().includes(lowercasedTerm)
        );
        // console.log(newFilteredData)
        setFilteredData(newFilteredData);
    };

    const handleSerchBox = () => {
        setDisplaySearch(prev => !prev);
    }



    return (
        <>
            <div className='container relative'>
                <div className='mb-3 flex justify-between'>
                    <Link href={"/todoForm"}>
                        <button className='text-white bg-black flex rounded-lg p-2 gap-2  items-center'>
                            <FiFilePlus />  <h2>Add Todo </h2>
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

                <TodoListComponent todoData={displaySearch ? filteredData : paginatedTodos} />
                <div className='absolute flex justify-center items-center bottom-0' style={{ width: '100%', marginBottom: '-20px' }}>
                    {!displaySearch && <PaginationComponent page={page} handlePageChange={handlePageChange} count={todos.length <= 5 ? 1 : (Math.round(todos.length / 5)) + 1} />}
                </div>
            </div>
        </>
    )
}