import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Menu, X, Plus, Phone, Linkedin, Facebook, Instagram, Youtube
} from 'lucide-react';
import GlassSurface from '../components/GlassSurface';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
            <GlassSurface
                borderRadius={50}
                width="100%"
                brightness={95}
                opacity={0.85}
                blur={16}
                borderWidth={1}
                className="max-w-[1400px] mx-auto"
                style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(255, 255, 255, 0.4)' }}
            >
                <div className="px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/Logo 1.png"
                            alt="Lifewood"
                            className="h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden xl:flex items-center gap-8 text-[13px] font-medium text-gray-600">
                        <a href="#" className="text-[#FFB347] hover:text-[#133020] transition-colors">Home</a>
                        <a href="#about" className="hover:text-[#133020] transition-colors">About</a>
                        <a href="#contact" className="hover:text-[#133020] transition-colors">Contact</a>
                        <GlassSurface
                            borderRadius={50}
                            brightness={90}
                            opacity={0.7}
                            blur={12}
                            borderWidth={1}
                            className="inline-block"
                            style={{ border: '1px solid rgba(19, 48, 32, 0.15)' }}
                        >
                            <Link to="/signin" className="px-4 py-2 block text-xs font-bold uppercase tracking-wide text-[#133020] hover:text-[#FFB347] transition-colors">
                                Log in
                            </Link>
                        </GlassSurface>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="xl:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </GlassSurface>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 overflow-hidden xl:hidden"
                    >
                        <GlassSurface
                            borderRadius={16}
                            brightness={98}
                            opacity={0.9}
                            blur={20}
                            borderWidth={1}
                            className="w-full"
                            style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                        >
                            <div className="flex flex-col p-6 gap-4 font-medium text-gray-600">
                                <a href="#" className="text-[#FFB347]">Home</a>
                                <a href="#about">About</a>
                                <a href="#contact">Contact</a>
                                <GlassSurface
                                    borderRadius={12}
                                    brightness={12}
                                    opacity={0.95}
                                    blur={8}
                                    borderWidth={1}
                                    style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <Link to="/signin" className="text-white text-center py-3 block font-bold">Log in</Link>
                                </GlassSurface>
                            </div>
                        </GlassSurface>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 overflow-hidden bg-white">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://www.pexels.com/download/video/10922866/" type="video/mp4" />
            </video>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#111827] leading-[1.15] mb-12">
                    Training the next generation <br />
                    of interns with AI.
                </h1>

                <div className="flex justify-center">
                    <GlassSurface
                        borderRadius={50}
                        width="auto"
                        height="auto"
                        brightness={98}
                        opacity={0.85}
                        blur={14}
                        borderWidth={1}
                        className="group cursor-pointer hover:shadow-lg transition-all"
                        style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
                    >
                        <div className="pl-5 pr-2 py-2 flex items-center gap-3 text-sm font-medium text-[#111827]">
                            Join Our Program
                            <span className="w-7 h-7 rounded-full bg-gray-100/80 flex items-center justify-center group-hover:bg-[#FFB347] transition-colors">
                                <ArrowRight size={14} className="text-gray-600 group-hover:text-[#133020]" />
                            </span>
                        </div>
                    </GlassSurface>
                </div>
            </motion.div>
        </section>
    );
};

const About = () => {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="text-xs font-bold tracking-[0.2em] text-gray-400 mb-6 uppercase flex items-center justify-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400"></span> ABOUT US
                    </div>
                    <p className="text-xl md:text-2xl text-gray-800 leading-relaxed max-w-4xl mx-auto font-light">
                        At <span className="font-semibold">Lifewood</span>, we train interns through an AI-powered internship program, equipping them with real-world skills in cutting-edge technologies — from web and game development to genealogy research and LLM prompt engineering.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <GlassSurface
                            borderRadius={50}
                            brightness={12}
                            opacity={0.95}
                            blur={8}
                            borderWidth={1}
                            className="cursor-pointer hover:scale-105 transition-transform"
                            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
                        >
                            <span className="px-6 py-3 block text-white text-sm font-medium">
                                Explore Programs
                            </span>
                        </GlassSurface>
                    </div>
                </div>

                {/* Stats Accordions */}
                <div className="flex flex-col gap-4">
                    {/* Beige Card */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="w-full p-6 md:p-8 bg-[#F2F0E9] rounded-2xl flex items-center justify-between cursor-pointer group"
                    >
                        <span className="text-xl md:text-2xl font-medium text-[#133020]">4 Specialized Training Tracks</span>
                        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors">
                            <Plus size={16} className="text-[#133020]" />
                        </div>
                    </motion.div>

                    {/* Orange Card */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="w-full p-6 md:p-8 bg-[#FFB347] rounded-2xl flex items-center justify-between cursor-pointer group"
                    >
                        <span className="text-xl md:text-2xl font-medium text-[#133020]">AI-Powered Learning & Mentorship</span>
                        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center group-hover:bg-white/50 transition-colors">
                            <Plus size={16} className="text-[#133020]" />
                        </div>
                    </motion.div>

                    {/* Green Card */}
                    <motion.div
                        initial={{ opacity: 0.9 }}
                        whileHover={{ scale: 1.01, opacity: 1 }}
                        className="w-full p-6 md:p-8 bg-[#133020] rounded-2xl flex items-center justify-between cursor-pointer group text-white"
                    >
                        <span className="text-xl md:text-2xl font-medium">Hands-On Projects with Real-World Applications</span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <div className="w-4 h-[2px] bg-white"></div>
                        </div>
                    </motion.div>

                    <div className="mt-2 text-xs text-gray-500 max-w-3xl">
                        Our interns build portfolio-ready projects across Web Development, Game Development, Genealogy, and LLM & Prompt Engineering — all guided by AI-assisted learning tools.
                    </div>
                </div>
            </div>
        </section>
    );
};

const CoreValues = () => {
    const values = [
        { letter: 'D', title: 'DIVERSITY', desc: 'We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward.' },
        { letter: 'C', title: 'CARING', desc: 'We care for every person deeply and equally, because without care work becomes meaningless.' },
        { letter: 'I', title: 'INNOVATION', desc: 'Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service.' },
        { letter: 'I', title: 'INTEGRITY', desc: 'We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company.' }
    ];

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#133020]">
                        CORE <span className="bg-[#FFB347] px-2 text-white inline-block transform -skew-x-6">VALUE</span>
                    </h2>
                    <p className="text-xl leading-relaxed text-gray-600 font-light">
                        At <span className="font-semibold text-[#133020]">Lifewood</span> we empower our company and our clients to realise the transformative power of AI: Bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
                    </p>
                </motion.div>

                {/* Right Column - Value List */}
                <div className="flex flex-col gap-6">
                    {values.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="flex gap-6 group"
                        >
                            <div className="flex-shrink-0 w-20 h-20 bg-[#133020] text-white flex items-center justify-center text-4xl font-bold shadow-lg group-hover:bg-[#FFB347] group-hover:scale-110 transition-all duration-300 rounded-sm">
                                {item.letter}
                            </div>
                            <div>
                                <div className="inline-block bg-[#F2F0E9] px-3 py-1 text-xs font-bold tracking-widest text-[#133020] mb-2 upppercase">
                                    {item.title}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-gray-100 pl-4 group-hover:border-[#FFB347] transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionVision = () => {
    const [activeTab, setActiveTab] = useState('mission');

    const content = {
        mission: {
            title: 'Our Mission',
            text: 'To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
        },
        vision: {
            title: 'Our Vision',
            text: 'To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.',
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop'
        }
    };

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-medium text-center mb-16 text-[#111827]"
                >
                    What drives us today, and what <br /> inspires us for tomorrow
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-0 shadow-2xl rounded-3xl overflow-hidden bg-[#F2F0E9]">

                    {/* Image Section */}
                    <div className="lg:w-1/2 relative min-h-[400px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeTab}
                                src={content[activeTab].image}
                                alt={activeTab}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        {/* Overlay Texture */}
                        <div className="absolute inset-0 bg-[#133020]/10 mix-blend-multiply"></div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 flex flex-col">
                        {/* Tabs */}
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('mission')}
                                className={`flex-1 py-6 text-lg font-bold tracking-wide transition-all duration-300 ${activeTab === 'mission' ? 'bg-[#133020] text-white' : 'bg-[#e5e3db] text-gray-500 hover:bg-[#dcdad3]'}`}
                            >
                                Mission
                            </button>
                            <button
                                onClick={() => setActiveTab('vision')}
                                className={`flex-1 py-6 text-lg font-bold tracking-wide transition-all duration-300 ${activeTab === 'vision' ? 'bg-[#133020] text-white' : 'bg-[#e5e3db] text-gray-500 hover:bg-[#dcdad3]'}`}
                            >
                                Vision
                            </button>
                        </div>

                        {/* Text Content */}
                        <div className="p-12 md:p-16 flex-1 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h3 className="text-3xl font-bold text-[#133020] mb-6">{content[activeTab].title}</h3>
                                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                                        {content[activeTab].text}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServicesGrid = () => {
    return (
        <section className="py-24 px-6 bg-white" id="services">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-light text-[#111827] mb-8"
                    >
                        TRAINING PROGRAMS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-3xl text-lg text-gray-600"
                    >
                        Our AI-powered internship program equips interns with hands-on skills across four specialized tracks, preparing them for the future of technology.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Web Development - Large */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-1 md:col-span-2 relative rounded-3xl group cursor-pointer overflow-hidden"
                    >
                        <img src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" alt="Web Development" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute top-8 left-8 z-10">
                            <h3 className="text-white text-3xl font-medium mb-2">Web Development</h3>
                            <p className="text-gray-300 text-sm max-w-md">Build modern, responsive web applications using React, Next.js, and full-stack technologies with AI-assisted coding.</p>
                        </div>
                        {/* Code animation */}
                        <div className="absolute bottom-8 right-8 z-10 opacity-30 font-mono text-xs text-cyan-400 hidden md:block">
                            <div>&lt;div className="app"&gt;</div>
                            <div>&nbsp;&nbsp;&lt;Component /&gt;</div>
                            <div>&lt;/div&gt;</div>
                        </div>
                    </motion.div>

                    {/* LLM & Prompt Engineering - Tall */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-1 md:col-span-1 lg:row-span-2 relative rounded-3xl group cursor-pointer overflow-hidden bg-[#1a1a2e]"
                    >
                        <div className="absolute inset-0 opacity-20 flex justify-center gap-4 p-8 z-0">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-30" />
                            ))}
                        </div>
                        <div className="absolute top-8 left-8 right-8 z-10">
                            <h3 className="text-white text-3xl font-medium mb-3">LLM & Prompt Engineering</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Master the art of crafting effective prompts, fine-tuning language models, and building AI-powered applications.
                            </p>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <div className="flex flex-wrap gap-2">
                                {['ChatGPT', 'Claude', 'Gemini', 'RAG', 'Fine-tuning', 'Agents'].map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs rounded-full border border-white/10 text-gray-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Genealogy */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-1 md:col-span-1 relative rounded-3xl group cursor-pointer overflow-hidden"
                    >
                        <img src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=1664&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" alt="Genealogy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-8 left-8 z-10">
                            <h3 className="text-white text-3xl font-medium mb-2">Genealogy</h3>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <p className="text-gray-300 text-sm">Research family histories, build tree structures, and analyze historical records using AI-enhanced tools.</p>
                        </div>
                    </motion.div>

                    {/* Game Development */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="col-span-1 md:col-span-1 relative rounded-3xl group cursor-pointer overflow-hidden"
                    >
                        <img src="https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" alt="Game Development" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-8 left-8 z-10">
                            <h3 className="text-white text-3xl font-medium mb-2">Game Development</h3>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <p className="text-gray-300 text-sm">Create interactive games with modern engines, 3D modeling, and AI-driven gameplay mechanics.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="px-4 pb-4 md:px-8 md:pb-8 bg-white">
            <div className="bg-[#112a1c] rounded-[3rem] px-8 py-12 md:px-16 text-white relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-end gap-10 relative z-10">

                    <div className="flex flex-col gap-10 max-w-2xl">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <img
                                    src="/Logo 2.png"
                                    alt="Lifewood"
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                            <h2 className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                                We provide global Data Engineering Services to enable AI Solutions.
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-3xl font-normal text-white">Contact Us</h3>
                            <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-medium">
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
                                <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-8 w-full lg:w-auto">
                        <div className="flex flex-col lg:items-end gap-4 w-full">
                            <h4 className="text-sm font-medium text-white">Find Us On:</h4>
                            <div className="flex gap-6">
                                <a href="#" className="flex flex-col items-center gap-2 group">
                                    <Linkedin size={24} className="text-white group-hover:text-[#c8ff00] transition-colors" />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden group-hover:block transition-all">Linkedin</span>
                                </a>
                                <a href="#" className="flex flex-col items-center gap-2 group">
                                    <Facebook size={24} className="text-white group-hover:text-[#c8ff00] transition-colors" />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden group-hover:block transition-all">Facebook</span>
                                </a>
                                <a href="#" className="flex flex-col items-center gap-2 group">
                                    <Instagram size={24} className="text-white group-hover:text-[#c8ff00] transition-colors" />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden group-hover:block transition-all">Instagram</span>
                                </a>
                                <a href="#" className="flex flex-col items-center gap-2 group">
                                    <Youtube size={24} className="text-white group-hover:text-[#c8ff00] transition-colors" />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden group-hover:block transition-all">Youtube</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between lg:justify-end w-full gap-4 mt-2">
                            <div className="text-xs text-gray-400 font-medium tracking-wide whitespace-nowrap order-2 md:order-1">
                                © 2026 Lifewood - All Rights Reserved
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#FFB347] selection:text-[#133020]">
            <Navbar />
            <Hero />
            <About />
            <CoreValues />
            <MissionVision />
            <ServicesGrid />
            <Footer />
        </div>
    );
};

export default LandingPage;
