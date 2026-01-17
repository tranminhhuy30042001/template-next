import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json([
    { id: 'p1', title: 'First post' },
    { id: 'p2', title: 'Second post' },
  ])
}
