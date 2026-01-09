import type { ProfileData } from '../types';

export const profileData: ProfileData = {
    name: "Aman Kumar Sharma ",
    title: "Full Stack Developer",
    bio: "I build accessible, pixel-perfect, performant, and gamified web experiences. I am passionate about creating intuitive and engaging user interfaces that solve real-world problems. Looking for new quests in the realm of web development.",
    avatarUrl: "",
    stats: [
        { label: "Active Years", value: "3+" },
        { label: "Coffee Consumed", value: "∞" },
        { label: "Open Source", value: "15+" }
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
