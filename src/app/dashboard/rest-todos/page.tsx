export const dynamic = 'force-dynamic'
export const revalidate = 0
// esto actualiza la data que se renderiza y obtiene de lugares externos y que 
//al ser modificado desde el exterior, se actualiza en automatico sin tener que recargar la pagina 

import { NewTodo } from '@/app/features/todos/components/new-todo'
import TodosGrid from '@/app/features/todos/components/todos-grid'
import prisma from '@/lib/prisma'
import { title } from 'process'

export const metadata = {
  title: 'Rest Todos',
  description: 'Rest todos pages with actions'
}

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({
    orderBy: {
      description: 'asc'
    }
  })

  // useEffect(() => {
  //   fetch('/api/tasks')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  // }, [])
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
