import React, { useMemo } from 'react';
import type { Project } from '../../types';
import { motion } from 'framer-motion';

interface ContributionGraphProps {
    projects: Project[];
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ projects }) => {
    // 1. Generate dates for the last 365 days
    const contributionData = useMemo(() => {
        const today = new Date();
        const dates: { date: Date; count: number }[] = [];

        // Create a map of project creation dates (normalized to YYYY-MM-DD)
        const projectCounts: Record<string, number> = {};
        projects.forEach(p => {
            if (p.createdAt) {
                const dateKey = new Date(p.createdAt).toISOString().split('T')[0];
                projectCounts[dateKey] = (projectCounts[dateKey] || 0) + 1;
            }
        });

        // Generate 52 weeks * 7 days = 364 days approx
        // We start from 52 weeks ago
        for (let i = 0; i < 52 * 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - (52 * 7 - 1 - i));
            const dateKey = d.toISOString().split('T')[0];
            dates.push({
                date: d,
                count: projectCounts[dateKey] || 0
            });
        }
        return dates;
    }, [projects]);

    const getColor = (count: number) => {
        if (count === 0) return 'bg-[#161b22]';
        if (count === 1) return 'bg-[#0e4429]';
        if (count <= 3) return 'bg-[#006d32]';
        return 'bg-[#39d353]';
    };

    const getTooltip = (item: { date: Date; count: number }) => {
        const dateStr = item.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        if (item.count === 0) return `No contributions on ${dateStr}`;
        return `${item.count} contribution${item.count > 1 ? 's' : ''} on ${dateStr}`;
    };

    // Generate month labels
    const monthLabels = useMemo(() => {
        const months: { name: string; weekIndex: number }[] = [];
        let currentMonth = -1;

        for (let i = 0; i < 52; i++) {
            const date = contributionData[i * 7].date;
            const monthIndex = date.getMonth();

            if (monthIndex !== currentMonth) {
                // Only add label if there's enough space (at least 2 weeks from previous label)
                // or if it's the very first one
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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border rounded-md p-4 bg-surface/50 w-full"
        >
            <div className="w-full flex gap-2">
                {/* Day Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-[3px] py-[13px] text-[10px] text-slate-500 leading-[10px]">
                    <span className="h-[10px]"></span> {/* Sun placeholder */}
                    <span className="h-[10px]">Mon</span>
                    <span className="h-[10px]"></span>
                    <span className="h-[10px]">Wed</span>
                    <span className="h-[10px]"></span>
                    <span className="h-[10px]">Fri</span>
                    <span className="h-[10px]"></span>
                </div>

                <div className="flex-1">
                    {/* Month Labels */}
                    <div className="flex relative h-5 mb-1">
                        {monthLabels.map((month, idx) => (
                            <span
                                key={idx}
                                className="absolute text-[10px] text-slate-500"
                                style={{
                                    left: `${(month.weekIndex / 52) * 100}%`
                                }}
                            >
                                {month.name}
                            </span>
                        ))}
                    </div>

                    {/* The Grid */}
                    <div className="flex gap-[3px] justify-end xl:justify-between">
                        {Array.from({ length: 52 }).map((_, weekIndex) => (
                            <div
                                key={weekIndex}
                                className={`flex flex-col gap-[3px] ${weekIndex < 22 ? 'hidden xl:flex' :
                                    weekIndex < 32 ? 'hidden md:flex' : 'flex'
                                    }`}
                            >
                                {contributionData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((item, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`w-[10px] h-[10px] rounded-[2px] ${getColor(item.count)} hover:scale-125 transition-transform duration-200 cursor-pointer`}
                                        title={getTooltip(item)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-slate-500 ml-8">
                <span>{projects.length} contributions in the last year</span>
                <div className="flex items-center gap-[3px]">
                    <span>Less</span>
                    <div className="w-[10px] h-[10px] bg-[#161b22] rounded-[2px]"></div>
                    <div className="w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]"></div>
                    <div className="w-[10px] h-[10px] bg-[#006d32] rounded-[2px]"></div>
                    <div className="w-[10px] h-[10px] bg-[#39d353] rounded-[2px]"></div>
                    <span>More</span>
                </div>
            </div>
        </motion.div>
    );
};
