import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProfileSidebar } from '../../components/sections/ProfileSidebar';
import { Projects } from './Projects';
import { Skills } from '../../components/sections/Skills';
import { Competitive } from '../../components/sections/Competitive';
import { ContributionGraph } from '../../components/sections/ContributionGraph';
import { useContent } from '../../context/ContentContext';
import { BookOpen, Box, Star, GitBranch, GitCommit, ExternalLink, Github } from 'lucide-react';

export const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'overview';

    const setActiveTab = (tab: string) => {
        setSearchParams({ tab });
    };

    const { projects, activities } = useContent();

    // Increment profile view count on mount
    React.useEffect(() => {
        fetch('/api/profile/view', { method: 'POST' }).catch(console.error);
    }, []);

    // Memoize recent activity
    const recentActivity = projects
        .filter(p => p.createdAt)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        .slice(0, 5);

    return (
        <div className="max-w-[1280px] mx-auto pt-8 px-4 md:px-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Sidebar (Profile) */}
                <div className="md:col-span-3 lg:col-span-3 -mt-4 md:mt-0">
                    <ProfileSidebar />
                </div>

                {/* Main Content */}
                <div className="md:col-span-9 lg:col-span-9">
                    {/* Tabs Navigation */}
                    <div className="flex overflow-x-auto border-b border-border mb-6 scrollbar-hide">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-[#fd8c73] text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                        >
                            <BookOpen size={16} />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('repositories')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'repositories' ? 'border-[#fd8c73] text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                        >
                            <Box size={16} />
                            Repositories
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-xs ml-1">{projects.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('competitions')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'competitions' ? 'border-[#fd8c73] text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                        >
                            <Star size={16} />
                            Competitions
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'skills' ? 'border-[#fd8c73] text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
                        >
                            <GitBranch size={16} />
                            Skills
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in duration-300">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h2 className="text-base text-slate-200 font-medium">Pinned</h2>
                                    <span className="text-xs text-blue-400 hover:underline cursor-pointer">Customize your pins</span>
                                </div>
                                <Projects limit={4} />

                                <div className="mt-8 space-y-8">
                                    <div>
                                        <h2 className="text-base text-slate-200 font-medium mb-4">Contribution Activity</h2>
                                        <ContributionGraph projects={projects} activities={activities} />
                                    </div>

                                    <div>
                                        <h2 className="text-base text-slate-200 font-medium mb-4 flex items-center gap-2">
                                            Recent Activity
                                            <span className="text-xs text-slate-500 font-normal">({recentActivity.length})</span>
                                        </h2>
                                        <div className="relative pl-2 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                            {/* Vertical Line */}
                                            <div className="absolute top-2 bottom-0 left-[19px] w-[1px] bg-slate-800"></div>

                                            {recentActivity.length > 0 ? recentActivity.map((project, idx) => (
                                                <div key={idx} className="mb-6 relative pl-10 group">
                                                    {/* Node */}
                                                    <span className="absolute left-[8px] top-1 w-6 h-6 bg-[#0d1117] border border-slate-700 rounded-full flex items-center justify-center z-10 group-hover:border-blue-400 group-hover:text-blue-400 text-slate-500 transition-colors">
                                                        <GitCommit size={14} />
                                                    </span>

                                                    {/* Content Card */}
                                                    <div className="flex flex-col bg-surface/30 p-3 rounded-md border border-transparent hover:border-slate-700 transition-colors">
                                                        <div className="flex gap-3">
                                                            {/* Thumbnail */}
                                                            {project.imageUrl && (
                                                                <div className="flex-shrink-0 mt-1">
                                                                    <img
                                                                        src={project.imageUrl}
                                                                        alt={project.title}
                                                                        className="w-10 h-10 rounded object-cover border border-slate-700 bg-slate-800"
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] text-slate-500 mb-0.5">Created new project</span>
                                                                        <span className="text-sm text-slate-200 font-medium hover:text-blue-400 hover:underline cursor-pointer transition-colors truncate">
                                                                            {project.title}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[10px] text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-800 flex-shrink-0 ml-2">
                                                                        {new Date(project.createdAt!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                                    </span>
                                                                </div>

                                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                                                                    {project.description}
                                                                </p>

                                                                <div className="flex flex-wrap gap-2 mt-2 items-center">
                                                                    {project.techStack.slice(0, 3).map(tech => (
                                                                        <span key={tech} className="text-[10px] text-slate-500 flex items-center gap-1">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                    {(project.demoUrl || project.repoUrl) && (
                                                                        <div className="flex gap-2 ml-auto">
                                                                            {project.demoUrl && (
                                                                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400" title="Live Demo">
                                                                                    <ExternalLink size={12} />
                                                                                </a>
                                                                            )}
                                                                            {project.repoUrl && (
                                                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400" title="View Code">
                                                                                    <Github size={12} />
                                                                                </a>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="pl-10 py-2 text-sm text-slate-500 italic">No recent activity</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'repositories' && (
                            <div className="animate-in fade-in duration-300">
                                <Projects />
                            </div>
                        )}

                        {activeTab === 'competitions' && (
                            <div className="animate-in fade-in duration-300">
                                <Competitive />
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="animate-in fade-in duration-300">
                                <Skills />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
