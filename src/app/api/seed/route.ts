import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    await prisma.todo.deleteMany()


    const res = await prisma.todo.createMany({
        data: [
            {description: 'tarea 1', status: true},
            {description: 'tarea 2'},
            {description: 'tarea 3'},
            {description: 'tarea 4'},
            {description: 'tarea 5'},
        ]
    })
    return NextResponse.json({message: 'Seed executed', tasks: res})
}