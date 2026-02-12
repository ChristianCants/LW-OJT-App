
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { customSignIn } from '../services'; // Import customSignIn
import { LogIn, ArrowLeft } from 'lucide-react';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Using customSignIn which queries user_access table
        const { data, error } = await customSignIn(username, password);

        if (error) {
            setError("Login failed. Please check your credentials.");
            console.error("Login Error:", error);
        } else if (data) {
            console.log("Logged in:", data);
            // Store user info in localStorage since we aren't using Supabase session
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } else {
            setError("Invalid username or password");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 w-full max-w-md relative animate-fade-in-up">
                <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to continue to your dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="glass-input"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="glass-input"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-btn flex items-center justify-center gap-2"
                    >
                        {loading ? 'Signing in...' : (
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
