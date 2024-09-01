import Link from "next/link"
import { ImFilesEmpty } from "react-icons/im"


export default function TodoListComponent({ todoData }) {

    return (
        <>
            <ul className='todo-list' key={"test"}>
                {
                    todoData && todoData.length ? todoData.map((item) => {
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
                    }) : (
                        < div className='text-l p-2 mt-5 flex justify-center items-center bg-white rounded-lg'>
                            <ImFilesEmpty className='text-2xl' /> <h1 className='text-center'>Todo list is empty! Please add new todo.</h1>
                        </div>

                    )
                }
            </ul>
        </>
    )
}