import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { Button } from '../ui/Button';
import { Github, Linkedin, Mail, MapPin, Twitter, Users, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeModal } from '../ui/ResumeModal';
import { ensureAbsoluteUrl } from '../../lib/utils';

export const ProfileSidebar: React.FC = () => {
    const { profile } = useContent();
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [showSticky, setShowSticky] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(128);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    };

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky header when scrolled past the main profile info (approx 200px)
            if (window.scrollY > 280) {
                setShowSticky(true);
            } else {
                setShowSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            {/* Standard Profile Header */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
                <div
                    className="relative group w-20 h-20 md:w-full md:h-auto aspect-square cursor-pointer"
                    onClick={() => setIsAvatarOpen(true)}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-full rounded-full overflow-hidden border border-slate-700 bg-slate-800 transition-colors md:group-hover:border-slate-500"
                    >
                        <img
                            src={profile.avatarUrl || "https://github.com/github.png"}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    {/* Status Icon (Mock) */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:bottom-2 md:right-2 md:w-8 md:h-8 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-xs md:text-sm shadow-sm md:flex pointer-events-none">
                        🎯
                    </div>
                </div>

                <div className="md:py-2 flex-1 md:flex-none">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-100 leading-tight">{profile.name}</h1>
                    <p className="text-lg md:text-xl text-slate-400 font-light">{profile.title}</p>
                </div>
            </div>

            <AnimatePresence>
                {/* Sticky Mobile Header */}
                {showSticky && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed top-0 left-0 right-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-border p-3 md:hidden flex items-center gap-3 shadow-lg"
                    >
                        <div
                            className="w-9 h-9 rounded-full overflow-hidden border border-slate-700 bg-slate-800 cursor-pointer flex-shrink-0"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img
                                src={profile.avatarUrl || "https://github.com/github.png"}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <span className="font-bold text-slate-200 text-sm truncate cursor-pointer">{profile.name}</span>
                            <span className="text-xs text-slate-500 truncate cursor-pointer">{profile.title}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isAvatarOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setIsAvatarOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="relative w-full max-w-md aspect-square flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={profile.avatarUrl || "https://github.com/github.png"}
                                alt={profile.name}
                                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-slate-700"
                            />
                            <button
                                onClick={() => setIsAvatarOpen(false)}
                                className="absolute top-0 right-0 p-2 text-white hover:text-red-400 transition-colors bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Bio */}
            {profile.bio && (
                <div className="text-slate-300 text-[16px] leading-snug mb-4">
                    {profile.bio}
                </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
                <Button
                    className="w-full font-medium text-sm transition-colors duration-200 border bg-[#21262d] hover:bg-[#30363d] text-slate-200 border-[rgba(240,246,252,0.1)]"
                    onClick={handleFollow}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            </div>

            {/* Counts */}
            <div className="flex items-center gap-1 text-sm text-slate-400 py-2">
                <Users size={16} className="text-slate-500" />
                <span className="font-bold text-slate-200 hover:text-blue-400 cursor-pointer">{followerCount}</span>
                <span>followers</span>
                <span>·</span>
                <span className="font-bold text-slate-200 hover:text-blue-400 cursor-pointer">42</span>
                <span>following</span>
            </div>

            {/* Info Items */}
            <div className="space-y-1 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-500" />
                    <span>Remote, Earth</span>
                </div>
                {profile.socialLinks.email && (
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-slate-500" />
                        <a href={`mailto:${profile.socialLinks.email}`} className="hover:text-blue-400 hover:underline overflow-hidden text-ellipsis">{profile.socialLinks.email}</a>
                    </div>
                )}
                {profile.socialLinks.github && (
                    <div className="flex items-center gap-2">
                        <Github size={16} className="text-slate-500" />
                        <a href={ensureAbsoluteUrl(profile.socialLinks.github)} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline">@{profile.socialLinks.github?.split('/').pop()}</a>
                    </div>
                )}
                {profile.socialLinks.linkedin && (
                    <div className="flex items-center gap-2">
                        <Linkedin size={16} className="text-slate-500" />
                        <a href={ensureAbsoluteUrl(profile.socialLinks.linkedin)} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline">
                            {profile.socialLinks.linkedin?.includes('/in/')
                                ? `@${profile.socialLinks.linkedin.split('/in/')[1]?.split('/')[0]}`
                                : 'LinkedIn'}
                        </a>
                    </div>
                )}
                {profile.socialLinks.twitter && (
                    <div className="flex items-center gap-2">
                        <Twitter size={16} className="text-slate-500" />
                        <a href={ensureAbsoluteUrl(profile.socialLinks.twitter)} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline">Twitter</a>
                    </div>
                )}
                {profile.resumeUrl && (
                    <div className="flex items-center gap-2">
                        <Download size={16} className="text-slate-500" />
                        <button
                            onClick={() => setIsResumeOpen(true)}
                            className="text-slate-200 hover:text-blue-400 hover:underline text-left"
                        >
                            Resume
                        </button>
                    </div>
                )}
            </div>

            {/* Achievements/Badges Mock */}
            <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Achievements</h3>
                <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-500" title="Bug Hunter">
                        <span role="img" aria-label="trophy">🏆</span>
                    </div>
                    <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500" title="Code Warrior">
                        <span role="img" aria-label="sword">⚔️</span>
                    </div>
                    <div className="w-8 h-8 rounded bg-green-500/10 flex items-center justify-center text-green-500" title="Consistent Committer">
                        <span role="img" aria-label="chart">📈</span>
                    </div>
                </div>
            </div>

            <ResumeModal
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
                resumeUrl={profile.resumeUrl || ''}
            />

            {/* Sticky Mobile Header (Removed) */}
        </motion.div>
    );
};
