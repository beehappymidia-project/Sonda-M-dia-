import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function GaleriaSlugPage({ params }: Props) {
  redirect(`/artigo/${params.slug}`)
}
