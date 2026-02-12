
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminSignIn } from '../services';
import { Shield, ArrowLeft, Lock } from 'lucide-react';

const AdminSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await adminSignIn(email, password);

        if (error) {
            setError(error.message);
        } else {
            console.log("Admin Logged in:", data);
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 w-full max-w-md relative animate-fade-in-up border-green-500/30">
                <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4 text-green-400 border border-green-500/20">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-gradient">Admin Access</h1>
                    <p className="text-gray-400">Secure authorization required</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="glass-input"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="glass-input pr-10"
                                placeholder="Enter admin password"
                                required
                            />
                            <Lock className="absolute right-3 top-3 text-gray-500" size={18} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-btn flex items-center justify-center gap-2"
                    >
                        {loading ? 'Authenticating...' : (
                            <>
                                <Shield size={20} />
                                Access Dashboard
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminSignIn;
