import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import type { Project } from '../../types';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export const AdminProjects: React.FC = () => {
    const { projects, addProject, updateProject, deleteProject } = useContent();
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({});

    const initialProject: Partial<Project> = {
        title: '',
        description: '',
        techStack: [],
        imageUrl: '',
        gallery: [],
        demoUrl: '',
        repoUrl: '',
        featured: false,
    };

    const handleEdit = (project: Project) => {
        setCurrentProject({ ...project, gallery: project.gallery || [] });
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentProject(initialProject);
        setIsEditing(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentProject.id) {
            updateProject(currentProject.id, currentProject);
        } else {
            addProject({
                ...currentProject,
                id: uuidv4(),
                techStack: currentProject.techStack || [],
                imageUrl: currentProject.imageUrl || 'https://via.placeholder.com/800x400',
                gallery: currentProject.gallery || []
            } as Project);
        }
        setIsEditing(false);
        setCurrentProject({});
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                setCurrentProject(prev => ({ ...prev, imageUrl: data.url }));
            } catch (err) {
                console.error("Upload failed", err);
                alert("Image upload failed");
            }
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(async (file) => {
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();

                    setCurrentProject(prev => ({
                        ...prev,
                        gallery: [...(prev.gallery || []), data.url]
                    }));
                } catch (err) {
                    console.error("Gallery upload failed", err);
                }
            });
        }
    };

    const removeGalleryImage = (index: number) => {
        setCurrentProject(prev => ({
            ...prev,
            gallery: prev.gallery?.filter((_, i) => i !== index)
        }));
    };

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X size={20} className="mr-2" />
                        Cancel
                    </Button>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentProject.title || ''}
                                    onChange={e => setCurrentProject(p => ({ ...p, title: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Description</label>
                                <input
                                    type="text"
                                    required
                                    value={currentProject.description || ''}
                                    onChange={e => setCurrentProject(p => ({ ...p, description: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Tech Stack (comma separated)</label>
                                <input
                                    type="text"
                                    value={currentProject.techStack?.join(', ') || ''}
                                    onChange={e => setCurrentProject(p => ({ ...p, techStack: e.target.value.split(',').map(s => s.trim()) }))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                                    placeholder="React, Node.js, TypeScript"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Cover Image</label>
                                <div className="flex gap-4 items-center">
                                    {currentProject.imageUrl && (
                                        <img src={currentProject.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded border border-slate-700" />
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm text-slate-400">Gallery Images</label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryUpload}
                                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
                                    />
                                    {currentProject.gallery && currentProject.gallery.length > 0 && (
                                        <div className="grid grid-cols-4 gap-4">
                                            {currentProject.gallery.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-24 object-cover rounded border border-slate-700" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(idx)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Demo URL</label>
                                <input
                                    type="text"
                                    value={currentProject.demoUrl || ''}
                                    onChange={e => setCurrentProject(p => ({ ...p, demoUrl: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Repository URL</label>
                                <input
                                    type="text"
                                    value={currentProject.repoUrl || ''}
                                    onChange={e => setCurrentProject(p => ({ ...p, repoUrl: e.target.value }))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={currentProject.featured || false}
                                onChange={e => setCurrentProject(p => ({ ...p, featured: e.target.checked }))}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary"
                            />
                            <label htmlFor="featured" className="text-sm text-slate-300">Feature this project (Pinned)</label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit">Save Project</Button>
                        </div>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                <Button onClick={handleAddNew}>
                    <Plus size={20} className="mr-2" />
                    Add Project
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Card key={project.id} className="overflow-hidden group flex flex-col h-full">
                        <div className="relative h-48 overflow-hidden shrink-0">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button size="sm" onClick={() => handleEdit(project)}>
                                    <Edit2 size={16} className="mr-2" /> Edit
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300 border-red-900/50 hover:bg-red-900/20" onClick={() => handleDelete(project.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                            {project.gallery && project.gallery.length > 0 && (
                                <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white">
                                    +{project.gallery.length} more
                                </div>
                            )}
                        </div>
                        <div className="p-4 space-y-3 flex flex-col flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-slate-200">{project.title}</h3>
                                {project.featured && (
                                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full border border-primary/20">Pinned</span>
                                )}
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-2 flex-1">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.techStack.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="text-xs text-slate-500">+{project.techStack.length - 3}</span>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
