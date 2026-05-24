import { prisma } from '@/lib/db'
import SectionList from '@/components/SectionList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Opinião',
  description: 'Análises, colunas e perspectivas dos colaboradores do SONDA MÍDIA.',
}

export const revalidate = 60

export default async function OpiniaoPage() {
  const articles = await prisma.article.findMany({
    where: { isOpinion: true },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <SectionList
      title="Opinião"
      subtitle="Análises críticas, colunas e perspectivas editoriais sobre os temas que moldam o debate público."
      sectionLabel="Colunistas & Análise"
      articles={articles as any}
      emptyMessage="Nenhuma coluna publicada ainda."
    />
  )
}
