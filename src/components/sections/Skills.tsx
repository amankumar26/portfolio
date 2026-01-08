import React from 'react';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
    const { skills } = useContent();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-border pb-2 text-slate-200">Skills & Technologies</h2>
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.02 }
                    }
                }}
            >
                {skills.map((skill, idx) => (
                    <motion.div
                        key={idx}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg bg-surface/30 hover:border-blue-500/30 transition-colors cursor-default"
                    >
                        <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-xl shadow-sm">
                            {skill.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-slate-200">{skill.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500">{skill.category}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
