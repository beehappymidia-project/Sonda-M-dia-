import { prisma } from '@/lib/db'
import SectionList from '@/components/SectionList'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const SECTION_MAP: Record<string, { title: string; subtitle: string; label: string; dbSection: string }> = {
  politica: { title: 'Política', subtitle: 'Cobertura política nacional e regional.', label: 'Política', dbSection: 'Política' },
  economia: { title: 'Economia', subtitle: 'Análises económicas, mercados e desenvolvimento.', label: 'Economia', dbSection: 'Economia' },
  sociedade: { title: 'Sociedade', subtitle: 'Questões sociais, direitos e comunidades.', label: 'Sociedade', dbSection: 'Sociedade' },
  internacional: { title: 'Internacional', subtitle: 'Geopolítica africana e global.', label: 'Internacional', dbSection: 'Internacional' },
  multimidia: { title: 'Multimédia', subtitle: 'Vídeos, galerias e conteúdo audiovisual.', label: 'Multimédia', dbSection: 'Multimédia' },
  cultura: { title: 'Cultura', subtitle: 'Arte, música, cinema e identidade.', label: 'Cultura', dbSection: 'Cultura' },
}

interface Props {
  params: { section: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = SECTION_MAP[params.section.toLowerCase()]
  if (!s) return { title: 'Secção' }
  return { title: s.title, description: s.subtitle }
}

export const revalidate = 60

export default async function SectionPage({ params }: Props) {
  const key = params.section.toLowerCase()
  const s = SECTION_MAP[key]
  if (!s) notFound()

  const articles = await prisma.article.findMany({
    where: { section: s.dbSection },
    include: { author: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <SectionList
      title={s.title}
      subtitle={s.subtitle}
      sectionLabel={s.label}
      articles={articles as any}
      emptyMessage={`Nenhum artigo publicado em ${s.title} ainda.`}
    />
  )
}
