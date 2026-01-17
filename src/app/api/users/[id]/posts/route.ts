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
// src/app/api/users/[id]/route.ts
// export async function GET() {
//   return new Response(
//     JSON.stringify({ message: 'User not found 1' }),
//     { status: 200 }
//   )
// }
