import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { author: true },
  })

  if (!article) {
    return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
  }

  return NextResponse.json(article)
}
