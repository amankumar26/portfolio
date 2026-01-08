import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useContent } from '../../context/ContentContext';
import { Plus, Trash2 } from 'lucide-react';
import type { Skill } from '../../types';

export const AdminSkills: React.FC = () => {
    const { skills, updateSkills } = useContent();
    const [newSkill, setNewSkill] = useState<Partial<Skill>>({ name: '', category: 'Frontend', level: 50, icon: '⚡' });

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this skill?')) {
            const updated = skills.filter(s => s.id !== id);
            updateSkills(updated);
        }
    };

    const handleAdd = () => {
        if (!newSkill.name) return;
        const skill: Skill = {
            id: Date.now().toString(),
            name: newSkill.name!,
            category: newSkill.category as any,
            level: newSkill.level || 50,
            icon: newSkill.icon || '⚡'
        };
        updateSkills([...skills, skill]);
        setNewSkill({ name: '', category: 'Frontend', level: 50, icon: '⚡' });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Skills</h2>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Name</label>
                        <input
                            type="text"
                            value={newSkill.name}
                            onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                            placeholder="React, Python..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Category</label>
                        <select
                            value={newSkill.category}
                            onChange={e => setNewSkill({ ...newSkill, category: e.target.value as any })}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Languages">Languages</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Level (0-100)</label>
                        <input
                            type="number"
                            value={newSkill.level}
                            onChange={e => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Icon (Emoji)</label>
                        <input
                            type="text"
                            value={newSkill.icon}
                            onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                        />
                    </div>
                </div>
                <Button className="mt-4 w-full md:w-auto" onClick={handleAdd}>
                    <Plus size={18} className="mr-2" />
                    Add Skill
                </Button>
            </Card>

            <div className="grid gap-4">
                {skills.map(skill => (
                    <Card key={skill.id} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="text-2xl w-10 h-10 bg-slate-800 rounded flex items-center justify-center">
                                {skill.icon}
                            </div>
                            <div>
                                <h4 className="font-bold">{skill.name}</h4>
                                <div className="text-xs text-slate-400">
                                    {skill.category} • Lvl {skill.level}
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-red-400 hover:bg-red-900/20" onClick={() => handleDelete(skill.id)}>
                            <Trash2 size={18} />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};
