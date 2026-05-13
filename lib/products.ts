export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  colors: string[]
  pattern: string
  accentColor: string
  popular?: boolean
}

// This is the source of truth for all products.
// All UI to display products should pull from this array.
// IDs passed to the checkout session should be the same as IDs from this array.
export const PRODUCTS: Product[] = [
  {
    id: 'rainbow-rips',
    name: 'Rainbow Rips',
    description: 'Vibrant rainbow stripes that make every rip a celebration. Perfect for sensory play.',
    priceInCents: 1800, // $18.00
    colors: ['#E8735A', '#F7DC6F', '#77DD77', '#4ECDC4', '#B19CD9', '#FF9AA2'],
    pattern: 'stripes',
    accentColor: '#E8735A',
    popular: true,
  },
  {
    id: 'dino-dots',
    name: 'Dino Dots',
    description: 'Playful polka dots in prehistoric colors. Little paleontologists will love these.',
    priceInCents: 1800, // $18.00
    colors: ['#556B2F', '#8FBC8F', '#D2691E', '#DEB887', '#6B8E23', '#F4A460'],
    pattern: 'dots',
    accentColor: '#6B8E23',
  },
  {
    id: 'berry-stripes',
    name: 'Berry Stripes',
    description: 'Sweet berry-inspired hues with bold stripes. Fruity fun for tiny hands.',
    priceInCents: 1800, // $18.00
    colors: ['#C71585', '#DB7093', '#FFB6C1', '#8B008B', '#DA70D6', '#FF69B4'],
    pattern: 'stripes',
    accentColor: '#C71585',
  },
  {
    id: 'sunny-shapes',
    name: 'Sunny Shapes',
    description: 'Bright sunshine yellows and oranges with geometric patterns. Happy vibes only.',
    priceInCents: 1800, // $18.00
    colors: ['#FFD700', '#FFA500', '#FF8C00', '#FFEC8B', '#F0E68C', '#FFE4B5'],
    pattern: 'shapes',
    accentColor: '#FFA500',
  },
  {
    id: 'starter-pack',
    name: 'Starter Pack',
    description: 'Get one of each pattern! The perfect introduction to Toddler Tape with all 4 packs included.',
    priceInCents: 5999, // $59.99
    colors: ['#E8735A', '#6B8E23', '#C71585', '#FFA500', '#4ECDC4', '#B19CD9'],
    pattern: 'mixed',
    accentColor: '#E8735A',
    popular: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(0)}`
}
