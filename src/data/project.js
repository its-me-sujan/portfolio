// Sample featured projects data
export const featuredProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform - ShopHub',
    category: 'Web App',
    description: 'Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard',
    fullDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, Stripe payment integration, advanced analytics dashboard, and responsive design. Built with modern technologies ensuring scalability and performance. Features include product search, filtering, cart management, order tracking, and seller dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
    link: 'https://github.com/yourusername/shophub',
    github: 'https://github.com/yourusername/shophub',
    demo: 'https://shophub-demo.vercel.app',
    stars: 234,
    views: '12.5k',
    features: [
      'Real-time inventory management',
      'Secure payment processing with Stripe',
      'Advanced product search and filtering',
      'Order tracking and notifications',
      'Admin dashboard with analytics',
      'Multi-vendor support'
    ]
  },
  {
    id: 2,
    title: 'AI Analytics Dashboard',
    category: 'Dashboard',
    description: 'Intelligent analytics platform with AI-powered insights, predictions, and data visualization',
    fullDescription: 'An advanced analytics dashboard that leverages machine learning to provide predictive insights and automated reporting. Features include real-time data visualization, custom report generation, anomaly detection, and integration with popular data sources. Built for scalability and performance.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'D3.js', 'FastAPI', 'PostgreSQL'],
    link: 'https://github.com/yourusername/ai-dashboard',
    github: 'https://github.com/yourusername/ai-dashboard',
    demo: 'https://ai-dashboard-demo.netlify.app',
    stars: 189,
    views: '8.3k',
    features: [
      'Machine learning predictions',
      'Custom data visualization',
      'Automated report generation',
      'Real-time data updates',
      'Anomaly detection',
      'Multiple data source integration'
    ]
  },
  {
    id: 3,
    title: 'Social Connect - Mobile App',
    category: 'Mobile App',
    description: 'Cross-platform social networking app with real-time messaging and media sharing',
    fullDescription: 'A feature-rich social media application built for iOS and Android. Includes real-time messaging with Socket.io, media sharing with cloud storage, story features, live streaming capabilities, and social features like follows, likes, and comments. Optimized for performance and user experience.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io', 'AWS S3', 'Expo'],
    link: 'https://github.com/yourusername/social-connect',
    github: 'https://github.com/yourusername/social-connect',
    demo: 'https://expo.dev/@yourusername/social-connect',
    stars: 412,
    views: '25.1k',
    features: [
      'Real-time chat and messaging',
      'Photo and video sharing',
      'Story features with 24h expiry',
      'Live streaming',
      'Push notifications',
      'Social graph (followers/following)'
    ]
  },
  {
    id: 4,
    title: '3D Portfolio Showcase',
    category: 'Website',
    description: 'Award-winning interactive 3D portfolio with immersive WebGL experiences',
    fullDescription: 'A cutting-edge portfolio website featuring immersive 3D experiences built with Three.js and GSAP. Winner of Awwwards Site of the Day. Features include custom 3D models, physics-based animations, smooth scroll effects, and optimized performance across all devices. Built as a showcase of modern web capabilities.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop',
    technologies: ['Three.js', 'GSAP', 'Tailwind CSS', 'Vite', 'Blender', 'WebGL'],
    link: 'https://github.com/yourusername/3d-portfolio',
    github: 'https://github.com/yourusername/3d-portfolio',
    demo: 'https://3d-portfolio-showcase.vercel.app',
    stars: 567,
    views: '31.2k',
    features: [
      'Custom 3D models and animations',
      'Physics-based interactions',
      'Smooth scroll with Lenis',
      'Responsive 3D scenes',
      'Performance optimized',
      'Award-winning design'
    ]
  },
  {
    id: 5,
    title: 'DevFlow - Project Management',
    category: 'SaaS',
    description: 'Collaborative project management tool for development teams with Kanban boards and automation',
    fullDescription: 'A comprehensive project management solution designed specifically for development teams. Features include customizable Kanban boards, sprint planning, time tracking, GitHub integration, automated workflows, and team collaboration tools. Built with scalability in mind to support teams of all sizes.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC', 'Tailwind CSS', 'Zustand'],
    link: 'https://github.com/yourusername/devflow',
    github: 'https://github.com/yourusername/devflow',
    demo: 'https://devflow-pm.vercel.app',
    stars: 298,
    views: '15.7k',
    features: [
      'Kanban board with drag-and-drop',
      'Sprint planning and tracking',
      'Time tracking and reporting',
      'GitHub integration',
      'Automated workflows',
      'Team collaboration features'
    ]
  },
  {
    id: 6,
    title: 'FitTrack - Fitness App',
    category: 'Mobile App',
    description: 'AI-powered fitness tracking app with personalized workout plans and nutrition tracking',
    fullDescription: 'A comprehensive fitness application that uses AI to create personalized workout plans and nutrition recommendations. Features include workout tracking, progress photos, calorie counting, exercise library with video tutorials, social features, and integration with fitness wearables. Built for both iOS and Android.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    technologies: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit'],
    link: 'https://github.com/yourusername/fittrack',
    github: 'https://github.com/yourusername/fittrack',
    demo: 'https://fittrack.app',
    stars: 345,
    views: '19.2k',
    features: [
      'AI-powered workout recommendations',
      'Nutrition tracking and meal plans',
      'Progress tracking with photos',
      'Exercise library with videos',
      'Wearable device integration',
      'Social challenges and leaderboards'
    ]
  }
]

// Filter projects by category
export const getProjectsByCategory = (category) => {
  if (!category || category === 'All') return featuredProjects
  return featuredProjects.filter(project => project.category === category)
}

// Get project by ID
export const getProjectById = (id) => {
  return featuredProjects.find(project => project.id === id)
}

// Get project categories
export const getCategories = () => {
  const categories = ['All', ...new Set(featuredProjects.map(p => p.category))]
  return categories
}
