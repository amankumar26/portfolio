import React from 'react';
import { useContent } from '../../context/ContentContext';
import { Trophy, ExternalLink, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Competitive: React.FC = () => {
    const { profile, activities } = useContent();

    if (!profile.competitive) return null;

    // Calculate dynamic stats from activity

    // Calculate dynamic stats from activity
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


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 text-slate-200">Competitive Programming</h2>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x custom-scrollbar">
                {/* LeetCode Card */}

                {profile.competitive.platforms?.map((platform, idx) => {
                    const platformKey = platform.name.toLowerCase();
                    const stats = platformStats[platformKey] || { easy: 0, medium: 0, hard: 0 };

                    const easy = (platform.easy || 0) + (stats?.easy || 0);
                    const medium = (platform.medium || 0) + (stats?.medium || 0);
                    const hard = (platform.hard || 0) + (stats?.hard || 0);

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.01 }}
                            className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center border border-border rounded-xl p-6 bg-gradient-to-br from-background to-surface/50 shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="p-3 bg-blue-500/10 rounded-xl"
                                >
                                    <Trophy className="text-blue-500" size={24} />
                                </motion.div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-100">{platform.name}</h3>
                                    <a href={platform.profileUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
                                        @{platform.username || 'user'}
                                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50 hover:border-green-500/30 transition-colors">
                                    <div className="text-green-500 font-bold text-xl">{easy}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-semibold">Easy</div>
                                </div>
                                <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50 hover:border-yellow-500/30 transition-colors">
                                    <div className="text-yellow-500 font-bold text-xl">{medium}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-semibold">Medium</div>
                                </div>
                                <div className="text-center p-3 bg-surface/50 rounded-lg border border-border/50 hover:border-red-500/30 transition-colors">
                                    <div className="text-red-500 font-bold text-xl">{hard}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-semibold">Hard</div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-sm">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <CheckCircle2 size={14} /> Total Solved
                                </span>
                                <span className="font-bold text-slate-200 text-lg flex items-center gap-1">
                                    <TrendingUp size={16} className="text-blue-500" />
                                    {(Number(easy) || 0) + (Number(medium) || 0) + (Number(hard) || 0)}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {activities && activities.length > 0 && (
                <div className="pt-6 border-t border-border">
                    <h3 className="text-xl font-bold mb-6 text-slate-200">Problem Solving Activity</h3>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="relative border-l border-slate-800 ml-3 space-y-8 pb-2"
                    >
                        {activities && [...activities]
                            .sort((a, b) => {
                                const dateA = new Date(a.date).getTime();
                                const dateB = new Date(b.date).getTime();
                                if (dateB !== dateA) return dateB - dateA;
                                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
                            })
                            .slice(0, 5)
                            .map((act, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="relative pl-8 group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.5, borderColor: '#3b82f6' }}
                                        className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-900 border border-slate-600 group-hover:bg-blue-500/20 transition-colors"
                                    />

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                        <h4 className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                            {act.problemName}
                                            <span className="text-slate-500 font-normal text-xs px-1.5 py-0.5 rounded-full border border-slate-800 bg-slate-900">#{act.problemId}</span>
                                        </h4>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Calendar size={12} />
                                            <time>
                                                {new Date(act.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </time>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                                            {act.platform}
                                        </span>
                                        {act.difficulty && (
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${act.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                act.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                {act.difficulty}
                                            </span>
                                        )}
                                        {act.url && (
                                            <a href={act.url} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                                                View Problem <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};
