import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FolderGit2, LogOut, User, Zap, Trophy, Menu, X } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-surface border-b border-border p-4 flex justify-between items-center z-20 sticky top-0">
                <h2 className="text-xl font-bold text-slate-100">Admin Nexus</h2>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-300">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-border p-6 
                flex flex-col transition-transform duration-300 ease-in-out z-30
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-border flex items-center justify-center">
                        <span className="text-lg">🛡️</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-100 hidden md:block tracking-tight">Admin Nexus</h2>
                </div>

                <nav className="flex-1 space-y-1">
                    <Link
                        to="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-all duration-200"
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    <div className="my-4 pt-4 border-t border-border px-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Management</span>
                    </div>

                    <Link
                        to="/admin/profile"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-all duration-200"
                    >
                        <User size={18} />
                        <span>Profile & Bio</span>
                    </Link>
                    <Link
                        to="/admin/projects"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-all duration-200"
                    >
                        <FolderGit2 size={18} />
                        <span>Projects</span>
                    </Link>
                    <Link
                        to="/admin/skills"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-all duration-200"
                    >
                        <Zap size={18} />
                        <span>Skills</span>
                    </Link>
                    <Link
                        to="/admin/competitive"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-md transition-all duration-200"
                    >
                        <Trophy size={18} />
                        <span>Competitive</span>
                    </Link>
                </nav>

                <div className="pt-4 border-t border-border mt-auto">
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-md transition-all duration-200"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-background">
                <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
