

export async function changeTodoStatus (id: string, status: boolean): Promise<{status: number, message: string}> {
    const body = { status: !status }
    try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          'headers': {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        if (!res) {
          throw new Error('No se pudo actualizar el status del todo')
        }
        return {
            status: 200,
            message: res.message
        }
      } catch (error) {
        return {
            status: 200,
            message: error instanceof Error ? error.message : 'No se pudo actualizar la tarea'
        }
      }
}