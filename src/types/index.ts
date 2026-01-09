export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    demoUrl?: string;
    repoUrl?: string;
    stars?: number;
    forks?: number;
    featured?: boolean;
    createdAt?: string; // ISO Date string
    gallery?: string[]; // Multiple images
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 0-100 or 1-10
    category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
    icon: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

export interface LeetCodeStats {
    username?: string; // Added optional username
    easy: number;
    medium: number;
    hard: number;
    profileUrl: string;
}

export interface CompetitivePlatform {
    name: string;
    username: string;
    easy?: number;
    medium?: number;
    hard?: number;
    rating?: number;
    maxRating?: number; // Added for better stats display
    rank?: string;
    profileUrl: string;
    icon?: string;
}

export interface ProblemActivity {
    problemName: string;
    problemId: string;
    platform: string;
    date: string; // ISO Date string
    url?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
}

export interface CompetitiveStats {
    leetcode: LeetCodeStats;
    platforms?: CompetitivePlatform[]; // Generic support for other platforms
    activity?: ProblemActivity[];
}

export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

export interface ProfileData {
    name: string;
    title: string;
    bio: string;
    avatarUrl: string;
    views?: number;
    stats: { label: string; value: string }[];
    socialLinks: SocialLinks;
    resumeUrl?: string; // Added optional resume URL
    competitive?: CompetitiveStats;
}
