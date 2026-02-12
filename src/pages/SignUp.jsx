
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { customSignUp } from '../services'; // Import customSignUp
import { UserPlus, ArrowLeft } from 'lucide-react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Using customSignUp which saves to user_access table
        const { data, error } = await customSignUp(username, null, password, role);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            console.log("Signed up:", data);
            setLoading(false);
            navigate('/signin'); // Redirect to sign in after successful signup
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card p-8 w-full max-w-md relative animate-fade-in-up">
                <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gradient">Create Account</h1>
                    <p className="text-gray-400">Join Lifewood OJT App today</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="glass-input"
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="glass-input"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="glass-input appearance-none cursor-pointer"
                        >
                            <option value="user" className="text-black">User</option>
                            <option value="admin" className="text-black">Admin</option>
                            <option value="manager" className="text-black">Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-btn flex items-center justify-center gap-2 mt-6"
                    >
                        {loading ? 'Creating Account...' : (
                            <>
                                <UserPlus size={20} />
                                Sign Up
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-green-400 hover:text-green-300 font-medium">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
