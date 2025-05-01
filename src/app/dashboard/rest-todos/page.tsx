
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
