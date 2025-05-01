import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { NextResponse } from "next/server"

export interface DeleteResponse {
    status: number;
    message: string;
    todo: number;
  }

export async function DELETE(): Promise<NextResponse>{
    try {
        const completedExist = await prisma.todo.findFirst({
            where: {status: true}
        })
        if(!completedExist){
            throw new Error('todavia no hay tareas completadas')
        }
        const todo = await prisma.todo.deleteMany({
            where: {
                status: true
            }
        })
        console.log()
        return NextResponse.json<DeleteResponse>({
            status: 200,
            message : 'Tareas completadas eliminadas',
            todo: todo.count
        })
    } catch (error) {
        return NextResponse.json<DeleteResponse>(({
            status: 500,
            message: error instanceof Error ? error.message : 'No hay tareas completadas',
            todo: 0
        }))
    }
}