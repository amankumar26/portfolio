import type { ProfileData } from '../types';

export const profileData: ProfileData = {
    name: "Aman Kumar Sharma ",
    title: "Full Stack Developer",
    bio: "I build accessible, pixel-perfect, performant, and gamified web experiences. I am passionate about creating intuitive and engaging user interfaces that solve real-world problems. Looking for new quests in the realm of web development.",
    avatarUrl: "",
    stats: [
        { label: "Years Experience", value: "2+" },
        { label: "Projects Completed", value: "10+" },
        { label: "Bosses Defeated", value: "5" },
        { label: "Code Commits", value: "1.2k+" }
    ],
    socialLinks: {
        github: "https://github.com/amank",
        linkedin: "https://linkedin.com/in/amank",
        email: "mailto:contact@example.com",
    },
    competitive: {
        leetcode: {
            username: "amank",
            profileUrl: "https://leetcode.com/",
            easy: 10,
            medium: 5,
            hard: 2
        }
    }
};
