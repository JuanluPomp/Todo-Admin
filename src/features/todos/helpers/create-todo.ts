
export const createTodo = async (description: string) : Promise<{status: number, message: string}>  => {
        try {
            const res = await fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify({description}),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            if(res.status !== 200){
                throw new Error(res.message)
            }
            return {
                status: res.status,
                message: res.message
            }
        } catch (error) {
            return {
                status: 500,
                message: error instanceof Error ? error.message : 'No se pudo crear el todo'
            }
        }
        
    }