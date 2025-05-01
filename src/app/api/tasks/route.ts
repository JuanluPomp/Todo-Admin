import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function GET (request: NextRequest){
    try {
        const {searchParams} = new URL(request.url)
        const take = searchParams.get('take') ?? 5
        const skip = searchParams.get('skip') ?? 0
        if(isNaN(+take)){
            return NextResponse.json({
                mesage: 'El dato take debe ser un numero', status: '400'
            })
        }
        if(isNaN(+skip)){
            return NextResponse.json({
                mesage: 'El dato skip debe ser un numero', status: '400'
            })
        }
        const tasks = await prisma.todo.findMany({
            take: +take,
            skip: +skip,
            orderBy: {
                id: 'desc'
            }
        })

        return NextResponse.json(tasks)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error instanceof Error ? error.message: 'No se encontraron tareas'})
    }
}

export const TodoSchema = z.object({
    description: z.string().optional(),
    status: z.boolean().optional()
})

export async function POST(request: NextRequest){
    try {
        const body = await request.json()
        const data = TodoSchema.safeParse(body)
        if(!data.success){
            return NextResponse.json({message: 'Los datos ingresados son invalidos', status: 400})
        }

        const task = await prisma.todo.create({
            data: {
                description: data.data.description!
            }
        })
        return NextResponse.json({
            message: 'Tarea creada con exito',
            task,
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            message: error instanceof Error ? error.message : 'No se pudo crear la tarea', 
            task: {},
            status: 500
        })
    }
}
