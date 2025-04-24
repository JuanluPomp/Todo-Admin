import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    return NextResponse.json({
        message: 'Hola desde el get de hello',
        status: 200
    })
}

export async function POST (request: NextRequest){
    return NextResponse.json({
        message: 'desde el post de hello',
        status: 201
    })
}