// Curated Unsplash photo mapping for article sections
// Using reliable Unsplash source URLs with specific photo IDs

const PHOTO_MAP: Record<string, { lg: string; md: string }> = {
  protest: {
    lg: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop',
  },
  politics: {
    lg: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
  },
  economy: {
    lg: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
  },
  environment: {
    lg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
  },
  tech: {
    lg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  },
  culture: {
    lg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  },
  interview: {
    lg: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop',
  },
  documentary: {
    lg: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop',
  },
  podcast: {
    lg: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&h=400&fit=crop',
  },
  gallery: {
    lg: 'https://images.unsplash.com/photo-1500751827005-019fe1af3924?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1500751827005-019fe1af3924?w=600&h=400&fit=crop',
  },
  opinion: {
    lg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
  },
  corruption: {
    lg: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=600&h=400&fit=crop',
  },
  city: {
    lg: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop',
  },
  court: {
    lg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
  },
  health: {
    lg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop',
    md: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
  },
}

export function getPhotoUrl(style: string, size: 'lg' | 'md' = 'md'): string {
  const entry = PHOTO_MAP[style] || PHOTO_MAP['politics']
  return entry[size]
}
