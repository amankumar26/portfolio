import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileData as initialProfile } from '../data/profile';
import type { ProfileData, Project, Skill, ProblemActivity } from '../types';
import { mockProjects, mockSkills } from '../data/mockData';

interface ContentContextType {
    profile: ProfileData;
    projects: Project[];
    skills: Skill[];
    activities: ProblemActivity[];
    updateProfile: (data: Partial<ProfileData>) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, data: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    updateSkills: (skills: Skill[]) => void;
    addActivity: (activity: ProblemActivity) => void;
    deleteActivity: (id: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state
    const [profile, setProfile] = useState<ProfileData>(initialProfile);
    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [skills, setSkills] = useState<Skill[]>(mockSkills);
    const [activities, setActivities] = useState<ProblemActivity[]>([]);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, projectsRes] = await Promise.all([
                    fetch('/api/profile'),
                    fetch('/api/projects')
                ]);

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    if (profileData) setProfile(prev => ({ ...prev, ...profileData }));
                }

                if (projectsRes.ok) {
                    const projectsData = await projectsRes.json();
                    setProjects(projectsData);
                }

                const activitiesRes = await fetch('/api/activities');
                if (activitiesRes.ok) {
                    const activitiesData = await activitiesRes.json();
                    setActivities(activitiesData);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    // Actions
    const updateProfile = async (data: Partial<ProfileData>) => {
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const updated = await res.json();
            setProfile(prev => ({ ...prev, ...updated }));
        } catch (err) {
            console.error(err);
        }
    };

    const addProject = async (project: Project) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            });
            const newProject = await res.json();
            setProjects(prev => [newProject, ...prev]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateProject = async (id: string, data: Partial<Project>) => {
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const updated = await res.json();
            setProjects(prev => prev.map(p => p.id === id ? updated : p));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateSkills = (newSkills: Skill[]) => {
        // TODO: Add API for skills if needed. For now keeping local behavior or we can add a Skills model too.
        // Assuming skills might be part of profile or separate. User didn't ask for Skills API yet explicitly but good to have.
        setSkills(newSkills);
        localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
    };

    const addActivity = async (activity: ProblemActivity) => {
        try {
            const res = await fetch('/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activity)
            });
            const newActivity = await res.json();
            setActivities(prev => [newActivity, ...prev]);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteActivity = async (id: string) => {
        try {
            await fetch(`/api/activities/${id}`, { method: 'DELETE' });
            setActivities(prev => prev.filter(a => (a as any)._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ContentContext.Provider value={{
            profile,
            projects,
            skills,
            activities,
            updateProfile,
            addProject,
            updateProject,
            deleteProject,
            updateSkills,
            addActivity,
            deleteActivity
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) throw new Error('useContent must be used within a ContentProvider');
    return context;
};
