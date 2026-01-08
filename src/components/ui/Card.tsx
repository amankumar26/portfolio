import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Card = motion.create(({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { className?: string }) => {
    return (
        <div
            className={cn(
                'bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});
