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
    <div className=' container mx-auto'>
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
