import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { customSignIn } from '../services';
import Particles from '../components/Particles';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await customSignIn(username, password);

        if (error) {
            setError("Login failed. Please check your credentials.");
        } else if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            navigate(data.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } else {
            setError("Invalid username or password");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex font-sans">
            {/* Left Panel - Branding & Visuals (55%) */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-[#d1d5db]">
                {/* Background Particles - Adjusted for Silver theme */}
                <div className="absolute inset-0 z-0">
                    <Particles
                        particleColors={["#ffffff", "#a1a1aa"]}
                        particleCount={300}
                        particleSpread={15}
                        speed={0.2}
                        particleBaseSize={80}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                        className="w-full h-full"
                    />
                </div>

                {/* Overlay Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-300/20 to-gray-500/10 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
                    {/* Top Logo Area */}
                    <div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 inline-flex items-center gap-2 shadow-sm">
                            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                            <span className="font-bold text-gray-800 tracking-tight text-lg">lifewood</span>
                        </div>
                    </div>

                    {/* Main Text */}
                    <div className="mb-20">
                        <div className="inline-block bg-[#008753] text-white text-xs font-bold px-3 py-1 rounded-full mb-6">
                            INTERN PORTAL
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-md mb-4">
                            We provide global Data Engineering Services to enable AI Solutions.
                        </h1>
                        <p className="text-white/80 text-sm max-w-lg drop-shadow-sm">
                            Trusted by leading enterprises worldwide for talent acquisition and management.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form (45%) - Light Grey Background */}
            <div className="w-full lg:w-[45%] bg-[#d1d5db] flex flex-col justify-center items-center p-8 lg:p-16 relative">
                {/* Mobile Logo (Visible only on small screens) */}
                <div className="lg:hidden absolute top-8 left-8">
                    <span className="font-bold text-gray-800 text-xl">lifewood</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Sign in to access your dashboard and manage your workflow.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">POWERED BY :</span>
                            <span className="text-xs font-bold text-gray-800">Lifewood PH</span>
                            <span className="text-red-600 text-[10px]">🇵🇭</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div>
                            {/* Changed Label from Email to Username to match backend requirement, but kept style */}
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-all shadow-sm"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-all shadow-sm"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#153F2D] text-white font-bold rounded-xl hover:bg-[#0f2e21] hover:shadow-lg transform transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                            {!loading && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center text-xs text-gray-500 font-medium hover:underline cursor-pointer">
                        <a href="https://lifewood.com" target="_blank" rel="noopener noreferrer">lifewood.com &rarr;</a>
                    </div>

                    <div className="mt-8 text-center text-[10px] text-gray-400">
                        © 2026 Lifewood Data Technology Ltd. All Rights Reserved.
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        {/* Social Placeholders */}
                        {['in', 'f', 'ig', 'yt'].map((social) => (
                            <button key={social} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all shadow-sm">
                                <span className="text-xs uppercase font-bold">{social}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
