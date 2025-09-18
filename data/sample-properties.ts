export interface Property {
  id: number
  title: string
  city: string
  price: string
  img: string
  images: string[]
  description: string
  features: string[]
  specifications: {
    bedrooms: number
    bathrooms: number
    sqft: number
    yearBuilt: number
    parking: string
    type: string
  }
  location: {
    address: string
    neighborhood: string
    nearbyAmenities: string[]
    coordinates: {
      lat: number
      lng: number
    }
  }
  agent: {
    name: string
    phone: string
    email: string
    image: string
  }
}

const sampleProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    city: "San Francisco, CA",
    price: "$2,850,000",
    img: "/modern-downtown-loft-exterior.jpg",
    images: [
      "/modern-downtown-loft-exterior.jpg",
      "/placeholder-9htfl.png",
      "/placeholder-qiuzz.png",
      "/placeholder-8f0dt.png",
      "/placeholder-gig8c.png",
    ],
    description:
      "Experience urban luxury in this stunning downtown loft featuring soaring ceilings, exposed brick walls, and floor-to-ceiling windows with breathtaking city views. This meticulously renovated space combines industrial charm with modern sophistication, offering an open-concept living area perfect for entertaining. The gourmet kitchen boasts premium stainless steel appliances, quartz countertops, and custom cabinetry. Located in the heart of the financial district, you'll be steps away from world-class dining, shopping, and cultural attractions.",
    features: [
      "Floor-to-ceiling windows",
      "Exposed brick walls",
      "Hardwood floors throughout",
      "In-unit washer/dryer",
      "Central air conditioning",
      "Private balcony",
      "Concierge service",
      "Fitness center access",
    ],
    specifications: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1850,
      yearBuilt: 2018,
      parking: "1 garage space",
      type: "Loft",
    },
    location: {
      address: "123 Market Street, San Francisco, CA 94105",
      neighborhood: "Financial District",
      nearbyAmenities: [
        "Whole Foods Market - 0.2 miles",
        "Union Square - 0.5 miles",
        "Ferry Building Marketplace - 0.3 miles",
        "Montgomery BART Station - 0.1 miles",
        "Embarcadero Center - 0.2 miles",
      ],
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    agent: {
      name: "Sarah Johnson",
      phone: "(415) 555-0123",
      email: "sarah.johnson@realestate.com",
      image: "/professional-real-estate-agent-woman.png",
    },
  },
]

export default sampleProperties
