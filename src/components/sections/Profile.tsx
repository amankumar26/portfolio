import React from 'react';
import { Card } from '../ui/Card';
import { useContent } from '../../context/ContentContext';

export const Profile: React.FC = () => {
    const { profile } = useContent();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
            <Card className="flex flex-col md:flex-row gap-8 items-center md:items-start p-6 md:p-8">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 border-4 border-primary shadow-glow">
                    {profile.avatarUrl ? (
                        <img
                            src={profile.avatarUrl}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                            {profile.name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="space-y-4 text-center md:text-left flex-1">
                    <div>
                        <h3 className="text-3xl font-bold text-white">{profile.name}</h3>
                        <p className="text-secondary text-xl font-medium">{profile.title}</p>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        {profile.bio}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                        {profile.stats.map((stat, idx) => (
                            <div key={idx} className="text-center md:text-left">
                                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
