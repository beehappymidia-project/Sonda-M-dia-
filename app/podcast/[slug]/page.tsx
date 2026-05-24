import { redirect } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export default function PodcastSlugPage({ params }: Props) {
  redirect(`/artigo/${params.slug}`)
}
