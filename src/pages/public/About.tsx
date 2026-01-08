import React from 'react';
import { Card } from '../../components/ui/Card';
import { mockSkills } from '../../data/mockData';
import { profileData } from '../../data/profile';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <section className="space-y-6">
                <h2 className="text-3xl font-bold">Character Profile</h2>
                <Card className="flex flex-col md:flex-row gap-8 items-center md:items-start p-8">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-700 overflow-hidden flex-shrink-0 border-4 border-primary shadow-glow">
                        {profileData.avatarUrl ? (
                            <img
                                src={profileData.avatarUrl}
                                alt={profileData.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                                {profileData.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="space-y-4 text-center md:text-left flex-1">
                        <div>
                            <h3 className="text-3xl font-bold text-white">{profileData.name}</h3>
                            <p className="text-secondary text-xl font-medium">{profileData.title}</p>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {profileData.bio}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                            {profileData.stats.map((stat, idx) => (
                                <div key={idx} className="text-center md:text-left">
                                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </section>

            <section className="space-y-6">
                <h2 className="text-3xl font-bold">Skill Tree</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockSkills.map((skill, idx) => (
                        <Card key={idx} className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                            <div className="text-3xl bg-slate-800 w-12 h-12 flex items-center justify-center rounded-lg">{skill.icon}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <span className="font-bold text-white">{skill.name}</span>
                                    <span className="text-sm text-primary font-mono">Lvl {skill.level}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};
