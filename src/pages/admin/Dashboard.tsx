import React from 'react';
import { Card } from '../../components/ui/Card';
import { useContent } from '../../context/ContentContext';
import { Users, FolderKanban, BarChart3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const { projects, skills, profile, activities } = useContent();

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'text-blue-400' },
        { label: 'Profile Views', value: profile.views || 0, icon: Users, color: 'text-green-400' },
        { label: 'Total Skills', value: skills.length, icon: BarChart3, color: 'text-amber-400' },
    ];

    // Mock traffic data for the chart
    const trafficData = [
        { day: 'Mon', views: 40 },
        { day: 'Tue', views: 65 },
        { day: 'Wed', views: 45 },
        { day: 'Thu', views: 90 },
        { day: 'Fri', views: 75 },
        { day: 'Sat', views: 120 },
        { day: 'Sun', views: 85 },
    ];

    const maxViews = Math.max(...trafficData.map(d => d.views));

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
                            {idx === 0 && projects.length > 0 && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">+1 this month</span>}
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-100 mt-1 tracking-tight">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface border border-border rounded-md p-6 h-80 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-200 mb-6">Traffic Analytics (Last 7 Days)</h3>
                    <div className="flex-1 flex items-end justify-between gap-2 px-2">
                        {trafficData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-primary/20 hover:bg-primary/40 rounded-t transition-all duration-300 relative"
                                    style={{ height: `${(data.views / maxViews) * 100}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {data.views} views
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-500 uppercase font-medium">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-surface border border-border rounded-md p-6 h-80 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-semibold text-slate-200">Recent Activity</h3>
                        <span className="text-xs text-primary hover:underline cursor-pointer">View all</span>
                    </div>
                    <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {[
                            ...projects.map(p => ({ action: `Added/Updated Project: ${p.title}`, date: new Date(p.createdAt || Date.now()), color: 'bg-blue-400' })),
                            ...activities.map(a => ({ action: `Solved: ${a.problemName} (${a.platform})`, date: new Date(a.date), color: 'bg-green-400' })),
                        ]
                            .sort((a, b) => b.date.getTime() - a.date.getTime())
                            .slice(0, 10)
                            .map((item, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.color}`}></div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-slate-300 font-medium leading-none">{item.action}</span>
                                        <span className="text-xs text-slate-500">
                                            {item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
