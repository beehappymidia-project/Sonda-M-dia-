import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section')
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const skip = (page - 1) * limit

  const where: any = {}
  if (section) where.section = section

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.article.count({ where }),
  ])

  return NextResponse.json({
    articles,
    total,
    page,
    pages: Math.ceil(total / limit),
  })
}
