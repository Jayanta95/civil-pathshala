/* =========================================================
   Civil Pathshala — SITE CONFIG
   Edit this file to change contact details, stats, designs
   and the YouTube videos shown on the website.
   ========================================================= */

const SITE = {
  name: "Civil Pathshala",
  tagline: "Engineering Consultancy",
  founder: "Pronab Choudhury",
  founderTitle: "Civil Engineer & Planner",
  youtube: "https://www.youtube.com/@CivilPathshala",
  youtubeHandle: "@CivilPathshala",
  subscribeUrl: "https://www.youtube.com/@CivilPathshala?sub_confirmation=1",

  phone: "+91 75018 05541",
  whatsapp: "917501805541",            // country code + number, digits only
  email: "civilpathshala30@gmail.com",
  offices: [
    { label: "Head Office", address: "Hakimpara, Siliguri, West Bengal" },
    { label: "Branch Office", address: "Sukanta Pally, Islampur, Uttar Dinajpur, West Bengal" },
  ],
  address: "Hakimpara, Siliguri, West Bengal",
  mapQuery: "Hakimpara, Siliguri, West Bengal", // used for the Google map on Contact page

  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    pinterest: "#",
  },

  // TODO: confirm your working hours
  hours: [
    ["Monday – Friday", "09:00 AM – 07:00 PM"],
    ["Saturday", "09:00 AM – 06:00 PM"],
    ["Sunday", "10:00 AM – 02:00 PM"],
  ],
};

/* ---------------------------------------------------------
   DESIGNS (used on Home + Designs page)
   cat: elevation | duplex | floor-plan | interior
   For floor-plan items, a blueprint drawing is generated
   automatically from `plot` (WxL) and `seed`. You can also
   give any item an `img` URL of your own design.
   --------------------------------------------------------- */
const U = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=75&auto=format&fit=crop`;

const DESIGNS = [
  { id: 1,  title: "Modern 2-Floor House Elevation", cat: "elevation", plot: "30x50", area: 1500, floors: "G+1", beds: 4, facing: "East",  price: 3999, tag: "Trending", img: U("1600585154340-be6161a56a0c") },
  { id: 2,  title: "30x40 East Facing House Plan", cat: "floor-plan", plot: "30x40", area: 1200, floors: "G", beds: 3, facing: "East", price: 1999, tag: "Vastu", seed: 11 },
  { id: 3,  title: "Luxury Duplex Villa with Balcony", cat: "duplex", plot: "40x60", area: 2400, floors: "G+1", beds: 5, facing: "North", price: 5999, tag: "Premium", img: U("1613490493576-7fde63acd811") },
  { id: 4,  title: "Contemporary Living Room Interior", cat: "interior", plot: "16x20", area: 320, floors: "—", beds: 0, facing: "—", price: 2999, tag: "New", img: U("1600210492486-724fe5c67fb0") },
  { id: 5,  title: "Simple G+1 Front Elevation", cat: "elevation", plot: "25x50", area: 1250, floors: "G+1", beds: 3, facing: "West", price: 2999, tag: "Budget", img: U("1568605114967-8130f3a36994") },
  { id: 6,  title: "25x45 North Facing 2BHK Plan", cat: "floor-plan", plot: "25x45", area: 1125, floors: "G", beds: 2, facing: "North", price: 1499, tag: "Budget", seed: 27 },
  { id: 7,  title: "Glass Facade Modern Duplex", cat: "duplex", plot: "35x60", area: 2100, floors: "G+1", beds: 4, facing: "South", price: 5499, tag: "Trending", img: U("1580587771525-78b9dba3b914") },
  { id: 8,  title: "Modular Kitchen Design", cat: "interior", plot: "10x12", area: 120, floors: "—", beds: 0, facing: "—", price: 1999, tag: "Popular", img: U("1556909114-f6e7ad7d3136") },
  { id: 9,  title: "3 Storey Corner Plot Elevation", cat: "elevation", plot: "40x50", area: 2000, floors: "G+2", beds: 6, facing: "Corner", price: 4999, tag: "Corner", img: U("1564013799919-ab600027ffc6") },
  { id: 10, title: "40x60 West Facing Duplex Plan", cat: "floor-plan", plot: "40x60", area: 2400, floors: "G+1", beds: 4, facing: "West", price: 2999, tag: "Duplex", seed: 43 },
  { id: 11, title: "Farmhouse Style Villa", cat: "duplex", plot: "50x80", area: 4000, floors: "G+1", beds: 5, facing: "East", price: 7999, tag: "Premium", img: U("1512917774080-9991f1c4c750") },
  { id: 12, title: "Master Bedroom Interior", cat: "interior", plot: "14x16", area: 224, floors: "—", beds: 1, facing: "—", price: 2499, tag: "New", img: U("1618221195710-dd6b41faaea6") },
  { id: 13, title: "Small House Elevation for 20 ft Plot", cat: "elevation", plot: "20x40", area: 800, floors: "G+1", beds: 2, facing: "North", price: 2499, tag: "Budget", img: U("1570129477492-45c003edd2be") },
  { id: 14, title: "20x30 Compact 1BHK House Plan", cat: "floor-plan", plot: "20x30", area: 600, floors: "G", beds: 1, facing: "South", price: 999, tag: "Budget", seed: 58 },
  { id: 15, title: "White Box Modern Duplex", cat: "duplex", plot: "30x60", area: 1800, floors: "G+1", beds: 4, facing: "North", price: 4999, tag: "Trending", img: U("1600596542815-ffad4c1539a9") },
  { id: 16, title: "Elegant Dining & Lounge Interior", cat: "interior", plot: "15x18", area: 270, floors: "—", beds: 0, facing: "—", price: 2499, tag: "Popular", img: U("1600607687939-ce8a6c25118c") },
  { id: 17, title: "Classic Bungalow Front Design", cat: "elevation", plot: "45x60", area: 2700, floors: "G+1", beds: 5, facing: "East", price: 4499, tag: "Classic", img: U("1523217582562-09d0def993a6") },
  { id: 18, title: "35x50 Corner Plot House Plan", cat: "floor-plan", plot: "35x50", area: 1750, floors: "G+1", beds: 3, facing: "Corner", price: 2499, tag: "Corner", seed: 71 },
  { id: 19, title: "Wooden Accent Family Home", cat: "duplex", plot: "40x50", area: 2000, floors: "G+1", beds: 4, facing: "West", price: 5499, tag: "New", img: U("1605276374104-dee2a0ed3cd6") },
  { id: 20, title: "Cozy Family Lounge Interior", cat: "interior", plot: "14x18", area: 252, floors: "—", beds: 0, facing: "—", price: 1999, tag: "Budget", img: U("1586023492125-27b2c045efd7") },
  { id: 21, title: "Rental Purpose G+2 Elevation", cat: "elevation", plot: "30x45", area: 1350, floors: "G+2", beds: 6, facing: "South", price: 3999, tag: "Rental", img: U("1416331108676-a22ccb276e35") },
  { id: 22, title: "50x50 Square Plot Bungalow Plan", cat: "floor-plan", plot: "50x50", area: 2500, floors: "G", beds: 4, facing: "East", price: 3499, tag: "Vastu", seed: 92 },
  { id: 23, title: "Hillside Contemporary Villa", cat: "duplex", plot: "60x80", area: 4800, floors: "G+2", beds: 6, facing: "North", price: 9999, tag: "Luxury", img: U("1600047509807-ba8f99d2cdde") },
  { id: 24, title: "30x60 Row House Floor Plan", cat: "floor-plan", plot: "30x60", area: 1800, floors: "G+1", beds: 3, facing: "West", price: 2499, tag: "Popular", seed: 104 },
];

const CATEGORIES = {
  all: { label: "All Designs", icon: "fa-border-all" },
  elevation: { label: "3D Elevation", icon: "fa-building" },
  duplex: { label: "Duplex / Villa", icon: "fa-house-chimney" },
  "floor-plan": { label: "Floor Plans", icon: "fa-ruler-combined" },
  interior: { label: "Interior", icon: "fa-couch" },
};

/* ---------------------------------------------------------
   YOUTUBE VIDEOS
   Put a YouTube video ID in `id` (the part after watch?v=)
   to show its real thumbnail and play it in a popup.
   Without an id, the card links to the channel.
   --------------------------------------------------------- */
const VIDEOS = [
  { id: "", title: "How to Plan a House on a 30x40 Plot", topic: "House Planning", icon: "fa-ruler-combined", c1: "#071040", c2: "#1d3fd8" },
  { id: "", title: "Column, Beam & Footing Size Explained", topic: "Structural", icon: "fa-building-columns", c1: "#7c2d12", c2: "#ff7b00" },
  { id: "", title: "House Construction Cost Calculation", topic: "Estimation", icon: "fa-calculator", c1: "#064e3b", c2: "#0e8f5f" },
  { id: "", title: "Steel Calculation for Slab & Beam", topic: "Quantity", icon: "fa-bars-staggered", c1: "#312e81", c2: "#6366f1" },
  { id: "", title: "Vastu Tips Every Home Owner Must Know", topic: "Vastu", icon: "fa-compass", c1: "#701a75", c2: "#d946ef" },
  { id: "", title: "Site Visit: Brickwork & Plaster Checks", topic: "Site Work", icon: "fa-helmet-safety", c1: "#7f1d1d", c2: "#ef4444" },
];
