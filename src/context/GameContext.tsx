import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameContextType {
    xp: number;
    level: number;
    addXp: (amount: number) => void;
    nextLevelXp: number;
    progress: number; // 0-100
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('portfolio_xp');
        return saved ? parseInt(saved, 10) : 0;
    });

    const [level, setLevel] = useState(1);
    const BASE_XP = 100;

    useEffect(() => {
        localStorage.setItem('portfolio_xp', xp.toString());
        const newLevel = Math.floor(xp / BASE_XP) + 1;
        setLevel(newLevel);
    }, [xp]);

    const nextLevelXp = level * BASE_XP;
    const currentLevelStartXp = (level - 1) * BASE_XP;
    const progress = Math.min(100, Math.max(0, ((xp - currentLevelStartXp) / (nextLevelXp - currentLevelStartXp)) * 100));

    const addXp = (amount: number) => {
        setXp((prev) => prev + amount);
    };

    return (
        <GameContext.Provider value={{ xp, level, addXp, nextLevelXp, progress }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
