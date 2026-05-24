import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function InvestigacaoSlugPage({ params }: Props) {
  redirect(`/artigo/${params.slug}`)
}
