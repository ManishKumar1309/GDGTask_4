/**
 * Curated product dataset for Shopora.
 * Features realistic Indian prices in INR (₹) across the 6 core categories:
 * Electronics, Fashion, Home & Living, Accessories, Beauty, Sports.
 */

export const FALLBACK_PRODUCTS = [
  // --- ELECTRONICS ---
  {
    id: 1,
    title: "AuraWave Wireless Noise-Cancelling Headphones",
    description: "Immersive over-ear Bluetooth headphones with active noise cancellation, 40mm dynamic neodymium drivers, and up to 35 hours of battery life with ultra-fast Type-C charging.",
    category: "electronics",
    price: 3499,
    discountPercentage: 20,
    rating: 4.8,
    stock: 45,
    brand: "AuraWave",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Battery Life": "35 Hours with Fast Charge",
      "Connectivity": "Bluetooth 5.3 & 3.5mm AUX",
      "Drivers": "40mm High-Resolution",
      "Warranty": "1 Year Replacement Warranty",
      "Weight": "240 grams"
    },
    reviews: [
      { rating: 5, comment: "Crisp highs and deep punchy bass. The active noise cancelling works brilliantly during flights.", reviewerName: "Rohan Sharma", date: "2026-02-14" },
      { rating: 4.5, comment: "Battery lasts for nearly a whole week on office commutes. Very comfortable ear cushions.", reviewerName: "Pooja Mehta", date: "2026-03-01" }
    ]
  },
  {
    id: 2,
    title: "PulseFit Pro AMOLED Smart Fitness Watch",
    description: "Sleek 1.43-inch AMOLED smartwatch with continuous SpO2 heart rate tracking, 100+ sport tracking modes, sleep monitoring, and IP68 water resistance.",
    category: "electronics",
    price: 2799,
    discountPercentage: 25,
    rating: 4.7,
    stock: 60,
    brand: "PulseFit",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Display": "1.43 inch AMOLED Always-On",
      "Battery": "Up to 10 Days typical usage",
      "Water Resistance": "IP68 Swim-Proof",
      "Sensors": "SpO2, PPG Heart Rate, Accelerometer",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    reviews: [
      { rating: 5, comment: "The AMOLED display is crystal clear even under harsh Indian sunlight. Step counter is accurate.", reviewerName: "Ankit Verma", date: "2026-01-28" },
      { rating: 4, comment: "Stylish build, premium metallic bezel. Great companion for daily jogging.", reviewerName: "Sneha Patel", date: "2026-02-18" }
    ]
  },
  {
    id: 3,
    title: "SoundBoom Portable 20W Bluetooth Speaker",
    description: "Rugged waterproof outdoor speaker with punchy 360-degree bass, dual passive radiators, 16-hour playtime, and integrated party LED illumination.",
    category: "electronics",
    price: 1999,
    discountPercentage: 15,
    rating: 4.6,
    stock: 38,
    brand: "SoundBoom",
    thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Output": "20W RMS Dual Drivers",
      "Playtime": "16 Hours",
      "Waterproofing": "IPX7 Waterproof",
      "Bluetooth": "v5.2 with 15m range",
      "Warranty": "1 Year Warranty"
    },
    reviews: [
      { rating: 5, comment: "Remarkable sound clarity for such a compact speaker. Easily fills my living room.", reviewerName: "Devendra K.", date: "2026-03-05" }
    ]
  },
  {
    id: 4,
    title: "VoltSpeed 20000mAh 65W Fast Power Bank",
    description: "High-capacity power bank supporting Power Delivery (PD 3.0) and Quick Charge 4.0 for laptops, tablets, and smartphones with digital LED percentage display.",
    category: "electronics",
    price: 1699,
    discountPercentage: 18,
    rating: 4.7,
    stock: 55,
    brand: "VoltSpeed",
    thumbnail: "https://images.unsplash.com/photo-1609592424360-8488e001c3bf?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1609592424360-8488e001c3bf?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Capacity": "20,000 mAh Lithium Polymer",
      "Max Output": "65W USB-C PD",
      "Ports": "2x USB-A, 1x USB-C Bi-directional",
      "Safety": "12-layer Circuit Protection",
      "Warranty": "6 Months Brand Warranty"
    },
    reviews: [
      { rating: 5, comment: "Charges my MacBook Air and iPhone simultaneously without heating up. Essential travel gear.", reviewerName: "Kunal Nair", date: "2026-02-20" }
    ]
  },

  // --- FASHION ---
  {
    id: 5,
    title: "Classic Oxford 100% Breathable Cotton Shirt",
    description: "Tailored slim-fit button-down shirt woven from premium long-staple Indian cotton. Effortlessly balances business smartness with weekend casual elegance.",
    category: "fashion",
    price: 1299,
    discountPercentage: 25,
    rating: 4.6,
    stock: 80,
    brand: "UrbanStitch",
    thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Material": "100% Pure Combed Cotton",
      "Fit": "Tailored Slim Fit",
      "Collar": "Button-Down Collar",
      "Care": "Machine wash cold, gentle cycle",
      "Country of Origin": "India"
    },
    reviews: [
      { rating: 5, comment: "The fabric feels soft and breathable all day long in Mumbai humidity. Perfect stitching.", reviewerName: "Aditya Roy", date: "2026-03-02" },
      { rating: 4, comment: "Fits true to size. Looks sharp with both chinos and jeans.", reviewerName: "Varun Desai", date: "2026-02-11" }
    ]
  },
  {
    id: 6,
    title: "Vintage Washed Denim Trucker Jacket",
    description: "Timeless trucker jacket crafted with durable 12.5 oz authentic washed denim, copper rivet buttons, double chest flap pockets, and adjustable waist tabs.",
    category: "fashion",
    price: 2499,
    discountPercentage: 20,
    rating: 4.8,
    stock: 35,
    brand: "RawDenim Co.",
    thumbnail: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Material": "98% Cotton, 2% Elastane Denim",
      "Pockets": "4 Functional Pockets",
      "Closure": "Heavy-duty Shank Buttons",
      "Care": "Cold wash inside out",
      "Warranty": "Quality Assured"
    },
    reviews: [
      { rating: 5, comment: "Super heavy and sturdy denim. Gives that perfect relaxed vintage look.", reviewerName: "Sameer Joshi", date: "2026-01-19" }
    ]
  },
  {
    id: 7,
    title: "CloudWalk Lightweight Minimalist Sneakers",
    description: "Versatile everyday sneakers designed with breathable knit mesh upper, cushioned memory foam insole, and shock-absorbing non-slip rubber outsole.",
    category: "fashion",
    price: 1899,
    discountPercentage: 30,
    rating: 4.7,
    stock: 50,
    brand: "CloudWalk",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Sole": "High-elastic EVA + Rubber Grip",
      "Upper": "Engineered Knit Mesh",
      "Insole": "Removable Memory Foam Cushion",
      "Weight": "210 grams per shoe",
      "Best For": "Daily Walking & Casual Wear"
    },
    reviews: [
      { rating: 5, comment: "Walking on clouds! Zero foot fatigue even after standing 8 hours.", reviewerName: "Kavita Rao", date: "2026-02-25" }
    ]
  },
  {
    id: 8,
    title: "Handcrafted Pure Linen Kurta",
    description: "Artisanal mandarin collar linen kurta featuring handcrafted wooden buttons and tailored side slits. Unmatched breathability for festive and casual occasions.",
    category: "fashion",
    price: 1499,
    discountPercentage: 15,
    rating: 4.5,
    stock: 40,
    brand: "Virasat",
    thumbnail: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Fabric": "100% Pure Flax Linen",
      "Style": "Straight Cut with Mandarin Collar",
      "Length": "Mid-Thigh Length",
      "Care": "Gentle hand wash or dry clean"
    },
    reviews: [
      { rating: 4.5, comment: "The natural linen texture is gorgeous. Very elegant drape.", reviewerName: "Rajesh K.", date: "2026-02-08" }
    ]
  },

  // --- HOME & LIVING ---
  {
    id: 9,
    title: "ZenAroma Ceramic Ultrasonic Mist Diffuser",
    description: "Matte ceramic aromatherapy essential oil diffuser with whisper-quiet ultrasonic technology, warm ambient LED glow, and automatic waterless shut-off.",
    category: "home-living",
    price: 1299,
    discountPercentage: 20,
    rating: 4.8,
    stock: 52,
    brand: "ZenLiving",
    thumbnail: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Capacity": "300ml Water Reservoir",
      "Coverage": "Up to 300 sq. ft.",
      "Timer Modes": "1h / 3h / 6h / Continuous",
      "Noise Level": "Under 25dB",
      "Material": "Handcrafted Ceramic & BPA-Free Base"
    },
    reviews: [
      { rating: 5, comment: "Fills my bedroom with calming lavender mist within minutes. The ceramic stone finish is stunning.", reviewerName: "Priyanka Sen", date: "2026-02-19" }
    ]
  },
  {
    id: 10,
    title: "Ergonomic High-Density Memory Foam Cushion",
    description: "Orthopedic contoured seat cushion designed to relieve lower back pressure, sciatica pain, and improve spine alignment during extended work desk hours.",
    category: "home-living",
    price: 899,
    discountPercentage: 35,
    rating: 4.7,
    stock: 75,
    brand: "ErgoComfort",
    thumbnail: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Core": "100% Premium Memory Foam",
      "Cover": "Washable Breathable Mesh Cover",
      "Bottom": "Non-Slip Rubberized Dots",
      "Dimensions": "45 x 35 x 7 cm"
    },
    reviews: [
      { rating: 5, comment: "Lifesaver for long work-from-home shifts! My tailbone pain vanished within 3 days.", reviewerName: "Deepak S.", date: "2026-01-30" }
    ]
  },
  {
    id: 11,
    title: "Minimalist Scandinavian Solid Wood Desk Lamp",
    description: "Contemporary bedside and desk lamp crafted from natural beech wood and matte white metal shade. Features touch dimming with 3 adjustable color temperatures.",
    category: "home-living",
    price: 1599,
    discountPercentage: 15,
    rating: 4.9,
    stock: 28,
    brand: "NordicHue",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Light Modes": "Warm White, Natural White, Cool Daylight",
      "Bulb Type": "Energy-Efficient LED (Built-in)",
      "Base Material": "Solid FSC-Certified Beech Wood",
      "Power": "USB / 5V DC Adapter included"
    },
    reviews: [
      { rating: 5, comment: "Incredible design quality. The warm light is super soothing for late-night reading.", reviewerName: "Tanya M.", date: "2026-02-12" }
    ]
  },
  {
    id: 12,
    title: "Double-Wall French Press Coffee Maker 800ml",
    description: "Sleek borosilicate glass and stainless steel French press coffee and tea plunger with fine mesh filtration system for rich, sediment-free brews.",
    category: "home-living",
    price: 999,
    discountPercentage: 25,
    rating: 4.6,
    stock: 40,
    brand: "BrewMaster",
    thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Capacity": "800ml (Approx 6 Cups)",
      "Glass": "Thermal Shock Resistant Borosilicate",
      "Filter": "4-Level Stainless Steel Plunger",
      "Dishwasher Safe": "Yes"
    },
    reviews: [
      { rating: 5, comment: "Makes cafe quality coffee every morning without any grounds leaking through.", reviewerName: "Vikram N.", date: "2026-02-17" }
    ]
  },

  // --- ACCESSORIES ---
  {
    id: 13,
    title: "Full-Grain Leather Slim Bifold RFID Wallet",
    description: "Handcrafted from vegetable-tanned genuine leather with RFID blocking protection, quick-access card slots, full cash compartment, and slim pocket profile.",
    category: "accessories",
    price: 999,
    discountPercentage: 30,
    rating: 4.8,
    stock: 65,
    brand: "CraftHide",
    thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Material": "100% Genuine Full-Grain Leather",
      "Card Capacity": "Up to 10 Cards + Cash",
      "Protection": "Certified RFID Shielding Layer",
      "Dimensions": "11 x 8.5 x 1.2 cm"
    },
    reviews: [
      { rating: 5, comment: "Smells like genuine leather. Does not bulge in jeans pocket at all.", reviewerName: "Manoj Goyal", date: "2026-02-28" }
    ]
  },
  {
    id: 14,
    title: "Classic Polarized Aviator Sunglasses",
    description: "Timeless stainless steel wireframe sunglasses with UV400 polarized anti-glare lenses, comfortable silicone nose pads, and scratch-resistant coating.",
    category: "accessories",
    price: 1499,
    discountPercentage: 20,
    rating: 4.7,
    stock: 55,
    brand: "Solaris Optics",
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Lens": "Triacetate Cellulose (TAC) Polarized",
      "UV Rating": "100% UV400 Protection",
      "Frame": "Corrosion-resistant Stainless Alloy",
      "Includes": "Protective Hard Case & Microfiber Cloth"
    },
    reviews: [
      { rating: 5, comment: "Cuts glare completely while driving during sunny afternoons. Solid metal construction.", reviewerName: "Arjun B.", date: "2026-03-04" }
    ]
  },
  {
    id: 15,
    title: "Minimalist Water-Resistant Laptop Backpack 25L",
    description: "Smart commuter backpack with padded 15.6-inch laptop compartment, hidden anti-theft back pocket, external USB charging port, and water-repellent oxford exterior.",
    category: "accessories",
    price: 1999,
    discountPercentage: 25,
    rating: 4.8,
    stock: 42,
    brand: "PackPro",
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Capacity": "25 Liters Multi-Pocket Compartments",
      "Laptop Fit": "Fits up to 15.6 inch Laptops",
      "Fabric": "900D High-Density Water-Repellent Polyester",
      "Zippers": "YKK Smooth Heavy-Duty Zippers"
    },
    reviews: [
      { rating: 5, comment: "Spacious yet maintains a slim silhouette. Padded straps ease heavy shoulder weight.", reviewerName: "Ritu S.", date: "2026-01-22" }
    ]
  },
  {
    id: 16,
    title: "Stainless Steel Chronograph Quartz Watch",
    description: "Classic luxury aesthetic featuring 42mm sunray dial, functioning stopwatch sub-dials, date calendar window, and polished link bracelet with safety butterfly clasp.",
    category: "accessories",
    price: 3499,
    discountPercentage: 22,
    rating: 4.6,
    stock: 25,
    brand: "Kronos",
    thumbnail: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Movement": "Japanese Miyota Quartz Chronograph",
      "Glass": "Hardened Mineral Crystal",
      "Water Resistance": "5 ATM (50 Meters)",
      "Case Diameter": "42mm",
      "Warranty": "2 Years Movement Warranty"
    },
    reviews: [
      { rating: 4.5, comment: "Heavier than expected in a good way! Receives compliments whenever I wear it to meetings.", reviewerName: "Nikhil K.", date: "2026-02-15" }
    ]
  },

  // --- BEAUTY ---
  {
    id: 17,
    title: "Vitamin C 15% Radiance Facial Glow Serum 30ml",
    description: "Dermatologist-tested brightening serum with pure L-Ascorbic Acid, Ferulic Acid, and Hyaluronic Acid to fade dark spots, boost collagen, and enhance natural glow.",
    category: "beauty",
    price: 699,
    discountPercentage: 30,
    rating: 4.7,
    stock: 90,
    brand: "Botanica Lab",
    thumbnail: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597359-0a6727781b01?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Key Actives": "15% Vitamin C, 1% Hyaluronic Acid, Ferulic Acid",
      "Skin Type": "Suitable for all skin types",
      "Formula": "Non-comedogenic, Fragrance-free, Paraben-free",
      "Volume": "30 ml"
    },
    reviews: [
      { rating: 5, comment: "Noticeable reduction in acne blemishes within 2 weeks of nightly use. Does not feel sticky.", reviewerName: "Aishwarya R.", date: "2026-02-27" }
    ]
  },
  {
    id: 18,
    title: "Ceramide & Hyaluronic Gel Moisturizer 100ml",
    description: "Ultra-lightweight oil-free gel moisturizer providing 72 hours of deep hydration, repairing the moisture barrier, and soothing irritated sensitive skin.",
    category: "beauty",
    price: 549,
    discountPercentage: 20,
    rating: 4.8,
    stock: 85,
    brand: "HydraDerm",
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Ingredients": "3 Essential Ceramides, Hyaluronic Acid, Cica Extract",
      "Finish": "Matte, Non-greasy Water Gel",
      "Cruelty-Free": "Yes, 100% Vegan",
      "Volume": "100 ml"
    },
    reviews: [
      { rating: 5, comment: "Instantly absorbs into skin without any heaviness. Excellent base under sunscreen.", reviewerName: "Simran K.", date: "2026-03-03" }
    ]
  },
  {
    id: 19,
    title: "Mineral Sunscreen Gel SPF 50+ PA++++ 50g",
    description: "Zero white-cast, sweat-resistant broad-spectrum mineral sunscreen formulated with zinc oxide, niacinamide, and blue light filter for all-day outdoor defense.",
    category: "beauty",
    price: 649,
    discountPercentage: 15,
    rating: 4.9,
    stock: 95,
    brand: "SolShield",
    thumbnail: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "SPF Rating": "SPF 50+ with PA++++ Protection",
      "White Cast": "100% Zero White Cast",
      "Water Resistance": "80 Minutes Sweat & Water Proof",
      "Weight": "50 grams"
    },
    reviews: [
      { rating: 5, comment: "Finally an Indian sunscreen that does not sweat off or sting eyes during workouts!", reviewerName: "Natasha P.", date: "2026-02-16" }
    ]
  },
  {
    id: 20,
    title: "Organic Cold-Pressed Moroccan Argan Oil 50ml",
    description: "100% pure extra virgin Argan oil rich in Vitamin E and essential fatty acids. Deeply conditions dry hair ends, tames frizz, and nourishes cuticles.",
    category: "beauty",
    price: 799,
    discountPercentage: 25,
    rating: 4.6,
    stock: 60,
    brand: "Botanica Lab",
    thumbnail: "https://images.unsplash.com/photo-1608248597359-0a6727781b01?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248597359-0a6727781b01?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Purity": "100% Pure Virgin Cold-Pressed",
      "Extraction": "Unrefined, Hexane-free",
      "Multi-Use": "Hair Serum, Beard Oil, Cuticle Care",
      "Volume": "50 ml Glass Dropper"
    },
    reviews: [
      { rating: 5, comment: "Just 2 drops leave my hair silky smooth and eliminates flyaways.", reviewerName: "Meera D.", date: "2026-01-25" }
    ]
  },

  // --- SPORTS ---
  {
    id: 21,
    title: "Eco-Friendly High-Density Dual-Grip Yoga Mat",
    description: "6mm extra-thick TPE alignment yoga mat offering joint cushioning, non-slip textured surfaces on both sides, with complimentary carrying strap.",
    category: "sports",
    price: 899,
    discountPercentage: 30,
    rating: 4.8,
    stock: 70,
    brand: "AsanaFit",
    thumbnail: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Thickness": "6mm Joint Cushioning",
      "Material": "Eco-Friendly Biodegradable TPE",
      "Dimensions": "183 cm x 61 cm (Extra Long)",
      "Includes": "Heavy-Duty Shoulder Carry Strap"
    },
    reviews: [
      { rating: 5, comment: "Zero slipping even during sweaty Hot Vinyasa flows. Does not smell like cheap rubber.", reviewerName: "Shreya Sen", date: "2026-03-06" }
    ]
  },
  {
    id: 22,
    title: "Insulated Double-Wall Gym Shaker & Flask 1000ml",
    description: "Vacuum insulated food-grade 304 stainless steel shaker bottle keeping beverages icy cold for 24 hours. Includes silent blender whisk ball and leakproof twist cap.",
    category: "sports",
    price: 799,
    discountPercentage: 20,
    rating: 4.7,
    stock: 65,
    brand: "HydroIron",
    thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Capacity": "1000ml (34 oz)",
      "Insulation": "Double-Wall Vacuum (Cold for 24h, Hot for 12h)",
      "Material": "Pro-Grade 18/8 Stainless Steel (BPA-free)",
      "Lid": "100% Leakproof Spout Lid"
    },
    reviews: [
      { rating: 5, comment: "Keeps protein shake ice-cold in my hot car for hours. Odor-resistant stainless steel.", reviewerName: "Karthik R.", date: "2026-02-10" }
    ]
  },
  {
    id: 23,
    title: "Aluminum High-Speed 360° Ball Bearing Jump Rope",
    description: "Precision engineered wire speed rope featuring dual 360-degree ball bearings, anti-slip textured aluminum handles, and adjustable steel cable for crossfit and HIIT.",
    category: "sports",
    price: 399,
    discountPercentage: 25,
    rating: 4.6,
    stock: 90,
    brand: "SpeedX",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Cable": "3m Vinyl-Coated Steel Wire (Adjustable)",
      "Bearings": "Dual Precision 360° Ball Bearing System",
      "Handles": "Aviation-Grade Knurled Aluminum",
      "Use Case": "Speed Skipping, Double Unders, Cardio"
    },
    reviews: [
      { rating: 5, comment: "Spins effortlessly fast. Mastered double-unders in just one week.", reviewerName: "Aman Gupta", date: "2026-02-04" }
    ]
  },
  {
    id: 24,
    title: "Resistance Loop Bands Set of 5 with Carry Bag",
    description: "100% natural latex resistance exercise bands with 5 varying resistance levels (X-Light to X-Heavy) for home strength training, physical therapy, and glute activation.",
    category: "sports",
    price: 499,
    discountPercentage: 35,
    rating: 4.8,
    stock: 110,
    brand: "FitBands",
    thumbnail: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800&auto=format&fit=crop&q=80"
    ],
    specs: {
      "Quantity": "Set of 5 Color-Coded Bands",
      "Resistance Range": "5 lbs to 40 lbs",
      "Material": "100% Genuine Natural Latex",
      "Includes": "Instruction Guide & Mesh Travel Pouch"
    },
    reviews: [
      { rating: 5, comment: "Do not roll or pinch during squats. Perfect travel workout kit.", reviewerName: "Rhea Chawla", date: "2026-02-22" }
    ]
  }
];

export const CATEGORIES_LIST = [
  { slug: "electronics", name: "Electronics", icon: "Laptop", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80", count: "4 Products" },
  { slug: "fashion", name: "Fashion", icon: "Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80", count: "4 Products" },
  { slug: "home-living", name: "Home & Living", icon: "Home", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80", count: "4 Products" },
  { slug: "accessories", name: "Accessories", icon: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80", count: "4 Products" },
  { slug: "beauty", name: "Beauty", icon: "Sparkles", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80", count: "4 Products" },
  { slug: "sports", name: "Sports", icon: "Activity", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80", count: "4 Products" }
];
