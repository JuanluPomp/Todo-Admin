"use client"

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { createTodo } from "../helpers/create-todo";
import { promise } from "zod";
import { resolve } from "path";
import { addTodo, deleteComletedTodos } from "../actions/todo-actions";

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })
}

export const NewTodo =  () => { 
    const router = useRouter()
    const [description, setDescription] = useState('')
    const handleCreateTodo = async (e: FormEvent<HTMLFormElement>)  => {
        e.preventDefault()
        const res = await addTodo(description)
        if(res.status !== 201){
          toast.error(res.message)
          return
        }
        toast.success(res.message)
        setDescription('')
    }
    const handleDeleteComletedTodos = async () => {

      const res = await deleteComletedTodos()
      if(res.status !== 200){
        toast.warn(res.message)
        return
      }
      toast.success(res.message)
    }
  return (
    <form  className='flex w-full' onSubmit={(e) => handleCreateTodo(e)}>
      <input type="text"
        className="w-6/12 bg-white -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="Agregue aqui un nuevo todo"
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        onClick={ handleDeleteComletedTodos}
        type='button' className="flex items-center justify-center rounded ml-4 bg-red-400 p-2 text-white hover:bg-red-700 transition-all cursor-pointer font-bold">
        <IoTrashOutline
          size={26}
        />
        Delete Completeds
      </button>


    </form>
  )
}