import { prisma } from '@/lib/db'
import SectionList from '@/components/SectionList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentário',
  description: 'Documentários jornalísticos sobre temas fundamentais do Brasil e do mundo.',
}

export const revalidate = 60

export default async function DocumentarioPage() {
  const articles = await prisma.article.findMany({
    where: { isVideo: true },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <SectionList
      title="Documentário"
      subtitle="Produções audiovisuais que aprofundam temas que o jornalismo diário não consegue alcançar."
      sectionLabel="Audiovisual"
      articles={articles as any}
      emptyMessage="Nenhum documentário publicado ainda."
    />
  )
}
