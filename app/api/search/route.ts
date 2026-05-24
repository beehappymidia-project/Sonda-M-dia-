import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim() || ''

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], query: q })
  }

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { lead: { contains: q } },
        { body: { contains: q } },
        { tags: { contains: q } },
        { section: { contains: q } },
      ],
    },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  })

  return NextResponse.json({ results: articles, query: q })
}
