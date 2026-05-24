import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const author = await prisma.author.findUnique({
    where: { slug: params.slug },
    include: {
      articles: {
        include: { author: true },
        orderBy: { publishedAt: 'desc' },
      },
    },
  })

  if (!author) {
    return NextResponse.json({ error: 'Autor não encontrado.' }, { status: 404 })
  }

  return NextResponse.json(author)
}
