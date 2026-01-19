import { NextResponse } from 'next/server'


export async function GET() {
  return NextResponse.json({})
}

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json(body, { status: 201 })
}

export async function PUT(req: Request) {
  const body = await req.json()
  return NextResponse.json(body)
}
