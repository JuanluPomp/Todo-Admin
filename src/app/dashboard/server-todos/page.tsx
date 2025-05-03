export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NewTodo } from '@/app/features/todos/components/new-todo'
import TodosGrid from '@/app/features/todos/components/todos-grid'
import prisma from '@/lib/prisma'
import React from 'react'

export default async function ServerTodos() {
    const todos = await prisma.todo.findMany({
        orderBy: {
          description: 'asc'
        }
      })
  return (
    <div className=' container mx-auto border-2 border-slate-300 p-4 rounded-md bg-slate-100 shadow-2xl'>
          <h1 className=' text-center text-3xl font-bold'>Rest Todos Page</h1>
          <div className=' flex justify-center items-center mx-5 p-10'>
            <NewTodo/>
          </div>
          {todos.length ? (
             <TodosGrid
             todos={todos}
           />
          ) : (
            <p>Todavia no existen todos. <span className=' text-blue-500'>Agregue uno en el formulario de arriba</span></p>
          ) }
          
        </div>
  )
}
