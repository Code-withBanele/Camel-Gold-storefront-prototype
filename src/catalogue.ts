export const images = {
  hero: "/images/black-polo.png",
  story: "/images/white-script-tee.png",
  blackPolo: "/images/black-polo.png",
  whiteScript: "/images/white-script-tee.png",
  blackScript: "/images/black-script-back.png",
  brownScript: "/images/brown-script-tee.png",
  creamScript: "/images/cream-script-tee.png",
  blackCamel: "/images/black-camel-tee.png",
  mascotSweatshirt: "/images/black-mascot-sweatshirt-front.png",
  mascotSweatshirtBack: "/images/black-mascot-sweatshirt-back.png",
  mascotTee: "/images/white-mascot-tee-front.png",
  mascotTeeBack: "/images/white-mascot-tee-back.png",
  mascotTeeModel: "/images/white-mascot-tee-model.png",
  longSleeves: "/images/signature-long-sleeve-tees.png",
  blackTracksuit: "/images/black-signature-tracksuit.png",
  blackTracksuitAlternate: "/images/black-signature-tracksuit-alternate.png",
  sandTracksuit: "/images/sand-tracksuit.png",
  desertHoodie: "/images/desert-graphic-hoodie.png",
  signatureHoodie: "/images/black-signature-hoodie.png",
}
export const collections = [
  {
    name: "The Everyday Edit",
    category: "Everyday",
    description: "Small details. A different feeling.",
    image: images.creamScript,
  },
  {
    name: "The Signature Collection",
    category: "Signature",
    description: "Signature gold details. A distinctive look.",
    image: images.blackPolo,
  },
  {
    name: "The Thoughtful Edit",
    category: "Thoughtful",
    description: "Something special, just for them.",
    image: images.whiteScript,
  },
]
export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  gallery?: string[]
  variants: string[]
  stock: number
  tag: string
}
export const products: Product[] = [
  {
    id: "signature-black-polo",
    name: "Signature Black Polo",
    category: "Signature",
    price: 890,
    image: images.blackPolo,
    variants: ["Black"],
    stock: 8,
    tag: "Bestseller",
  },
  {
    id: "black-camel-graphic-tee",
    name: "Black Camel Graphic Tee",
    category: "Signature",
    price: 1490,
    image: images.blackCamel,
    variants: ["Black"],
    stock: 6,
    tag: "The signature edit",
  },
  {
    id: "brown-signature-tee",
    name: "Brown Signature Tee",
    category: "Everyday",
    price: 650,
    image: images.brownScript,
    variants: ["Brown"],
    stock: 12,
    tag: "New arrival",
  },
  {
    id: "white-script-tee",
    name: "White Script Tee",
    category: "Thoughtful",
    price: 1190,
    image: images.whiteScript,
    variants: ["White"],
    stock: 9,
    tag: "",
  },
  {
    id: "cream-signature-tee",
    name: "Cream Signature Tee",
    category: "Everyday",
    price: 790,
    image: images.creamScript,
    variants: ["Cream"],
    stock: 0,
    tag: "Sold out",
  },
  {
    id: "black-back-script-tee",
    name: "Black Back-Script Tee",
    category: "Thoughtful",
    price: 980,
    image: images.blackScript,
    variants: ["Black"],
    stock: 5,
    tag: "New arrival",
  },
  {
    id: "black-mascot-sweatshirt",
    name: "Black Mascot Sweatshirt",
    category: "Signature",
    price: 1290,
    image: images.mascotSweatshirt,
    gallery: [images.mascotSweatshirt, images.mascotSweatshirtBack],
    variants: ["Black"],
    stock: 8,
    tag: "New arrival",
  },
  {
    id: "white-mascot-tee",
    name: "White Mascot Tee",
    category: "Signature",
    price: 790,
    image: images.mascotTee,
    gallery: [images.mascotTee, images.mascotTeeBack, images.mascotTeeModel],
    variants: ["White"],
    stock: 12,
    tag: "New arrival",
  },
  {
    id: "signature-long-sleeve-tee",
    name: "Signature Long-Sleeve Tee",
    category: "Everyday",
    price: 890,
    image: images.longSleeves,
    variants: ["White", "Black"],
    stock: 10,
    tag: "New arrival",
  },
  {
    id: "black-signature-tracksuit",
    name: "Black Signature Tracksuit",
    category: "Signature",
    price: 2490,
    image: images.blackTracksuit,
    gallery: [images.blackTracksuit, images.blackTracksuitAlternate],
    variants: ["Black"],
    stock: 6,
    tag: "New arrival",
  },
  {
    id: "sand-tracksuit",
    name: "Sand Tracksuit",
    category: "Everyday",
    price: 2290,
    image: images.sandTracksuit,
    variants: ["Sand"],
    stock: 7,
    tag: "New arrival",
  },
  {
    id: "desert-graphic-hoodie",
    name: "Desert Graphic Hoodie",
    category: "Thoughtful",
    price: 1490,
    image: images.desertHoodie,
    variants: ["Black"],
    stock: 9,
    tag: "New arrival",
  },
  {
    id: "black-signature-hoodie",
    name: "Black Signature Hoodie",
    category: "Signature",
    price: 1390,
    image: images.signatureHoodie,
    variants: ["Black"],
    stock: 8,
    tag: "New arrival",
  },
]
export type CartItem = {
  id: string
  variant: string
  quantity: number
}
export const money = (amount: number) =>
  `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
