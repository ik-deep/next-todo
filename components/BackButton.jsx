import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function BackButton() {

    return (
        <>
            <Link href="/todoList" className="back-btn">
                <h1 className="font-bold absolute flex items-center gap-1 cursor-pointer" style={{ top: '-2px' }}>
                    <FaArrowLeftLong /> BACK
                </h1>
            </Link>
        </>
    )
}