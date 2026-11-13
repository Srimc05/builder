import type { Project } from "../types"

/**
 * SAMPLE PORTFOLIO — every project below is illustrative placeholder content
 * used to demonstrate the layout. Replace with the company's real projects
 * (and real photography) before launch. Sample items are excluded from
 * production builds automatically.
 */
export const sampleProjects: Project[] = [
  {
    sample: true,
    slug: "the-courtyard-residence",
    name: "The Courtyard Residence",
    location: "Hillside District",
    category: "residential",
    year: 2024,
    builtUpArea: "6,200 sq ft",
    status: "Completed",
    cover: { name: "residence-garden", alt: "Two-storey contemporary home wrapped around a mature tree and lawn" },
    gallery: [
      { name: "hero-residence-dusk", alt: "Residence at dusk with warm interior lighting" },
      { name: "interior-living", alt: "Living room with timber wall panelling" },
      { name: "kitchen-island", alt: "Kitchen with a white island and timber cabinetry" },
      { name: "bedroom", alt: "Bedroom with floor-to-ceiling glazing" },
    ],
    excerpt: "A family home organised around a mature tree, with living spaces opening onto a private garden.",
    overview: [
      "The brief called for a family home that felt connected to its landscape. The plan wraps around an existing mature tree, so every principal room looks onto green space.",
      "A restrained palette of dark cladding, timber and glass keeps the building quiet against the garden while large openings bring daylight deep into the plan.",
    ],
    specifications: [
      { label: "Built-up area", value: "6,200 sq ft" },
      { label: "Floors", value: "G + 1" },
      { label: "Structure", value: "RCC frame" },
      { label: "Bedrooms", value: "4" },
      { label: "Duration", value: "16 months" },
    ],
    scope: ["Architectural design", "Structural engineering", "Construction", "Interior fit-out", "Landscaping"],
    constructionDetails: [
      "Raft foundation designed to protect the root zone of the existing tree.",
      "Cantilevered upper floor with concealed steel members to maximise openness.",
      "Double-glazed sliding systems with thermally broken frames.",
    ],
    challenges: [
      {
        challenge: "Building close to a mature tree without damaging its roots.",
        solution: "A root survey informed the foundation layout, and excavation near the trunk was carried out by hand.",
      },
      {
        challenge: "Large spans for the open-plan living area.",
        solution: "Post-tensioned slabs removed the need for intermediate columns.",
      },
    ],
    completion: "Handed over with full as-built documentation and a twelve-month defect liability period.",
  },
  {
    sample: true,
    slug: "azure-terrace-villa",
    name: "Azure Terrace Villa",
    location: "Coastal Road",
    category: "residential",
    year: 2023,
    builtUpArea: "8,400 sq ft",
    status: "Completed",
    cover: { name: "villa-white-pool", alt: "White contemporary villa reflected in a long swimming pool" },
    gallery: [
      { name: "villa-terrace-pool", alt: "Villa terraces stepping down to the pool" },
      { name: "living-room-dog", alt: "Double-height living room with a timber staircase" },
      { name: "living-minimal", alt: "Minimal living space with clerestory windows" },
    ],
    excerpt: "A layered coastal villa with terraces stepping down to a reflective pool.",
    overview: [
      "Designed for entertaining, the villa is arranged as a series of terraces that step down towards the pool, each with its own outdoor room.",
      "Deep overhangs shade the glazing from the afternoon sun, keeping interiors comfortable without closing them off.",
    ],
    specifications: [
      { label: "Built-up area", value: "8,400 sq ft" },
      { label: "Floors", value: "G + 2" },
      { label: "Structure", value: "RCC frame with steel canopies" },
      { label: "Bedrooms", value: "5" },
      { label: "Duration", value: "20 months" },
    ],
    scope: ["Turnkey construction", "Pool & landscape", "Interior design"],
    constructionDetails: [
      "Waterproofing system designed for coastal humidity and salt exposure.",
      "Infinity-edge pool with balancing tank and concealed plant room.",
      "Exterior render specified for UV and moisture resistance.",
    ],
    challenges: [
      {
        challenge: "Corrosive coastal environment.",
        solution: "Higher concrete cover, corrosion-inhibiting admixtures and marine-grade fixings throughout.",
      },
    ],
    completion: "Completed on programme, including landscape and pool commissioning.",
  },
  {
    sample: true,
    slug: "meridian-business-centre",
    name: "Meridian Business Centre",
    location: "Central Business District",
    category: "commercial",
    year: 2024,
    builtUpArea: "42,000 sq ft",
    status: "Completed",
    cover: { name: "white-pavilion", alt: "Sculptural white commercial building with angular glass facade" },
    gallery: [
      { name: "office-interior", alt: "Open-plan office with exposed concrete ceiling" },
      { name: "office-corridor", alt: "Office corridor with glazed partitions" },
      { name: "workspace-lounge", alt: "Breakout lounge with natural light" },
    ],
    excerpt: "A sculptural office building with flexible floor plates and a daylight-filled atrium.",
    overview: [
      "The building provides flexible, column-free office floors around a central atrium that brings daylight to the core.",
      "Angular facade panels respond to sun orientation, reducing glare and solar gain on the most exposed elevations.",
    ],
    specifications: [
      { label: "Built-up area", value: "42,000 sq ft" },
      { label: "Floors", value: "B + G + 6" },
      { label: "Structure", value: "Composite steel & concrete" },
      { label: "Facade", value: "Unitised glazing & aluminium panels" },
      { label: "Duration", value: "26 months" },
    ],
    scope: ["Shell & core", "Facade engineering", "MEP coordination", "Project management"],
    constructionDetails: [
      "Composite deck slabs to achieve long, column-free spans.",
      "Unitised curtain wall installed floor by floor to speed up enclosure.",
      "Raised access floors for flexible tenant fit-outs.",
    ],
    challenges: [
      {
        challenge: "A tight urban site with limited laydown space.",
        solution: "Just-in-time deliveries and a tower crane positioned within the building footprint.",
      },
    ],
    completion: "Handed over with building management systems commissioned and tenant fit-out guides.",
  },
  {
    sample: true,
    slug: "parkline-apartments",
    name: "Parkline Apartments",
    location: "Riverside",
    category: "residential",
    year: 2025,
    builtUpArea: "96,000 sq ft",
    status: "Under construction",
    cover: { name: "apartments-dark", alt: "Dark-clad apartment building with recessed balconies" },
    gallery: [
      { name: "apartments-balconies", alt: "Apartment facade with stacked balconies" },
      { name: "structure-framing", alt: "Apartment structure under construction" },
      { name: "rebar-crew", alt: "Crew fixing reinforcement on a column" },
    ],
    excerpt: "A mid-rise residential building with generous balconies overlooking the park.",
    overview: [
      "Each apartment is planned around a deep balcony that acts as an outdoor living room overlooking the adjacent park.",
      "The project is currently under construction — structure is progressing floor by floor.",
    ],
    specifications: [
      { label: "Built-up area", value: "96,000 sq ft" },
      { label: "Floors", value: "Stilt + 9" },
      { label: "Units", value: "72 apartments" },
      { label: "Structure", value: "RCC frame with shear walls" },
    ],
    scope: ["Structural engineering", "Construction", "MEP installation"],
    constructionDetails: [
      "Aluminium formwork system for repeatable, high-quality floor cycles.",
      "Shear-wall core designed for lateral stability.",
    ],
    challenges: [
      {
        challenge: "Maintaining a consistent floor cycle through the monsoon.",
        solution: "Covered work zones and a revised concrete pour schedule around forecast weather windows.",
      },
    ],
    completion: "Currently under construction.",
  },
  {
    sample: true,
    slug: "the-perforated-house",
    name: "The Perforated House",
    location: "Greenfield Layout",
    category: "residential",
    year: 2022,
    builtUpArea: "4,800 sq ft",
    status: "Completed",
    cover: { name: "house-courtyard", alt: "Timber-clad house with a sculpted roof and a central courtyard" },
    gallery: [
      { name: "house-perforated", alt: "House with a perforated white screen facade" },
      { name: "lounge-warm", alt: "Warm lounge with natural materials" },
    ],
    excerpt: "A courtyard house where a perforated screen filters light and air.",
    overview: [
      "A perforated screen wraps the upper floor, providing privacy from the street while allowing breezes and filtered light inside.",
      "The ground floor opens to a central courtyard that acts as the heart of the home.",
    ],
    specifications: [
      { label: "Built-up area", value: "4,800 sq ft" },
      { label: "Floors", value: "G + 1" },
      { label: "Structure", value: "RCC frame" },
      { label: "Bedrooms", value: "3" },
    ],
    scope: ["Architectural design", "Construction", "Interiors"],
    constructionDetails: [
      "Precast perforated panels fixed to a lightweight steel sub-frame.",
      "Cross-ventilation strategy reduces reliance on mechanical cooling.",
    ],
    challenges: [
      {
        challenge: "Achieving consistent quality in the perforated panels.",
        solution: "Panels were precast off-site in controlled conditions and installed as finished units.",
      },
    ],
    completion: "Completed and handed over with a full maintenance manual.",
  },
  {
    sample: true,
    slug: "northgate-logistics-hub",
    name: "Northgate Logistics Hub",
    location: "North Industrial Estate",
    category: "industrial",
    year: 2023,
    builtUpArea: "1,20,000 sq ft",
    status: "Completed",
    cover: { name: "warehouse-interior", alt: "High-bay warehouse with long racking aisles" },
    gallery: [
      { name: "earthworks", alt: "Earthworks and excavation equipment on site" },
      { name: "site-aerial", alt: "Aerial view of construction crew on site" },
    ],
    excerpt: "A high-bay logistics facility with heavy-duty floors and wide clear spans.",
    overview: [
      "The facility provides a large clear-span storage hall with high-bay racking, loading docks and supporting office spaces.",
      "Floor flatness and load capacity were critical to the operator's automated equipment.",
    ],
    specifications: [
      { label: "Built-up area", value: "1,20,000 sq ft" },
      { label: "Clear height", value: "12 m" },
      { label: "Structure", value: "Pre-engineered steel" },
      { label: "Docks", value: "18 loading bays" },
    ],
    scope: ["Site development", "Pre-engineered building", "Industrial flooring", "External works"],
    constructionDetails: [
      "Laser-screeded, fibre-reinforced industrial floor slab.",
      "Pre-engineered steel frame erected in phased sections.",
    ],
    challenges: [
      {
        challenge: "Poor ground conditions across part of the site.",
        solution: "Ground improvement and a revised foundation design for the affected bays.",
      },
    ],
    completion: "Handed over in phases to allow early occupation of the first storage hall.",
  },
  {
    sample: true,
    slug: "atelier-living-interiors",
    name: "Atelier Living Interiors",
    location: "Old Town",
    category: "interiors",
    year: 2024,
    builtUpArea: "3,100 sq ft",
    status: "Completed",
    cover: { name: "lounge-warm", alt: "Warm, layered living room interior with natural textures" },
    gallery: [
      { name: "living-minimal", alt: "Minimal living room with clerestory windows" },
      { name: "kitchen-island", alt: "Kitchen with timber joinery" },
      { name: "bedroom", alt: "Calm bedroom interior" },
    ],
    excerpt: "A complete interior renewal using warm materials and bespoke joinery.",
    overview: [
      "A full interior renewal of an existing apartment, reorganising the plan to create a generous open living space.",
      "Natural materials — oak, linen and lime plaster — give the home a calm, tactile character.",
    ],
    specifications: [
      { label: "Area", value: "3,100 sq ft" },
      { label: "Type", value: "Apartment interior" },
      { label: "Duration", value: "7 months" },
    ],
    scope: ["Interior design", "Renovation", "Custom joinery", "Lighting design"],
    constructionDetails: [
      "Non-structural walls removed to open the living areas.",
      "Bespoke oak joinery fabricated off-site and installed in a single phase.",
    ],
    challenges: [
      {
        challenge: "Working within an occupied building.",
        solution: "Noise-controlled working hours and dust-sealed work zones agreed with the building association.",
      },
    ],
    completion: "Delivered fully furnished and ready for move-in.",
  },
]
