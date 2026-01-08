import { type FC, type MouseEvent } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useGame } from '../../context/GameContext';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    xpReward?: number;
}

export const Button: FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    xpReward,
    onClick,
    children,
    ...props
}) => {
    const { addXp } = useGame();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (xpReward) {
            addXp(xpReward);
        }
        onClick?.(e);
    };

    const variants = {
        primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25',
        secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/25',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10',
        ghost: 'hover:bg-white/5 text-slate-300 hover:text-white',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            onClick={handleClick}
            {...props}
        >
            {children}
        </motion.button>
    );
};
