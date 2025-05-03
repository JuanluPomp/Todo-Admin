"use client"
import { Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useOptimistic } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { changeTodoStatus } from '../helpers/change-todo-status'
import { deleteTodo } from '../helpers/delete-todo'
import TodoItem from './todo-item'

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
    await toggleTodo(id, !status)
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
    <div className=' bg-white grid grid-cols-3 gap-2 border border-slate-300 rounded-md shadow-lg p-6 mx-5'>
      {todos.map(todo => (
        <TodoItem
        key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleChangeStatus={handleChangeStatus}
        />
      ))}
    </div>
  )
}
function toggleTodo(id: string, arg1: boolean) {
  throw new Error('Function not implemented.')
}

