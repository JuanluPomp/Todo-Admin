import prisma from "@/lib/prisma";
import { Param } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { TodoSchema } from "../route";

export async function GET(request: NextRequest, {params}: {params: Promise<{id: string}>} ){
    try {
        const {id} = await params
        console.log(id)
        const task = await prisma.todo.findUnique({
            where: {
                id
            }
        })
        if(!task){
            return NextResponse.json({
                message: 'No se encontro la tarea con dicho id', status: 404
            })
        }
        return NextResponse.json({
            message: 'Tarea encontrada', task,
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: error instanceof Error ? error.message :'No se encontro la tarea',
            status: 404
        })
    }
}


export async function PUT (request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        const {id} = await params
        const data = await request.json()
        const res = TodoSchema.safeParse(data)
        if(!res.success){
            return NextResponse.json(res.error.issues.map(issue => issue.message)) 
        }
        const task = await prisma.todo.update({
            where: {
                id
            },
            data: res.data!
        })
        return NextResponse.json({
            status: 200,
            message: 'Tarea actualizada',
            task
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            mesage: error instanceof Error ? error.message : 'No se pudo actualizar la tarea',
            task: {}
        })
    }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        const {id} = await params
        const task = await prisma.todo.delete({
            where: {
                id
            }
        })
        return NextResponse.json({
            status: 200,
            message: `Tarea con el id: ${id} eliminada.`,
            task
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error instanceof Error ? error.message : 'La tarea no se ha podido eliminar'
        })
    }
}

