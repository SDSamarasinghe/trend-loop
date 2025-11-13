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
    id: 3,
    quote: 'Having used other marketing platforms, I was super pleased to see Mailcoach. It\'s a breath of fresh air.',
    author: 'Simon Hamp',
    role: 'Freelance Software Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Simon'
  },
  {
    id: 4,
    quote: 'Mailcoach is the perfect balance of simplicity and power. It does exactly what we need.',
    author: 'Sarah Chen',
    role: 'Product Manager, TechCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 5,
    quote: 'The developer experience is outstanding. Setting up was a breeze and the API is intuitive.',
    author: 'Marcus Johnson',
    role: 'CTO, StartupHub',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
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

// Portfolio reels (short-form vertical content)
export const reelsPortfolio = [
  {
    id: 1,
    image: '/images/budget-in-barry.jpeg',
    titleTop: '$700K',
    titleBottom: 'Budget in Barrie',
    theme: 'blue',
    size: 'tall'
  },
  {
    id: 2,
    image: '/images/home-buyer-programms.jpeg',
    titleTop: 'Losing',
    titleBottom: 'Homes After Pre-approval',
    theme: 'red',
    size: 'short'
  },
  {
    id: 3,
    image: '/images/invest-real-state.jpeg',
    titleTop: 'Funniest',
    titleBottom: 'Questions Asked',
    theme: 'orange',
    size: 'tall'
  },
  {
    id: 4,
    image: '/images/realtor-journey.jpeg',
    titleTop: 'Realtor',
    titleBottom: 'Journey',
    theme: 'red',
    size: 'short'
  },
  {
    id: 5,
    image: '/images/dream-home.jpeg',
    titleTop: 'Finding Your',
    titleBottom: 'Dream Home',
    theme: 'teal',
    size: 'tall'
  },
  {
    id: 6,
    image: '/images/North-bay.jpeg',
    titleTop: 'Looking To',
    titleBottom: 'Invest North Bay',
    theme: 'green',
    size: 'short'
  }
];
