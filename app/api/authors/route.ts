import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { articles: true } } },
    orderBy: { name: 'asc' },
  })
  return NextResponse.json(authors)
}
