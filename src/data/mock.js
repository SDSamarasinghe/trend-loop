export const navigationItems = [
  {
    name: 'Platform',
    hasDropdown: true,
    items: [
      { name: 'Features', link: '#features' },
      { name: 'Security', link: '#security' },
      { name: 'Integrations', link: '#integrations' }
    ]
  },
  {
    name: 'Solutions',
    hasDropdown: true,
    items: [
      { name: 'For Startups', link: '#startups' },
      { name: 'For Agencies', link: '#agencies' },
      { name: 'For Developers', link: '#developers' }
    ]
  },
  { name: 'Pricing', link: '/pricing' },
  { name: 'Self-Hosted', link: '/self-hosted' },
  {
    name: 'Resources',
    hasDropdown: true,
    items: [
      { name: 'Documentation', link: '#docs' },
      { name: 'Blog', link: '#blog' },
      { name: 'Support', link: '#support' }
    ]
  }
];

export const heroTestimonials = [
  {
    id: 1,
    quote: 'Meet the new generation of **digital marketing services** that transform your brand presence across all platforms.',
    author: 'TrendLoop Team',
    role: 'Digital Marketing Experts',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrendLoop'
  },
  {
    id: 2,
    quote: 'From **video content creation** to strategic campaigns, we deliver results that matter for your business growth.',
    author: 'Marketing Solutions',
    role: 'Content & Strategy Specialists',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing'
  }
];

export const heroFaqs = [
  {
    id: 1,
    question: 'What makes your service different?',
    answer: 'We combine creative excellence with data-driven strategies to deliver measurable results for your business.',
    lottieUrl: 'https://lottie.host/4c3d5f3e-3b0a-4f3e-9c3e-3e5f3e3e3e3e/3e5f3e3e3e.json',

  },
  {
    id: 2,
    question: 'How quickly can we get started?',
    answer: 'Start in minutes! Our streamlined onboarding process gets you up and running with your first campaign in no time.',
    lottieUrl: 'https://lottie.host/embed/4c3d5f3e-3b0a-4f3e-9c3e-3e5f3e3e3e3e/3e5f3e3e3e.json',

  },
  {
    id: 3,
    question: 'Do you offer support?',
    answer: '24/7 dedicated support team ready to help you succeed. We\'re here whenever you need us.',
    lottieUrl: 'https://lottie.host/embed/4c3d5f3e-3b0a-4f3e-9c3e-3e5f3e3e3e3e/3e5f3e3e3e.json',

  }
];

export const features = [
  {
    id: 1,
    icon: 'Inbox',
    category: 'About Us',
    title: "Meet the new generation of digital marketing services",
    badge: 'NEW',
    badgeText: 'Test multiple emails, send the most effective one.',
    description: `Based in Canada, we specialize in creating high-quality video content and strategic marketing campaigns that help businesses stand out in today's competitive digital landscape. Our team combines creative expertise with data-driven strategies to deliver measurable results.`,
    cta: 'More about campaigns',
    illustration: 'growth'
  },
  {
    id: 2,
    icon: 'Settings',
    category: 'FAQ',
    title: 'The Problems We Helped Our Clients Overcome',
    description: 'Create multi-step email sequences that send automatically based on subscriber actions and behaviors.',
    cta: 'More about automations',
    illustration: 'automation'
  },
  {
    id: 3,
    icon: 'Settings',
    category: 'FAQ',
    title: 'The Problems We Helped Our Clients Overcome',
    description: 'Create multi-step email sequences that send automatically based on subscriber actions and behaviors.',
    cta: 'More about automations',
    illustration: 'automation'
  },
  {
    id: 4,
    icon: 'Zap',
    category: 'Team',
    title: 'Meet the Experts Behind Your Success',
    description: 'Deliver order confirmations, password resets, and other triggered emails reliably and at scale.',
    cta: 'More about transactional',
    illustration: 'transactional'
  }
];

export const testimonials = [
  // New testimonials
  {
    id: 101,
    quote:
      'I truly appreciate how easy the sessions were and how well the team understood my vision. I’m extremely happy with the results!',
    author: 'Riya',
    role: 'Real Estate Agent',
    avatar: '/images/4 (1).png'
  },
  {
    id: 102,
    quote:
      'I had a great session. It was quick, and the pricing was very affordable. I’m really satisfied with the experience.',
    author: 'Shane Rego',
    role: 'Fitness Coach',
    avatar: '/images/4 (2).png'
  },
  {
    id: 103,
    quote:
      'They were professional and delivered exactly what I needed. The quality was clean and the edits were solid. I would definitely recommend them!',
    author: 'Ted Kulatunga',
    role: 'Automotive Detailing',
    avatar: '/images/4 (3).png'
  },
  // Existing testimonials
  {
    id: 1,
    quote:
      'I was nervous at first, but the team made me feel completely at ease. They were patient, supportive, and helpful with all my retakes. Huge thanks to everyone for making the whole process so smooth and enjoyable!',
    author: 'Rajat Patel',
    role: 'Mortgage Agent',
    avatar: '/images/Artboard 1.png'
  },
  {
    id: 2,
    quote:
      'Just wrapped an awesome session with Trend Loop! Great vibe, super easy support with my script, and insane value for the price. I highly recommend it!',
    author: 'Shaurya Kumar',
    role: 'Real Estate Agent',
    avatar: '/images/Artboard 2.png'
  },
  {
    id: 3,
    quote:
      "They helped me on this session and they were amazing. I really enjoyed it. I'm looking forward to doing much more with you guys and getting going.",
    author: 'Rosa Bolia',
    role: 'Real Estate Agent',
    avatar: '/images/Artboard 3.png'
  }
];

export const pricingFeatures = [
  'Unlimited campaigns',
  'Advanced segmentation',
  'A/B split testing',
  'Detailed analytics',
  'Email automations',
  'Multiple email editors',
  'API access',
  'GDPR compliant'
];

export const footerLinks = {
  product: [
    { name: 'Features', link: '#features' },
    { name: 'Pricing', link: '#pricing' },
  ],
  resources: [
    { name: 'Blog', link: '#blog' }
  ],
  company: [
    { name: 'About', link: '#about' },
    { name: 'Contact', link: '#contact' },
  ],
  legal: [
    { name: 'Privacy', link: '#privacy' },
    { name: 'Terms', link: '#terms' },
  ]
};

// Portfolio reels (short-form vertical content - 9:16 format)
// Categories: Automotive, Real Estate, Saloon & Barber, Restaurant, Lifestyle, Cinematic
// Note: Replace these placeholder videos with your actual reel videos
export const reelsPortfolio = [
  // Automotive
  {
    id: 1,
    title: 'Avaic Auto Care',
    category: 'Automotive',
    fileName: 'avaic auto care'
  },
  {
    id: 2,
    title: 'Aviac Auto Care 2',
    category: 'Automotive',
    fileName: 'aviac auto care 2'
  },
  {
    id: 3,
    title: 'Outlander',
    category: 'Automotive',
    fileName: 'avic auto care - Outlander'
  },
  {
    id: 4,
    title: 'Auto Showcase',
    category: 'Automotive',
    fileName: 'Comp 1_2'
  },
  {
    id: 5,
    title: 'Auto Care Ad',
    category: 'Automotive',
    fileName: 'Copy of avic auto care ad 02'
  },
  {
    id: 6,
    title: 'Automotive Reel',
    category: 'Automotive',
    fileName: 'reel 04'
  },
  
  // Restaurant
  {
    id: 7,
    title: 'Restaurant Experience',
    category: 'Restaurant',
    fileName: 'reel 01'
  },
  {
    id: 8,
    title: 'Fine Dining',
    category: 'Restaurant',
    fileName: 'REEL 02'
  },
  {
    id: 9,
    title: 'Restaurant Showcase',
    category: 'Restaurant',
    fileName: 'reel 06'
  },
  {
    id: 10,
    title: 'Dining Moments',
    category: 'Restaurant',
    fileName: 'reel 07 '
  },
  
  // BTS
  {
    id: 11,
    title: 'Budget in Barrie',
    thumbnail: '/images/budget-in-barry.jpeg',
    category: 'BTS',
    fileName: 'kites image vayanga'
  },
  {
    id: 12,
    title: 'Real Estate Investment',
    thumbnail: '/images/invest-real-state.jpeg',
    category: 'BTS',
    fileName: 'Kushmin BTS'
  },
  {
    id: 13,
    title: 'Dream Home',
    thumbnail: '/images/dream-home.jpeg',
    category: 'BTS',
    fileName: 'maternity shoot'
  },
  {
    id: 14,
    title: 'North Bay Investment',
    thumbnail: '/images/North-bay.jpeg',
    category: 'BTS',
    fileName: 'Torque & trim BTS (1)'
  },
  {
    id: 15,
    title: 'Music Video',
    category: 'BTS',
    fileName: 'vayanga music video'
  },
  {
    id: 16,
    title: 'Home Buyer Programs',
    thumbnail: '/images/home-buyer-programms.jpeg',
    category: 'BTS',
    fileName: 'Wedding recap'
  },

  // Real Estate
  {
    id: 17,
    title: 'Derick Real Estate',
    category: 'Real Estate',
    fileName: 'derick real estate'
  },
  {
    id: 18,
    title: 'Fortune Gate',
    category: 'Real Estate',
    fileName: 'fortune gate'
  },
  {
    id: 19,
    title: 'Shaurya Real Estate',
    category: 'Real Estate',
    fileName: 'shaurya reel 04'
  },
  
  // Cinematic
  {
    id: 20,
    title: 'Cinematic Story',
    category: 'Cinematic',
    fileName: 'Copy of Torque & trim reel 03 final'
  },
  {
    id: 21,
    title: 'Car BTS',
    category: 'Cinematic',
    fileName: 'kts car bts'
  },
  {
    id: 22,
    title: 'Sony Reel',
    category: 'Cinematic',
    fileName: 'sony reel'
  },
  
  // Lifestyle
  {
    id: 23,
    title: 'Realtor Journey',
    thumbnail: '/images/realtor-journey.jpeg',
    category: 'Lifestyle',
    fileName: 'shaurya reel 07'
  },
  {
    id: 24,
    title: 'Lifestyle Moments',
    category: 'Lifestyle',
    fileName: 'sneh bts'
  },
  {
    id: 25,
    title: 'Trim BTS',
    category: 'Lifestyle',
    fileName: 'Torque & trim BTS'
  },
  
  // Saloon & Barber
  {
    id: 26,
    title: 'Barber Shop Vibes',
    category: 'Saloon & Barber',
    fileName: 'Copy of Torque & trim reel 01 final'
  },
  {
    id: 27,
    title: 'Barber Experience',
    category: 'Saloon & Barber',
    fileName: 'Copy of Torque & trim reel 03 final'
  },
  {
    id: 28,
    title: 'Grooming Style',
    category: 'Saloon & Barber',
    fileName: 'Copy of Torque & trim reel 07'
  },
  {
    id: 29,
    title: 'Salon Showcase',
    category: 'Saloon & Barber',
    fileName: 'Copy of torque & trim reel 13'
  }
];

// Our Services dataset (centralized for reuse)
export const ourServices = [
  {
    title: 'Video Production',
    description: 'High-quality video content for brand awareness and engagement.',
    image: '/images/Video production .png'
  },
  {
    title: 'Ad Campaign',
    description: 'Strategic email marketing to nurture leads and drive conversions.',
    image: '/images/Ad management .png'
  },
  {
    title: 'Content Strategy',
    description: 'Data-driven content planning for measurable results.',
    image: '/images/Content strategy .png'
  },
  {
    title: 'Social Media Management',
    description: 'Grow and engage your audience across all major platforms.',
    image: '/images/Social media.png'
  }
];
