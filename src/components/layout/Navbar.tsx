import React from 'react';
import { Home, Briefcase, User, Shield, Zap, Trophy, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    // We can still use useLocation to check if we are on admin or not
    const location = useLocation();
    const navigate = useNavigate();

    const isAdmin = location.pathname.startsWith('/admin');

    const links = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'skills', label: 'Skills', icon: Zap },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'competitive', label: 'Competitive', icon: Trophy },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation then scroll
            setTimeout(() => {
                const element = document.getElementById(id);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (isAdmin) return null; // Or show admin navbar

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface/80 backdrop-blur-lg border border-white/10 px-4 sm:px-6 py-3 rounded-full shadow-2xl flex items-center gap-1 sm:gap-2 max-w-[90vw] overflow-x-auto no-scrollbar">
            {links.map((link) => {
                const Icon = link.icon;

                return (
                    <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className={cn(
                            "relative px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-colors text-slate-400 hover:text-white shrink-0"
                        )}
                        aria-label={link.label}
                    >
                        <Icon size={20} />
                        <span className="text-sm font-medium hidden md:block">{link.label}</span>
                    </button>
                );
            })}

            <div className="w-px h-6 bg-white/10 mx-2" />

            <Link
                to="/admin"
                className="p-2 text-slate-500 hover:text-secondary transition-colors"
                title="Admin Panel"
            >
                <Shield size={18} />
            </Link>
        </nav>
    );
};
