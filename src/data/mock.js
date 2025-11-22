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
    { name: 'Security', link: '#security' },
    { name: 'Roadmap', link: '#roadmap' }
  ],
  resources: [
    { name: 'Documentation', link: '#docs' },
    { name: 'API Reference', link: '#api' },
    { name: 'Guides', link: '#guides' },
    { name: 'Blog', link: '#blog' }
  ],
  company: [
    { name: 'About', link: '#about' },
    { name: 'Careers', link: '#careers' },
    { name: 'Contact', link: '#contact' },
    { name: 'Partners', link: '#partners' }
  ],
  legal: [
    { name: 'Privacy', link: '#privacy' },
    { name: 'Terms', link: '#terms' },
    { name: 'Cookie Policy', link: '#cookies' }
  ]
};

// Portfolio reels (short-form vertical content - 9:16 format)
// Categories: Automotive, Real Estate, Saloon & Barber, Restaurant, Lifestyle, Cinematic
// Note: Replace these placeholder videos with your actual reel videos
export const reelsPortfolio = [
  {
    id: 1,
    video: '/videos/reel-1.mp4',
    title: 'Budget in Barrie',
    thumbnail: '/images/budget-in-barry.jpeg',
    category: 'Real Estate'
  },
  {
    id: 2,
    video: '/videos/reel-2.mp4',
    title: 'Home Buyer Programs',
    thumbnail: '/images/home-buyer-programms.jpeg',
    category: 'Real Estate'
  },
  {
    id: 3,
    video: '/videos/reel-3.mp4',
    title: 'Real Estate Investment',
    thumbnail: '/images/invest-real-state.jpeg',
    category: 'Real Estate'
  },
  {
    id: 4,
    video: '/videos/reel-4.mp4',
    title: 'Realtor Journey',
    thumbnail: '/images/realtor-journey.jpeg',
    category: 'Lifestyle'
  },
  {
    id: 5,
    video: '/videos/reel-5.mp4',
    title: 'Dream Home',
    thumbnail: '/images/dream-home.jpeg',
    category: 'Real Estate'
  },
  {
    id: 6,
    video: '/videos/reel-6.mp4',
    title: 'North Bay Investment',
    thumbnail: '/images/North-bay.jpeg',
    category: 'Real Estate'
  },
  {
    id: 7,
    video: '/videos/reel-7.mp4',
    title: 'Automotive Showcase',
    category: 'Automotive'
  },
  {
    id: 8,
    video: '/videos/reel-8.mp4',
    title: 'Barber Shop Vibes',
    category: 'Saloon & Barber'
  },
  {
    id: 9,
    video: '/videos/reel-9.mp4',
    title: 'Restaurant Experience',
    category: 'Restaurant'
  },
  {
    id: 10,
    video: '/videos/reel-10.mp4',
    title: 'Cinematic Story',
    category: 'Cinematic'
  },
  {
    id: 11,
    video: '/videos/reel-11.mp4',
    title: 'Lifestyle Moments',
    category: 'Lifestyle'
  },
  {
    id: 12,
    video: '/videos/reel-12.mp4',
    title: 'Fine Dining',
    category: 'Restaurant'
  }
];

// Our Services dataset (centralized for reuse)
export const ourServices = [
  {
    title: 'Video Production',
    description: 'High-quality video content for brand awareness and engagement.'
  },
  {
    title: 'Ad Campaigns',
    description: 'Strategic email marketing to nurture leads and drive conversions.'
  },
  {
    title: 'Social Media Management',
    description: 'Grow and engage your audience across all major platforms.'
  },
  {
    title: 'Content Strategy',
    description: 'Data-driven content planning for measurable results.'
  }
];
