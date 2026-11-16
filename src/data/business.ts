export type MenuItem = {
  name: string
  description: string
  image: string
}

export const business = {
  name: 'Bao & Co.',
  positioning: "Pampanga's first cuapao-focused stall",
  address: 'Pamanang Lakad Food Lane, The Heritage District, Santo Entierro Street, Angeles City',
  regularHours: 'Saturday–Sunday · 4:00 PM–12:00 midnight',
  hoursNote: 'Follow social media for temporary schedule updates.',
  locationVideo: {
    src: '/assets/videos/where-to-find.mp4',
    title: 'Video guide to finding Bao & Co. in the Heritage District',
  },
  delivery: {
    image: '/assets/promotions/6.jpg',
    weekdayHours: 'Monday–Friday · 10:00 AM–6:00 PM',
    weekendHours: 'Saturday–Sunday · 4:00 PM–12:00 midnight',
  },
  storyTrivia:
    'Cuapao traces its roots to Fujian, China, where it is traditionally known as gua bao (or koah-pau). Introduced to the Philippines by Hokkien Chinese immigrants, it has since evolved to embrace the Filipino palate. At Bao & Co., we honor this heritage by serving freshly steamed baos that celebrate tradition while bringing bold, modern flavors to every bite.',
  mapsUrl:
    'https://www.google.com/maps/place/Bao+%26+Co.+Food+Stall+(Pampanga%E2%80%99s+First+Cuapao-Focused+Stall)/@15.1357578,120.5912814,17z/data=!3m1!4b1!4m6!3m5!1s0x3396f35660b264d5:0xc69ee61e7519f7f0!8m2!3d15.1357578!4d120.5912814!16s%2Fg%2F11zwvr02jj?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61591572479570',
    instagram: 'https://www.instagram.com/baoandcoph/',
    tiktok: 'https://www.tiktok.com/@baoandcoph',
  },
  contact: {
    label: 'Message us on Facebook',
    url: 'https://www.facebook.com/profile.php?id=61591572479570',
  },
} as const

export const menuItems: MenuItem[] = [
  {
    name: 'Chinese Style Pork Bao',
    description:
      'Slow-braised pork simmered in a rich Chinese-style sauce with a savory, sweet, and umami finish.',
    image: '/assets/products/chinese-style-pork-bao.png',
  },
  {
    name: 'Korean Samgyeopsal Bao',
    description:
      'Tender pork belly with Korean-inspired seasonings and a subtle hint of garlic.',
    image: '/assets/products/korean-samgyeopsal-bao.png',
  },
  {
    name: 'Filipino Chicken Adobo Liver Bao',
    description:
      'Classic Filipino chicken adobo paired with creamy chicken liver for a bold, familiar bite.',
    image: '/assets/products/filipino-chicken-adobo-liver-bao.png',
  },
]

export const combos = [
  { label: '1 bao', price: '₱99' },
  { label: '2 baos', price: '₱159' },
  { label: '3 baos', price: '₱239' },
] as const

type Review = {
  source: 'Facebook' | 'Google'
  author: string
  quote: string
  image?: string
  imageAlt?: string
}

export const reviews: Review[] = [
  {
    source: 'Google',
    author: 'Catherine V.',
    quote:
      'Kind owners, good food, and great service! Budget-friendly and definitely worth the money. I was never a fan of baos until I tried theirs! Will definitely order again!',
    image: '/assets/reviews/customer-bao-box.jpg',
    imageAlt: 'Bao & Co. baos served in an eco-friendly food box',
  },
  {
    source: 'Google',
    author: 'Estela M.',
    quote:
      'The bao is soft and really rich in flavor. Even though the food came home cold, it was still delicious. The seller was also approachable and friendly.',
    image: '/assets/reviews/customer-bao-delivery.jpg',
    imageAlt: 'Bao & Co. baos ready for takeout',
  },
  {
    source: 'Google',
    author: 'PG G.',
    quote:
      'This is our go-to food stall at Kulitan Flea Market in front of Holy Rosary Parish Church, Angeles City. Their cuapao is very delicious! You will definitely come back.',
    image: '/assets/reviews/customer-bao-spread.jpg',
    imageAlt: 'Several Bao & Co. orders arranged in food containers',
  },
  {
    source: 'Google',
    author: 'Anjo A.',
    quote: 'GOOD FOOD WORTH IT TO BUY ❤️',
  },
  {
    source: 'Google',
    author: 'Gabrielle L.',
    quote: 'This is so delicious!!! 💗💗💗 this is my favorite, super duper delicious!',
  },
  {
    source: 'Facebook',
    author: 'JBNTv',
    quote:
      'Highly recommended, the food are so great, authentic Pao, and the staff are so accommodating.',
  },
  {
    source: 'Facebook',
    author: 'Ejhay E.',
    quote: 'Sobrang sarap!',
  },
  {
    source: 'Facebook',
    author: 'Pau L.',
    quote: 'Super sarap! Favorite namin yung chicken liver.',
  },
] as const

export const galleryItems = [
  {
    src: '/assets/gallery/14.jpg',
    alt: 'Customer sharing a Bao & Co. cuapao at a weekend market',
    type: 'image',
    className: 'gallery-item--wide',
  },
  {
    src: '/assets/gallery/18.jpg',
    alt: 'Friends enjoying Bao & Co. at the evening market',
    type: 'image',
    className: 'gallery-item--tall',
  },
  {
    src: '/assets/gallery/16.jpg',
    alt: 'Customer ordering from the Bao & Co. market stall',
    type: 'image',
    className: '',
  },
  {
    src: '/assets/videos/customer-review.mp4',
    alt: 'Content creator Marvin Pineda trying Bao & Co.',
    type: 'video',
    className: 'gallery-item--wide',
  },
  {
    src: '/assets/videos/customers.mp4',
    alt: 'Customers enjoying Bao & Co. at the market',
    type: 'video',
    className: 'gallery-item--wide',
  },
  {
    src: '/assets/videos/bao&co.mp4',
    alt: 'Bao & Co. serving freshly steamed baos',
    type: 'video',
    className: 'gallery-item--wide',
  },
] as const
