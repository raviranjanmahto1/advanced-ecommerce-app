const products = [
  {
    name: 'Airpods Pro Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop',
    description:
      'Active Noise Cancellation blocks outside noise, so you can immerse yourself in music. Transparency mode for hearing and interacting with the world around you. Spatial audio with dynamic head tracking places sound all around you. Adaptive EQ automatically tunes music to your ears.',
    brand: 'Apple',
    category: 'Electronics',
    price: 249.99,
    countInStock: 10,
    rating: 4.8,
    numReviews: 24,
    reviews: [
      { name: 'John Doe', rating: 5, comment: 'Best noise cancellation I have ever experienced.' },
      { name: 'Jane Smith', rating: 4.5, comment: 'Great sound quality but battery life could be better.' }
    ]
  },
  {
    name: 'iPhone 14 Pro 256GB Memory',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop',
    description:
      'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives. An innovative 48MP camera for mind-blowing detail. All powered by the ultimate smartphone chip.',
    brand: 'Apple',
    category: 'Electronics',
    price: 1099.99,
    countInStock: 7,
    rating: 4.9,
    numReviews: 54,
    reviews: [
      { name: 'Alice Johnson', rating: 5, comment: 'The dynamic island is incredibly useful!' },
      { name: 'Bob Williams', rating: 5, comment: 'Camera quality is a massive upgrade from my old phone.' }
    ]
  },
  {
    name: 'Sony PlayStation 5 Console',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop',
    description:
      'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    brand: 'Sony',
    category: 'Gaming',
    price: 499.99,
    countInStock: 3,
    rating: 5,
    numReviews: 120,
    reviews: [
      { name: 'Charlie Davis', rating: 5, comment: 'Absolutely phenomenal console. Loading times are non-existent.' }
    ]
  },
  {
    name: 'Logitech G Pro X Superlight Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    description:
      'Meticulously designed in collaboration with many of the world’s leading esports pros. Engineered to win, being the pinnacle of our continued pursuit for the highest levels of performance.',
    brand: 'Logitech',
    category: 'Gaming',
    price: 129.99,
    countInStock: 15,
    rating: 4.7,
    numReviews: 32,
    reviews: [
      { name: 'Eva Green', rating: 4.5, comment: 'Very lightweight, perfect for FPS games.' }
    ]
  },
  {
    name: 'Amazon Echo Dot 4th Gen',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop',
    description:
      'Meet the all-new Echo Dot with clock - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.',
    brand: 'Amazon',
    category: 'Smart Home',
    price: 49.99,
    countInStock: 0,
    rating: 4.2,
    numReviews: 87,
    reviews: [
      { name: 'Frank Miller', rating: 4, comment: 'Great little speaker for the bedroom.' },
      { name: 'Grace Lee', rating: 4.5, comment: 'Alexa is very responsive, love the new design.' }
    ]
  },
  {
    name: 'Canon EOS R5 Mirrorless Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    description:
      'Professional mirrorless camera delivering 45 megapixel resolution, 20 fps shooting, and 8K raw video. Features advanced animal/human eye AF tracking and in-body image stabilization.',
    brand: 'Canon',
    category: 'Photography',
    price: 3899.99,
    countInStock: 2,
    rating: 4.9,
    numReviews: 14,
    reviews: [
      { name: 'Henry Ford', rating: 5, comment: 'The autofocus system on this camera feels like cheating.' }
    ]
  },
  {
    name: 'Samsung 49-Inch Odyssey G9 Gaming Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
    description:
      '49 inch ultrawide curved gaming monitor with 1000R curvature, 240Hz refresh rate, and 1ms response time. Unmatched immersion with QLED technology.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 1399.99,
    countInStock: 5,
    rating: 4.6,
    numReviews: 22,
    reviews: [
      { name: 'Ian Wright', rating: 5, comment: 'Massive screen. Amazing for productivity and gaming alike.' }
    ]
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    description:
      'Iconic quiet. Comfort. And sound. The first noise cancelling headphones are back, with world-class quiet, lightweight materials, and proprietary acoustic technology for deep, clear audio.',
    brand: 'Bose',
    category: 'Electronics',
    price: 329.99,
    countInStock: 8,
    rating: 4.7,
    numReviews: 45,
    reviews: [
      { name: 'Julia Chen', rating: 4.5, comment: 'Incredibly comfortable for long flights.' }
    ]
  }
];

module.exports = products;
