import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useContent } from '../../context/ContentContext';
import { Save } from 'lucide-react';


export const AdminCompetitive: React.FC = () => {
    const { profile, updateProfile, addActivity, activities } = useContent();

    // Calculate dynamic stats from activity for ALL platforms
    const platformStats: Record<string, { easy: number, medium: number, hard: number }> = {};

    activities.forEach(act => {
        const platformKey = act.platform.toLowerCase();
        if (!platformStats[platformKey]) {
            platformStats[platformKey] = { easy: 0, medium: 0, hard: 0 };
        }

        if (act.difficulty === 'Easy') platformStats[platformKey].easy++;
        else if (act.difficulty === 'Medium') platformStats[platformKey].medium++;
        else if (act.difficulty === 'Hard') platformStats[platformKey].hard++;
    });


    const [platforms, setPlatforms] = useState(profile.competitive?.platforms || []);
    const [newPlatform, setNewPlatform] = useState<any>({ name: '', username: '', profileUrl: '', easy: 0, medium: 0, hard: 0 });

    const handlePlatformAdd = () => {
        if (newPlatform.name && newPlatform.profileUrl) {
            const updated = [...platforms, { ...newPlatform, easy: Number(newPlatform.easy), medium: Number(newPlatform.medium), hard: Number(newPlatform.hard) }];
            setPlatforms(updated);
            setNewPlatform({ name: '', username: '', profileUrl: '', easy: 0, medium: 0, hard: 0 });
        }
    };

    const removePlatform = (index: number) => {
        setPlatforms(platforms.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        updateProfile({
            competitive: {
                ...profile.competitive!,
                platforms: platforms
            }
        });
        alert('Competitive stats updated!');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Competitive Stats</h2>


            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Platforms</h3>
                <Button onClick={handleSave}>
                    <Save size={18} className="mr-2" />
                    Save All
                </Button>
            </div>

            <div className="grid gap-4">
                {platforms.map((p, idx) => {
                    const platformKey = p.name.toLowerCase();
                    const stats = platformStats[platformKey];
                    const hasActivity = stats !== undefined;
                    const easy = hasActivity ? stats.easy : (p.easy || 0);
                    const medium = hasActivity ? stats.medium : (p.medium || 0);
                    const hard = hasActivity ? stats.hard : (p.hard || 0);

                    return (
                        <Card key={idx} className="p-4 flex flex-col md:flex-row gap-4 items-end md:items-center">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                <div>
                                    <span className="text-xs text-slate-400 block">Platform</span>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{p.name}</span>
                                        {p.username && <span className="text-xs text-slate-500">@{p.username}</span>}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Easy</span>
                                    <span className="font-medium text-green-400">{easy}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Medium</span>
                                    <span className="font-medium text-yellow-400">{medium}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Hard</span>
                                    <span className="font-medium text-red-400">{hard}</span>
                                </div>
                            </div>
                            <Button variant="secondary" className="hover:text-red-400 hover:bg-red-400/10" size="sm" onClick={() => removePlatform(idx)}>Remove</Button>
                        </Card>
                    );
                })}

                <Card className="p-6 border-dashed border-slate-700 bg-transparent">
                    <h4 className="text-sm font-medium mb-4 text-slate-300">Add New Platform</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Name</label>
                            <input
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="e.g. CodeForces"
                                value={newPlatform.name}
                                onChange={e => setNewPlatform({ ...newPlatform, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Username</label>
                            <input
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="e.g. user123"
                                value={newPlatform.username}
                                onChange={e => setNewPlatform({ ...newPlatform, username: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Profile URL</label>
                            <input
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="https://..."
                                value={newPlatform.profileUrl}
                                onChange={e => setNewPlatform({ ...newPlatform, profileUrl: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Easy Solved</label>
                            <input
                                type="number"
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="0"
                                value={newPlatform.easy || ''}
                                onChange={e => setNewPlatform({ ...newPlatform, easy: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Medium Solved</label>
                            <input
                                type="number"
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="0"
                                value={newPlatform.medium || ''}
                                onChange={e => setNewPlatform({ ...newPlatform, medium: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400">Hard Solved</label>
                            <input
                                type="number"
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                                placeholder="0"
                                value={newPlatform.hard || ''}
                                onChange={e => setNewPlatform({ ...newPlatform, hard: Number(e.target.value) })}
                            />
                        </div>
                        <Button onClick={handlePlatformAdd} disabled={!newPlatform.name || !newPlatform.profileUrl}>Add</Button>
                    </div>
                </Card>
            </div >

            <div className="flex justify-between items-center mt-8">
                <h3 className="text-xl font-semibold">Problem Solving Activity</h3>
            </div>


            <Card className="p-6 border-dashed border-slate-700 bg-transparent space-y-4">
                <h4 className="text-sm font-medium text-slate-300">Add Solved Problem</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                        placeholder="Problem Name"
                        id="prob-name"
                    />
                    <input
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                        placeholder="Problem ID / Number"
                        id="prob-id"
                    />
                    <input
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
                        placeholder="Platform (LeetCode, CodeForces...)"
                        id="prob-platform"
                    />
                    <select
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-400"
                        id="prob-difficulty"
                        defaultValue="Medium"
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <input
                        type="date"
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-400"
                        id="prob-date"
                    />
                    <input
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm md:col-span-2"
                        placeholder="Problem URL (Optional)"
                        id="prob-url"
                    />
                </div>
                <Button onClick={() => {
                    const problemName = (document.getElementById('prob-name') as HTMLInputElement).value;
                    const problemId = (document.getElementById('prob-id') as HTMLInputElement).value;
                    const platform = (document.getElementById('prob-platform') as HTMLInputElement).value;
                    const difficulty = (document.getElementById('prob-difficulty') as HTMLSelectElement).value;
                    const date = (document.getElementById('prob-date') as HTMLInputElement).value;
                    const url = (document.getElementById('prob-url') as HTMLInputElement).value;

                    if (problemName && problemId && platform && date) {
                        const newActivity = { problemName, problemId, platform, date, url, difficulty };
                        addActivity(newActivity);
                        alert('Activity added!');

                        // Clear inputs
                        (document.getElementById('prob-name') as HTMLInputElement).value = '';
                        (document.getElementById('prob-id') as HTMLInputElement).value = '';
                        (document.getElementById('prob-platform') as HTMLInputElement).value = '';
                        (document.getElementById('prob-difficulty') as HTMLSelectElement).value = 'Medium';
                        (document.getElementById('prob-date') as HTMLInputElement).value = '';
                        (document.getElementById('prob-url') as HTMLInputElement).value = '';
                    } else {
                        alert('Please fill in required fields (Name, ID, Platform, Date)');
                    }
                }}>Add Activity</Button>
            </Card>
        </div >
    );
};
