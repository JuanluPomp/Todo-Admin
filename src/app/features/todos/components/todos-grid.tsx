"use client"
import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { changeTodoStatus } from '../helpers/change-todo-status'
import { deleteTodo } from '../helpers/delete-todo'
import { boolean } from 'zod'

type TodosGridProps = {
  todos: Todo[]
}

const sleep = (seconds : number = 0) : Promise<boolean> =>  {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })
}
export default function TodosGrid({ todos }: TodosGridProps) {
  const router = useRouter()
  const handleChangeStatus = async (id: string, status: boolean) => {
    // await sleep(2)
    await  changeTodoStatus(id, status)
    router.refresh()
  }
  const handleDeleteTodo = async (id: string) => {
    const res = await deleteTodo(id)
    if(res.status === 500){
      toast.error(res.message)
    }
    toast.success(res.message)
    router.refresh()
  }
  return (
    <div className=' bg-slate-100 grid grid-cols-3 gap-2 border border-slate-300 rounded-md shadow-lg p-6 mx-5'>
      {todos.map(todo => (
        <ul className=' bg-slate-300 border rounded-sm space-y-2 font-bold p-6 bg-gradient-to-r from-blue-500 to-sky-400 '>
          <h1 className=' text-center text-xl font-bold uppercase'>{todo.description}</h1>
          <li className=' flex justify-between items-center'>
            <div>
              Estatus: {' '}
              <button
                className={` ml-2 uppercase border-2 rounded-md bg-slate-100 px-1 cursor-pointer hover:bg-slate-200
                    ${todo.status ? 'text-green-500' : 'text-amber-500'}`}
                onClick={() => handleChangeStatus(todo.id, todo.status)}
              >
                {todo.status ? 'Realizada' : 'Pendiente'}
              </button>
            </div>
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              className=' bg-red-500 p-1 rounded-full cursor-pointer hover:bg-red-600 border-2 border-slate-200'>
              <IoTrashOutline className=' text-white text-3xl font-bold' />
            </button>

          </li>
          <li >
            <p>Fecha de creacion: <span className=' text-white'>{todo.createdAt.toDateString()}</span></p>
          </li>
        </ul>
      ))}
    </div>
  )
}
