import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function DocumentarioSlugPage({ params }: Props) {
  redirect(`/artigo/${params.slug}`)
}
