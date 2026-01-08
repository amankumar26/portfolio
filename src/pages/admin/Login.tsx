import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Lock } from 'lucide-react';

export const Login: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the return url from location state or default to /admin
    const from = location.state?.from?.pathname || "/admin";

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(password);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('Access Denied: Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <Card className="max-w-md w-full p-8 border-slate-800 bg-slate-900/50">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="p-4 bg-slate-800 rounded-full text-primary">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Access</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter secured key..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        Authenticate
                    </Button>
                </form>
            </Card>
        </div>
    );
};
