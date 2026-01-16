# Modern Portfolio with Three.js & Vue 3

A stunning, modern portfolio website built with Vue.js 3, Three.js, GSAP, and Tailwind CSS featuring interactive 3D elements, smooth animations, and a custom cursor.

## 🚀 Features

- **Three.js Backgrounds**: Interactive particle system and 3D geometric shapes
- **Smooth Animations**: GSAP-powered animations and custom CSS transitions
- **Custom Cursor**: Interactive mouse follower that responds to elements
- **Card Tilt Effects**: 3D card transformations on hover
- **Scroll Animations**: Elements fade in and slide up as you scroll
- **Animated Skills**: Progress bars that animate when visible
- **Contact Form**: Beautiful floating label form with validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Modern dark theme with purple/blue gradient accents
- **Performance Optimized**: Lazy loading and efficient Three.js rendering

## 🛠️ Tech Stack

- **Vue 3** - Composition API with TypeScript
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics and particle systems
- **GSAP** - Professional-grade animations
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **TypeScript** - Type-safe JavaScript

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## 🎨 Customization

### Personal Information

Edit the personal information in `src/stores/portfolio.ts`:

```typescript
personalInfo: {
  name: 'Your Name',
  title: 'Full Stack Developer',
  tagline: 'Your tagline here',
  bio: 'Your bio here',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  image: 'path/to/your/image.jpg'
}
```

### Projects

Update the projects array in `src/stores/portfolio.ts`:

```typescript
projects: [
  {
    id: 1,
    title: 'Project Name',
    description: 'Project description',
    image: 'path/to/image.jpg',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/...',
    demo: 'https://demo-url.com',
    category: 'web'
  },
  // ... more projects
]
```

### Skills

Modify skills in `src/stores/portfolio.ts`:

```typescript
skills: [
  { name: 'Vue.js', level: 95, icon: '⚡' },
  { name: 'React', level: 90, icon: '⚛️' },
  // ... more skills
]
```

### Colors

The color scheme uses Tailwind CSS classes. Main colors:
- Purple: `purple-400`, `purple-500`, `purple-600`
- Blue: `blue-400`, `blue-500`, `blue-600`
- Background: `slate-800`, `slate-900`

Customize in `src/assets/main.css` for global styles.

## 📁 Project Structure

```
src/
├── components/
│   ├── animations/
│   │   ├── CardAnimation.vue       # 3D card tilt effect
│   │   ├── MouseFollower.vue       # Custom cursor
│   │   └── ScrollReveal.vue        # Scroll-triggered animations
│   ├── sections/
│   │   ├── Hero.vue                # Hero section
│   │   ├── About.vue               # About section
│   │   ├── Projects.vue            # Projects grid
│   │   ├── Skills.vue              # Skills with progress bars
│   │   └── Contact.vue             # Contact form
│   └── three/
│       ├── ParticleBackground.vue  # Particle system
│       ├── ThreeScene.vue          # 3D animated scene
│       └── InteractiveObject.vue   # Mouse-interactive 3D object
├── composables/
│   ├── useThree.ts                 # Three.js setup
│   ├── useMousePosition.ts         # Mouse tracking
│   ├── useScrollAnimation.ts       # Scroll utilities
│   ├── useCardTilt.ts              # Card tilt logic
│   └── useIntersectionObserver.ts  # Visibility detection
├── stores/
│   └── portfolio.ts                # Portfolio data store
├── assets/
│   ├── main.css                    # Global styles
│   └── base.css                    # Base styles
└── App.vue                         # Main app component
```

## 🎯 Key Components

### Three.js Components

- **ParticleBackground**: Animated particle system with mouse interaction
- **ThreeScene**: Rotating torus knot with lighting
- **InteractiveObject**: 3D sphere that follows mouse movement

### Animation Components

- **ScrollReveal**: Wraps content to reveal on scroll
- **CardAnimation**: Adds 3D tilt effect to cards
- **MouseFollower**: Custom cursor with smooth follow

### Section Components

- **Hero**: Full-screen hero with animated text
- **About**: Profile, bio, and stats with counter animation
- **Projects**: Filterable project grid with hover effects
- **Skills**: Animated progress bars
- **Contact**: Form with validation and social links

## 🔧 Composables

Reusable composition functions for common functionality:

- `useThree` - Three.js scene setup and lifecycle
- `useMousePosition` - Throttled mouse position tracking
- `useScrollAnimation` - Scroll position and parallax
- `useCardTilt` - 3D card tilt calculations
- `useIntersectionObserver` - Element visibility detection

## 📱 Responsive Design

- Desktop: Full 3D effects, custom cursor, 3-column grid
- Tablet: 2-column grid, simplified animations
- Mobile: Single column, disabled cursor, static backgrounds

## ⚡ Performance Tips

- Three.js scenes use `requestAnimationFrame` for smooth 60fps
- Mouse events are throttled to reduce computation
- Intersection Observer for efficient scroll animations
- Images should be optimized (WebP format recommended)
- Disable heavy animations on mobile for better performance

## 🚀 Deployment

### Vercel/Netlify

1. Build the project: `yarn build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

### Custom Server

```bash
# Build
yarn build

# Serve with any static file server
npx serve dist
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

Built with ❤️ using Vue.js and Three.js
