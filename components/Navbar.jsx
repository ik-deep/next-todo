import Link from "next/link";


export default function Navbar() {
    return (
        <Link href={'/'}>
            <div className="flex items-center bg-white p-2">
               <img src="https://cdn-icons-png.flaticon.com/512/4697/4697260.png" alt="react logo" style={{ width: '40px',  }}/> <h1 className="font-bold text-2xl ml-4">TODO</h1>
            </div>
        </Link>

    )
}