
export const  deleteTodo = async (id: string) : Promise<{status: number, message: string}> => {
    try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
    
        if(res.status !== 200 ){
            throw new Error('La tarea no se pudo eliminar')
        }
        return{
            status: 200,
            message: res.message
        }
        } catch (error) {
            return{
                status: 200,
                message: error instanceof Error ? error.message : 'No se pudo eliminar la tarea '
            }
        }
}