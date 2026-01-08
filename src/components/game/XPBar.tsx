import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const XPBar: React.FC = () => {
    const { xp, level, nextLevelXp, progress } = useGame();

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-surface/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg">
            <div className="flex flex-col items-end mr-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Level</span>
                <span className="text-xl font-black text-secondary leading-none">{level}</span>
            </div>

            <div className="w-32 h-3 bg-slate-700 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                />
            </div>

            <div className="text-xs font-mono text-slate-300 w-16 text-right">
                {Math.floor(xp)} / {nextLevelXp} XP
            </div>
        </div>
    );
};
