import React from 'react';
import { Card } from '../../components/ui/Card';
import { mockProjects } from '../../data/mockData';
import { TrendingUp, Users, FolderKanban } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Total Projects', value: mockProjects.length, icon: FolderKanban, color: 'text-blue-400' },
        { label: 'Profile Views', value: '1,234', icon: Users, color: 'text-green-400' },
        { label: 'XP Awarded', value: '5,600', icon: TrendingUp, color: 'text-purple-400' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-light text-slate-100">Overview</h1>
                <p className="text-slate-400">Welcome back, Commander.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="bg-surface border-border p-6 hover:border-slate-600 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-2 rounded-md bg-slate-800/50 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            {idx === 0 && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">+2 this week</span>}
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface border border-border rounded-md p-6 h-64 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4">Traffic Analytics</h3>
                    <div className="flex-1 flex items-center justify-center text-slate-600 border border-dashed border-border rounded bg-background/50">
                        Analytics Chart Placeholder
                    </div>
                </div>
                <div className="bg-surface border border-border rounded-md p-6 h-64 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span className="text-slate-400">Updated profile picture</span>
                                <span className="ml-auto text-xs text-slate-600">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
