"use client"

import BackButton from "@/components/BackButton";
import { useEffect, useState } from "react";



export default function Home() {
  const [show, setShow] = useState();

  const handleResize = () => {
    setShow(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
  }, [])

  // window.addEventListener("resize", handleResize);
  return (
    <>
      
      <div className="info-page  text-l details todo-details-media bg-white rounded-lg p-5 flex justify-center mt-5 align-center">
      <BackButton/>
        <h4 className="font-bold">Add new TODO and click on the left todo list to see the Todo Details here</h4>
      </div>
    </>



  );
}
