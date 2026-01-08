import React, { useState, useMemo } from 'react';
import { useContent } from '../../context/ContentContext';
import { Star, GitFork, X, Github, ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';
import { ensureAbsoluteUrl } from '../../lib/utils';

interface ProjectsProps {
    limit?: number;
}

export const Projects: React.FC<ProjectsProps> = ({ limit }) => {
    const { projects, skills } = useContent();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    const displayProjects = useMemo(() => {
        let sorted = [...projects].sort((a, b) => {
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });

        if (limit) {
            sorted = sorted.slice(0, limit);
        }
        return sorted;
    }, [projects, limit]);

    const getTechIcon = (techName: string) => {
        const skill = skills.find(s => s.name.toLowerCase() === techName.toLowerCase());
        return skill ? (
            <span className="text-xl" title={skill.name}>{skill.icon}</span>
        ) : (
            <span title={techName}>
                <Code2 size={20} className="text-slate-400" />
            </span>
        );
    };

    return (
        <>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={limit ? { opacity: 1 } : "hidden"}
                whileInView={limit ? undefined : "visible"}
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.05 }
                    }
                }}
            >
                {displayProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        variants={limit ? {} : {
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                        onClick={() => setSelectedProject(project)}
                        className="border border-border rounded-xl p-5 bg-gradient-to-br from-background to-surface/30 flex flex-col justify-between hover:border-slate-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer group"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-slate-400 group-hover:text-blue-400 transition-colors">
                                    <Code2 size={18} />
                                </span>
                                <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors text-sm truncate">
                                    {project.title}
                                </span>
                                <span className="border border-border rounded-full px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider text-slate-500 ml-auto">Public</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 pt-3 border-t border-border/50">
                            {project.techStack[0] && (
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block shadow-[0_0_8px_rgba(250,204,21,0.4)]"></span>
                                    <span>{project.techStack[0]}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                                <Star size={14} />
                                <span>{Math.floor(Math.random() * 50) + 1}</span>
                            </div>
                            <div className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                <GitFork size={14} />
                                <span>{Math.floor(Math.random() * 20) + 1}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0d1117] border border-[#30363d] rounded-xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start p-4 border-b border-[#30363d] bg-[#0d1117]/95 backdrop-blur z-10 flex-shrink-0">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                        <svg aria-hidden="true" height="20" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" className="fill-slate-400">
                                            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.45a.25.25 0 0 1-.4-.2Z"></path>
                                        </svg>
                                        {selectedProject.title}
                                    </h2>
                                    <div className="flex gap-2 mt-2">
                                        {selectedProject.demoUrl && (
                                            <a href={ensureAbsoluteUrl(selectedProject.demoUrl)} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 text-blue-400 hover:underline border border-blue-400/30 px-2 py-0.5 rounded-full bg-blue-400/10">
                                                <ExternalLink size={12} /> Live Demo
                                            </a>
                                        )}
                                        {selectedProject.repoUrl && (
                                            <a href={ensureAbsoluteUrl(selectedProject.repoUrl)} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 text-slate-300 hover:text-white border border-slate-600 px-2 py-0.5 rounded-full hover:bg-slate-800">
                                                <Github size={12} /> Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-red-400 transition-colors p-1 hover:bg-slate-800 rounded-md">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
                                {/* Images */}
                                <div className="space-y-3">
                                    <div
                                        className="aspect-video w-full bg-slate-900 rounded-lg overflow-hidden border border-[#30363d] cursor-zoom-in group"
                                        onClick={() => setExpandedImage(selectedProject.imageUrl)}
                                    >
                                        <img
                                            src={selectedProject.imageUrl}
                                            alt={selectedProject.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {selectedProject.gallery.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="aspect-video bg-slate-900 rounded-md overflow-hidden border border-[#30363d] hover:border-blue-400 transition-colors cursor-zoom-in group"
                                                    onClick={() => setExpandedImage(img)}
                                                >
                                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Description & Tech Stack */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">About Project</h3>
                                        <p className="text-slate-300 leading-relaxed text-sm">
                                            {selectedProject.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Technologies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techStack.map((tech) => (
                                                <div key={tech} className="flex items-center gap-1.5 bg-[#161b22] border border-[#30363d] px-2.5 py-1 rounded-md text-xs text-slate-300">
                                                    {getTechIcon(tech)}
                                                    <span>{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {expandedImage && (
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={() => setExpandedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
                        >
                            <X size={32} />
                        </motion.button>
                        <motion.img
                            src={expandedImage}
                            alt="Expanded view"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
