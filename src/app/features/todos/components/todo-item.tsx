"use client"
import { Todo } from '@prisma/client'
import React, { startTransition, useOptimistic } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { boolean } from 'zod'
import { toggleTodo } from '../actions/todo-actions'


type TodoItemProps = {
    todo: Todo,
    handleDeleteTodo: (id: string) => void,
    handleChangeStatus: (id: string, status: boolean) => void
}

export default function TodoItem({todo, handleDeleteTodo, handleChangeStatus}: TodoItemProps) {
    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
        todo,
        (state, newStatusValue: boolean) => ({...state, status: newStatusValue})
    )
    const handleToggleTodo = async  ()=> {
        try {
          startTransition(() => toggleTodoOptimistic(!todoOptimistic.status))  
          await toggleTodo(todoOptimistic.id, !todoOptimistic.status)
        } catch (error) {
          startTransition(() => toggleTodoOptimistic(!todoOptimistic.status))
        }
    }
  return (
    <ul className=' bg-slate-300 border rounded-sm space-y-2 font-bold p-6 bg-gradient-to-r from-blue-500 to-sky-400 '>
          <h1 className=' text-center text-xl font-bold uppercase'>{todoOptimistic.description}</h1>
          <li className=' flex justify-between items-center'>
            <div>
              Estatus: {' '}
              <button
                className={` ml-2 uppercase border-2 rounded-md bg-slate-100 px-1 cursor-pointer hover:bg-slate-200
                    ${todoOptimistic.status ? 'text-green-500' : 'text-amber-500'}`}
                onClick={handleToggleTodo}
              >
                {todoOptimistic.status ? 'Realizada' : 'Pendiente'}
              </button>
            </div>
            <button 
              onClick={() => handleDeleteTodo(todoOptimistic.id)}
              className=' bg-red-500 p-1 rounded-full cursor-pointer hover:bg-red-600 border-2 border-slate-200'>
              <IoTrashOutline className=' text-white text-3xl font-bold' />
            </button>

          </li>
          <li >
            <p>Fecha de creacion: <span className=' text-white'>{todo.createdAt.toDateString()}</span></p>
          </li>
        </ul>
  )
}

