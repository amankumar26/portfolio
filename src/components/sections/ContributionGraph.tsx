import React, { useMemo } from 'react';
import type { Project, ProblemActivity } from '../../types';
import { motion } from 'framer-motion';
import { Flame, Trophy, CalendarDays } from 'lucide-react';

interface ContributionGraphProps {
    projects: Project[];
    activities?: ProblemActivity[];
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ projects, activities = [] }) => {
    // 1. Generate dates for the last 365 days
    const contributionData = useMemo(() => {
        const today = new Date();
        const dates: { date: Date; count: number; projects: number; activities: number }[] = [];

        // Create a map of project creation dates (normalized to YYYY-MM-DD)
        const dailyCounts: Record<string, { projects: number; activities: number }> = {};

        projects.forEach(p => {
            if (p.createdAt) {
                const dateKey = new Date(p.createdAt).toISOString().split('T')[0];
                if (!dailyCounts[dateKey]) dailyCounts[dateKey] = { projects: 0, activities: 0 };
                dailyCounts[dateKey].projects++;
            }
        });

        activities.forEach(a => {
            const dateKey = new Date(a.date).toISOString().split('T')[0];
            if (!dailyCounts[dateKey]) dailyCounts[dateKey] = { projects: 0, activities: 0 };
            dailyCounts[dateKey].activities++;
        });

        // Generate 52 weeks * 7 days = 364 days approx
        for (let i = 0; i < 52 * 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - (52 * 7 - 1 - i));
            const dateKey = d.toISOString().split('T')[0];
            const counts = dailyCounts[dateKey] || { projects: 0, activities: 0 };
            dates.push({
                date: d,
                count: counts.projects + counts.activities,
                projects: counts.projects,
                activities: counts.activities
            });
        }
        return dates;
    }, [projects, activities]);

    const stats = useMemo(() => {
        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;


        // Reverse array to start from today for current streak
        const sorted = [...contributionData].reverse();

        // Calculate current streak
        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i].count > 0) {
                currentStreak++;
            } else if (i === 0) {
                // Ignore if today has 0 count yet
                continue;
            } else {
                break;
            }
        }

        // Calculate max streak
        contributionData.forEach(day => {
            if (day.count > 0) {
                tempStreak++;
                maxStreak = Math.max(maxStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        });

        return {
            total: projects.length + activities.length,
            currentStreak,
            maxStreak
        };
    }, [contributionData, projects, activities]);

    const getColor = (count: number) => {
        if (count === 0) return 'bg-[#161b22]';
        if (count === 1) return 'bg-[#0e4429]';
        if (count <= 3) return 'bg-[#006d32]';
        if (count <= 5) return 'bg-[#26a641]';
        return 'bg-[#39d353]';
    };

    const getTooltip = (item: { date: Date; count: number; projects: number; activities: number }) => {
        const dateStr = item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        if (item.count === 0) return `No contributions on ${dateStr}`;

        const details = [];
        if (item.projects > 0) details.push(`${item.projects} project${item.projects > 1 ? 's' : ''}`);
        if (item.activities > 0) details.push(`${item.activities} solve${item.activities > 1 ? 's' : ''}`);

        return `${item.count} contribution${item.count > 1 ? 's' : ''} on ${dateStr} (${details.join(', ')})`;
    };

    // Generate month labels
    const monthLabels = useMemo(() => {
        const months: { name: string; weekIndex: number }[] = [];
        let currentMonth = -1;

        for (let i = 0; i < 52; i++) {
            const date = contributionData[i * 7].date;
            const monthIndex = date.getMonth();

            if (monthIndex !== currentMonth) {
                if (months.length === 0 || i - months[months.length - 1].weekIndex > 2) {
                    months.push({
                        name: date.toLocaleString('default', { month: 'short' }),
                        weekIndex: i
                    });
                    currentMonth = monthIndex;
                }
            }
        }
        return months;
    }, [contributionData]);

    return (
        <div className="space-y-4">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-surface/30 border border-border rounded-lg p-4 flex items-center gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <CalendarDays className="text-blue-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Active</div>
                    </div>
                </div>
                <div className="bg-surface/30 border border-border rounded-lg p-4 flex items-center gap-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Flame className="text-orange-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-100">{stats.currentStreak} Days</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Streak</div>
                    </div>
                </div>
                <div className="bg-surface/30 border border-border rounded-lg p-4 flex items-center gap-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                        <Trophy className="text-green-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-100">{stats.maxStreak} Days</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Longest Streak</div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-border rounded-lg p-6 bg-surface/20 w-full overflow-hidden"
            >
                <div className="w-full flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                    {/* Day Labels */}
                    <div className="flex flex-col gap-[4px] py-[15px] text-[10px] text-slate-500 leading-[10px] select-none">
                        <span className="h-[10px]"></span>
                        <span className="h-[10px]">Mon</span>
                        <span className="h-[10px]"></span>
                        <span className="h-[10px]">Wed</span>
                        <span className="h-[10px]"></span>
                        <span className="h-[10px]">Fri</span>
                        <span className="h-[10px]"></span>
                    </div>

                    <div className="flex-1 min-w-[700px]">
                        {/* Month Labels */}
                        <div className="flex relative h-5 mb-1">
                            {monthLabels.map((month, idx) => (
                                <span
                                    key={idx}
                                    className="absolute text-[10px] text-slate-500 select-none"
                                    style={{ left: `${(month.weekIndex / 52) * 100}%` }}
                                >
                                    {month.name}
                                </span>
                            ))}
                        </div>

                        {/* The Grid */}
                        <div className="flex gap-[4px] w-full">
                            {Array.from({ length: 52 }).map((_, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-[4px]">
                                    {contributionData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((item, dayIndex) => (
                                        <motion.div
                                            key={dayIndex}
                                            whileHover={{ scale: 1.3, zIndex: 10 }}
                                            className={`w-[11px] h-[11px] rounded-[2px] ${getColor(item.count)} transition-colors duration-200 cursor-help relative group`}
                                            title={getTooltip(item)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 text-xs text-slate-500 border-t border-border/30 pt-4">
                    <span className="italic">Contributions include project creation and problem solving activity</span>
                    <div className="flex items-center gap-[4px]">
                        <span>Less</span>
                        <div className="w-[11px] h-[11px] bg-[#161b22] rounded-[2px]"></div>
                        <div className="w-[11px] h-[11px] bg-[#0e4429] rounded-[2px]"></div>
                        <div className="w-[11px] h-[11px] bg-[#006d32] rounded-[2px]"></div>
                        <div className="w-[11px] h-[11px] bg-[#26a641] rounded-[2px]"></div>
                        <div className="w-[11px] h-[11px] bg-[#39d353] rounded-[2px]"></div>
                        <span>More</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
