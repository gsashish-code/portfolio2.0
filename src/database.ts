/**
 * Single source of truth for every piece of content this portfolio renders —
 * nav labels, dock apps, Finder's project/about/resume data, the dev blog,
 * the terminal's profile card, tech stack, socials, and the photo library.
 * Update content here; nothing else in the app should hardcode it.
 */

// ---------------------------------------------------------------------------
// Menu bar / nav
// ---------------------------------------------------------------------------

export const navLinks = [
  { id: 1, name: 'Projects', type: 'finder' },
  { id: 3, name: 'Contact', type: 'contact' },
  { id: 4, name: 'Resume', type: 'resume' },
]

export const navIcons = [
  { id: 1, img: '/icons/wifi.svg', type: 'wifi' },
  { id: 2, img: '/icons/search.svg', type: 'search' },
  { id: 3, img: '/icons/user.svg', type: 'profile' },
  { id: 4, img: '/icons/mode.svg', type: 'control-center' },
] as const

// ---------------------------------------------------------------------------
// Dock
// ---------------------------------------------------------------------------

export const dockApps = [
  { id: 'finder', name: 'Portfolio', icon: 'finder.png', canOpen: true },
  { id: 'safari', name: 'Safari', icon: 'safari.png', canOpen: true },
  { id: 'photos', name: 'Gallery', icon: 'photos.png', canOpen: true },
  { id: 'contact', name: 'Contact', icon: 'contact.png', canOpen: true },
  { id: 'terminal', name: 'Terminal', icon: 'terminal.png', canOpen: true },
  { id: 'trash', name: 'Archive', icon: 'trash.png', canOpen: false },
]

// ---------------------------------------------------------------------------
// Window manager defaults
// ---------------------------------------------------------------------------

export const INITIAL_Z_INDEX = 1000

export const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
}

// ---------------------------------------------------------------------------
// Tech stack & social links (About Me / terminal)
// ---------------------------------------------------------------------------

export const techStack = [
  { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript'] },
  { category: 'Mobile', items: ['React Native', 'Expo'] },
  { category: 'Styling', items: ['Tailwind CSS', 'Sass', 'CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'Hono'] },
  { category: 'Database', items: ['MongoDB', 'PostgreSQL'] },
  { category: 'Dev Tools', items: ['Git', 'GitHub', 'Docker'] },
]

export const socials = [
  {
    id: 1,
    text: 'Github',
    icon: '/icons/github.svg',
    bg: '#f4656b',
    link: 'https://github.com/JavaScript-Mastery-Pro',
  },
  {
    id: 2,
    text: 'Platform',
    icon: '/icons/atom.svg',
    bg: '#4bcb63',
    link: 'https://jsmastery.com/',
  },
  {
    id: 3,
    text: 'Twitter/X',
    icon: '/icons/twitter.svg',
    bg: '#ff866b',
    link: 'https://x.com/jsmasterypro',
  },
  {
    id: 4,
    text: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    bg: '#05b6f6',
    link: 'https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all',
  },
]

// ---------------------------------------------------------------------------
// GitHub (terminal's `github stats`, Safari's about://github-stats)
// ---------------------------------------------------------------------------

export const GITHUB_USERNAME = 'gsashish-code'

// ---------------------------------------------------------------------------
// Terminal `whoami` / Safari about://me profile card
// ---------------------------------------------------------------------------

/**
 * TODO: replace with real bio facts — LinkedIn fetch was blocked (LinkedIn
 * returns HTTP 999 to unauthenticated scrapers, and the LinkedIn MCP
 * connector isn't authorized in this environment). Swap these in directly.
 */
export const PROFILE_FIELDS = [
  { label: 'Name', value: 'G S Ashish' },
  { label: 'Role', value: '<TODO: e.g. Frontend Engineer>' },
  { label: 'Location', value: '<TODO>' },
  { label: 'Focus', value: "<TODO: what you're building/learning right now>" },
  { label: 'Fun fact', value: '<TODO>' },
]

// ---------------------------------------------------------------------------
// Dev blog (Safari home page)
// ---------------------------------------------------------------------------

export const BLOG_POSTS = [
  {
    id: 1,
    date: 'Sep 2, 2025',
    title:
      'TypeScript Explained: What It Is, Why It Matters, and How to Master It',
    image: '/images/blog1.png',
    link: 'https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it',
  },
  {
    id: 2,
    date: 'Aug 28, 2025',
    title: 'The Ultimate Guide to Mastering Three.js for 3D Development',
    image: '/images/blog2.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development',
  },
  {
    id: 3,
    date: 'Aug 15, 2025',
    title: 'The Ultimate Guide to Mastering GSAP Animations',
    image: '/images/blog3.png',
    link: 'https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations',
  },
]

// ---------------------------------------------------------------------------
// Finder locations: projects (Work), About Me, Resume, Trash
// ---------------------------------------------------------------------------

const WORK_LOCATION = {
  id: 1,
  type: 'work',
  name: 'Work',
  icon: '/icons/work.svg',
  kind: 'folder',
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: 'Nike Ecommerce Website Application',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 left-5', // icon position inside Finder
      windowPosition: 'top-[5vh] left-5', // optional: Finder window position
      children: [
        {
          id: 1,
          name: 'Nike Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.',
            'Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.',
            'Think of it like walking into a flagship Nike store—but right from your phone or laptop.',
            "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
          ],
        },
        {
          id: 2,
          name: 'nike.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'nike.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-80',
          imageUrl: '/images/project-1.png',
        },
        {
          id: 5,
          name: 'Design.fig',
          icon: '/images/plain.png',
          kind: 'file',
          fileType: 'fig',
          href: 'https://google.com',
          position: 'top-60 right-20',
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: 'AI Resume Analyzer',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-52 right-80',
      windowPosition: 'top-[20vh] left-7',
      children: [
        {
          id: 1,
          name: 'AI Resume Analyzer Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 right-10',
          description: [
            'AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.',
            'Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.',
            'Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.',
            "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
          ],
        },
        {
          id: 2,
          name: 'ai-resume-analyzer.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl',
          position: 'top-20 left-20',
        },
        {
          id: 4,
          name: 'ai-resume-analyzer.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 left-80',
          imageUrl: '/images/project-2.png',
        },
        {
          id: 5,
          name: 'Design.fig',
          icon: '/images/plain.png',
          kind: 'file',
          fileType: 'fig',
          href: 'https://google.com',
          position: 'top-60 left-5',
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: 'Food Delivery App',
      icon: '/images/folder.png',
      kind: 'folder',
      position: 'top-10 left-80',
      windowPosition: 'top-[33vh] left-7',
      children: [
        {
          id: 1,
          name: 'Food Delivery App Project.txt',
          icon: '/images/txt.png',
          kind: 'file',
          fileType: 'txt',
          position: 'top-5 left-10',
          description: [
            'Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.',
            'Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.',
            'Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.',
            'It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.',
          ],
        },
        {
          id: 2,
          name: 'food-delivery-app.com',
          icon: '/images/safari.png',
          kind: 'file',
          fileType: 'url',
          href: 'https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-',
          position: 'top-10 right-20',
        },
        {
          id: 4,
          name: 'food-delivery-app.png',
          icon: '/images/image.png',
          kind: 'file',
          fileType: 'img',
          position: 'top-52 right-80',
          imageUrl: '/images/project-3.png',
        },
        {
          id: 5,
          name: 'Design.fig',
          icon: '/images/plain.png',
          kind: 'file',
          fileType: 'fig',
          href: 'https://google.com',
          position: 'top-60 right-20',
        },
      ],
    },
  ],
}

const ABOUT_LOCATION = {
  id: 2,
  type: 'about',
  name: 'About me',
  icon: '/icons/info.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-5',
      imageUrl: '/images/adrian.jpg',
    },
    {
      id: 2,
      name: 'casual-me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-28 right-72',
      imageUrl: '/images/adrian-2.jpg',
    },
    {
      id: 3,
      name: 'conference-me.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-52 left-80',
      imageUrl: '/images/adrian-3.jpeg',
    },
    {
      id: 4,
      name: 'about-me.txt',
      icon: '/images/txt.png',
      kind: 'file',
      fileType: 'txt',
      position: 'top-60 left-5',
      subtitle: 'Meet the Developer Behind the Code',
      image: '/images/adrian.jpg',
      description: [
        'Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.',
        'I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.',
        'I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.',
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
}

const RESUME_LOCATION = {
  id: 3,
  type: 'resume',
  name: 'Resume',
  icon: '/icons/file.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'Resume.pdf',
      icon: '/images/pdf.png',
      kind: 'file',
      fileType: 'pdf',
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
}

const TRASH_LOCATION = {
  id: 4,
  type: 'trash',
  name: 'Trash',
  icon: '/icons/trash.svg',
  kind: 'folder',
  children: [
    {
      id: 1,
      name: 'trash1.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-10 left-10',
      imageUrl: '/images/trash-1.png',
    },
    {
      id: 2,
      name: 'trash2.png',
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      position: 'top-40 left-80',
      imageUrl: '/images/trash-2.png',
    },
  ],
}

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
}

// ---------------------------------------------------------------------------
// Photo library (Photos app) — each entry reads from
// public/images/photos/<section>/<id>.png
// ---------------------------------------------------------------------------

interface PhotoEntry {
  id: string
  src: string
  alt: string
  favorite?: boolean
}

interface PhotoGroupEntry {
  date: string
  photos: PhotoEntry[]
}

function photo(
  section: string,
  id: string,
  alt: string,
  favorite = false,
): PhotoEntry {
  return { id, src: `/images/photos/${section}/${id}.png`, alt, favorite }
}

export const LIBRARY_GROUPS: PhotoGroupEntry[] = [
  {
    date: 'Jun 7, 2025',
    photos: [
      photo(
        'library',
        'gsashish1',
        'Standing in the sea at sunset, wearing a green polo',
        true,
      ),
      photo('library', 'gsashish2', 'Selfie at a colorful temple courtyard'),
      photo('library', 'gsashish3', 'Laughing at a rooftop café table'),
      photo('library', 'gsashish4', 'Portrait on a sunlit balcony, glasses on'),
    ],
  },
  {
    date: 'Mar 15, 2025',
    photos: [
      photo(
        'library',
        'gsashish5',
        'Candid laugh on a balcony, orange earbud visible',
      ),
      photo('library', 'gsashish6', 'Walking through a mall holding a drink'),
    ],
  },
]

export const MEMORIES_GROUPS: PhotoGroupEntry[] = [
  {
    date: 'Jun 7, 2025',
    photos: [
      photo(
        'memories',
        'gsashish10',
        'Standing on the shore in a teal polo, palm trees in the distance',
      ),
      photo(
        'memories',
        'gsashish7',
        'Standing on a rocky breakwater in a maroon polo, ocean behind',
      ),
      photo(
        'memories',
        'gsashish8',
        'Sitting on breakwater rocks looking out at the waves',
      ),
      photo(
        'memories',
        'gsashish16',
        'Coastal highway running alongside the beach at sunrise',
      ),
      photo(
        'memories',
        'gsashish17',
        'Empty bridge stretching toward a tree-lined island',
      ),
      photo(
        'memories',
        'gsashish11',
        'Aerial view of a river winding through green mangrove islands',
      ),
      photo(
        'memories',
        'gsashish9',
        'Sitting with two friends on breakwater rocks at sunset',
      ),
      photo(
        'memories',
        'gsashish13',
        'Silhouette of four friends watching the sunset on the rocks',
      ),
      photo(
        'memories',
        'gsashish14',
        'A second silhouette shot of the same sunset gathering',
      ),
      photo(
        'memories',
        'gsashish15',
        'Sitting alone on the breakwater rocks, watching the sunset',
      ),
      photo(
        'memories',
        'gsashish12',
        'Ocean horizon at dusk with the sun setting behind clouds',
      ),
    ],
  },
]

export const PLACES_GROUPS: PhotoGroupEntry[] = []
export const PEOPLE_GROUPS: PhotoGroupEntry[] = []
