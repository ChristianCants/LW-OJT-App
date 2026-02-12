import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminSignIn } from '../services';
import Particles from '../components/Particles';

const AdminSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await adminSignIn(email, password);

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex font-sans">
            {/* Left Panel (55%) - Darker Theme for Admin */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-[#1f2937]">
                {/* Background Particles - Green Tint */}
                <div className="absolute inset-0 z-0">
                    <Particles
                        particleColors={["#10b981", "#059669", "#047857"]}
                        particleCount={300}
                        particleSpread={15}
                        speed={0.25}
                        particleBaseSize={80}
                        moveParticlesOnHover={true}
                        alphaParticles={true}
                        disableRotation={false}
                        className="w-full h-full"
                    />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-green-900/20 pointer-events-none"></div>

                <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
                    <div>
                        <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-2 inline-flex items-center gap-2 border border-green-500/30">
                            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="font-bold text-green-400 tracking-tight text-lg font-mono">LIFEWOOD_ADMIN</span>
                        </div>
                    </div>

                    <div className="mb-20">
                        <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wide">
                            SECURE ACCESS
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4">
                            System Administration Control Center
                        </h1>
                        <p className="text-gray-300 text-sm max-w-lg">
                            Authorized personnel only. All activities are monitored and logged.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel (45%) */}
            <div className="w-full lg:w-[45%] bg-[#d1d5db] flex flex-col justify-center items-center p-8 lg:p-16 relative">
                <div className="lg:hidden absolute top-8 left-8">
                    <span className="font-bold text-green-800 text-xl font-mono">ADMIN</span>
                </div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Enter your credentials to access the command center.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SYSTEM :</span>
                            <span className="text-xs font-bold text-gray-800">Secure v2.4</span>
                            <span className="text-green-600 text-[10px]">🔒</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 text-center font-mono">
                            [ERROR]: {error}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-all shadow-sm font-mono text-sm"
                                placeholder="admin@lifewood.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Passcode</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700 transition-all shadow-sm font-mono text-sm"
                                    placeholder="••••••••••••"
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
                            {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                            {!loading && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center text-xs text-gray-500 font-medium">
                        SECURE CONNECTION • 256-BIT ENCRYPTION
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignIn;
