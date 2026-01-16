import { defineStore } from 'pinia'

export interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
  category: string
  link?: string
  stars?: number
  views?: string
  features?: string[]
}

export interface Skill {
  name: string
  level: number
  icon: string
}

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  bio: string
  email: string
  github: string
  linkedin: string
  twitter: string
  image: string
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    personalInfo: {
      name: 'Sujan Shrestha',
      title: 'Software Engineer',
      tagline: 'Building beautiful & functional web experiences',
      bio: 'Passionate developer with expertise in modern web technologies. I create elegant solutions to complex problems with a focus on user experience and performance.',
      email: 'your.email@example.com',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      twitter: 'https://twitter.com/yourusername',
      image: 'https://via.placeholder.com/400'
    } as PersonalInfo,

    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform - ShopHub',
        description: 'Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard',
        fullDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, Stripe payment integration, advanced analytics dashboard, and responsive design. Built with modern technologies ensuring scalability and performance. Features include product search, filtering, cart management, order tracking, and seller dashboard.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
        technologies: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
        github: 'https://github.com/yourusername/shophub',
        demo: 'https://shophub-demo.vercel.app',
        category: 'Web App',
        link: 'https://github.com/yourusername/shophub',
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
        description: 'Intelligent analytics platform with AI-powered insights, predictions, and data visualization',
        fullDescription: 'An advanced analytics dashboard that leverages machine learning to provide predictive insights and automated reporting. Features include real-time data visualization, custom report generation, anomaly detection, and integration with popular data sources. Built for scalability and performance.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'D3.js', 'FastAPI', 'PostgreSQL'],
        github: 'https://github.com/yourusername/ai-dashboard',
        demo: 'https://ai-dashboard-demo.netlify.app',
        category: 'Dashboard',
        link: 'https://github.com/yourusername/ai-dashboard',
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
        description: 'Cross-platform social networking app with real-time messaging and media sharing',
        fullDescription: 'A feature-rich social media application built for iOS and Android. Includes real-time messaging with Socket.io, media sharing with cloud storage, story features, live streaming capabilities, and social features like follows, likes, and comments. Optimized for performance and user experience.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io', 'AWS S3', 'Expo'],
        github: 'https://github.com/yourusername/social-connect',
        demo: 'https://expo.dev/@yourusername/social-connect',
        category: 'Mobile App',
        link: 'https://github.com/yourusername/social-connect',
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
        description: 'Award-winning interactive 3D portfolio with immersive WebGL experiences',
        fullDescription: 'A cutting-edge portfolio website featuring immersive 3D experiences built with Three.js and GSAP. Winner of Awwwards Site of the Day. Features include custom 3D models, physics-based animations, smooth scroll effects, and optimized performance across all devices. Built as a showcase of modern web capabilities.',
        image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop',
        technologies: ['Three.js', 'GSAP', 'Tailwind CSS', 'Vite', 'Blender', 'WebGL'],
        github: 'https://github.com/yourusername/3d-portfolio',
        demo: 'https://3d-portfolio-showcase.vercel.app',
        category: 'Website',
        link: 'https://github.com/yourusername/3d-portfolio',
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
        description: 'Collaborative project management tool for development teams with Kanban boards and automation',
        fullDescription: 'A comprehensive project management solution designed specifically for development teams. Features include customizable Kanban boards, sprint planning, time tracking, GitHub integration, automated workflows, and team collaboration tools. Built with scalability in mind to support teams of all sizes.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC', 'Tailwind CSS', 'Zustand'],
        github: 'https://github.com/yourusername/devflow',
        demo: 'https://devflow-pm.vercel.app',
        category: 'SaaS',
        link: 'https://github.com/yourusername/devflow',
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
        description: 'AI-powered fitness tracking app with personalized workout plans and nutrition tracking',
        fullDescription: 'A comprehensive fitness application that uses AI to create personalized workout plans and nutrition recommendations. Features include workout tracking, progress photos, calorie counting, exercise library with video tutorials, social features, and integration with fitness wearables. Built for both iOS and Android.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
        technologies: ['Flutter', 'Dart', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit'],
        github: 'https://github.com/yourusername/fittrack',
        demo: 'https://fittrack.app',
        category: 'Mobile App',
        link: 'https://github.com/yourusername/fittrack',
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
    ] as Project[],

    skills: [
      { name: 'Vue.js', level: 95, icon: '⚡' },
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 88, icon: '📘' },
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Three.js', level: 80, icon: '🎮' },
      { name: 'Tailwind CSS', level: 92, icon: '🎨' },
      { name: 'MongoDB', level: 82, icon: '🍃' },
      { name: 'PostgreSQL', level: 80, icon: '🐘' },
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'AWS', level: 78, icon: '☁️' },
      { name: 'Git', level: 90, icon: '📦' },
      { name: 'Figma', level: 85, icon: '🎨' }
    ] as Skill[],

    stats: {
      yearsExperience: 5,
      projectsCompleted: 50,
      happyClients: 30,
      codeCups: 999
    },

    filterCategory: 'all' as string
  }),

  getters: {
    filteredProjects(state) {
      if (state.filterCategory === 'all') {
        return state.projects
      }
      return state.projects.filter(p => p.category === state.filterCategory)
    },

    projectCategories(state) {
      const categories = new Set(state.projects.map(p => p.category))
      return ['All', ...Array.from(categories)]
    }
  },

  actions: {
    setFilterCategory(category: string) {
      this.filterCategory = category
    },

    getProjectById(id: number) {
      return this.projects.find(p => p.id === id)
    },

    getProjectsByCategory(category: string) {
      if (!category || category === 'All') return this.projects
      return this.projects.filter(p => p.category === category)
    }
  }
})
