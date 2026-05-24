import { prisma } from '@/lib/db'
import SectionList from '@/components/SectionList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investigação',
  description: 'Reportagens investigativas de profundidade sobre poder, corrupção e sociedade.',
}

export const revalidate = 60

export default async function InvestigacaoPage() {
  const articles = await prisma.article.findMany({
    where: { section: 'Investigação' },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <SectionList
      title="Investigação"
      subtitle="Reportagens de fôlego, baseadas em documentos, fontes e dados. Jornalismo que cobra tempo e rigor."
      sectionLabel="Jornalismo de Profundidade"
      articles={articles as any}
      emptyMessage="Nenhuma investigação publicada ainda."
    />
  )
}
