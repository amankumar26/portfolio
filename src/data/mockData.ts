import type { Project, Skill } from '../types';

export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'Neon Commerce',
        description: 'A futuristic e-commerce platform with 3D product previews.',
        techStack: ['React', 'Three.js', 'Tailwind'],
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80',
        featured: true,
        createdAt: '2025-01-15T12:00:00Z'
    },
    {
        id: '2',
        title: 'Cyber Dashboard',
        description: 'Real-time analytics dashboard with cyberpunk aesthetics.',
        techStack: ['Vue', 'D3.js', 'Firebase'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        featured: true,
        createdAt: '2025-03-10T09:30:00Z'
    }
];

export const mockSkills: Skill[] = [
    { id: '1', name: 'React', level: 90, category: 'Frontend', icon: '⚛️' },
    { id: '2', name: 'TypeScript', level: 85, category: 'Frontend', icon: 'TS' },
    { id: '3', name: 'Node.js', level: 75, category: 'Backend', icon: '🟢' },
    { id: '4', name: 'Figma', level: 80, category: 'Design', icon: '🎨' },
];
