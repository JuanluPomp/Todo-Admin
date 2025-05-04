"use server"

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function sleep (s: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, s * 1000);
    })
}

export  async function toggleTodo(id: string, status: boolean): Promise<{status: number, updatedTodo?: Todo, message: string}>{
    try {
        const todo = await prisma.todo.findUnique({
            where: {id}
        })
        if(!todo){
            throw new Error('Todo no encontrado')
        }
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {status}
        })
        revalidatePath('/dashboard/server-todos')
        return {
            status: 500,
            updatedTodo,
            message: 'Todo actualizado'
        }
    } catch (error) {
        return {
            status: 500,
            updatedTodo: undefined,
            message: error instanceof Error ? error.message : 'No se pudo actualizar el todo'
        }
    }
}

export  async function addTodo(description: string): Promise<{status: number, message: string, todo?: Todo}> {
    try {
        const todo = await prisma.todo.create({
            data: {
                description
            }
        })
        if(!todo){
            throw new Error('Error al crear el todo')
        }
        revalidatePath('/dashboard/server-todos')
        return {
            status: 201,
            message: 'Todo creado con exito',
            todo
        }
    } catch (error) {
        return {
            status: 201,
            message: error instanceof Error ?error.message : 'Error a crerar el todo',
            todo: undefined
        }
    }
}

export async function deleteComletedTodos(): Promise<{status: number, response: number, message: string}>{
    try {
        const res = await prisma.todo.deleteMany({
            where: {
                status: true
            }
        })
        if(res.count<=0){
            throw new Error('No se ha eliminado ningun registro')
        }
        revalidatePath('/dashboard/server-todos')
        return{
            status: 200,
            response: res.count,
            message: `${res.count} todos han sido eliminados`
        }
        
    } catch (error) {
        return{
            status: 500,
            response: 0,
            message: error instanceof Error ? error.message : 'No se elimino ningun todo'
        }

    }
}