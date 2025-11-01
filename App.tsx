
import React, { useState, useRef, RefObject } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { MOCK_STORIES, MOCK_DOCS, MOCK_ARTICLES, MOCK_COMMENTS, MOCK_USERS } from './constants';
import { User, Comment } from './types';
import { SoundOnIcon, SoundOffIcon } from './components/Icons';

// --- AuthForm Component (defined in App.tsx) ---
const AuthForm: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(MOCK_USERS[0]); // Simulate login
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="text-sm font-medium text-gray-400">Email</label>
                <input type="email" required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-400">Password</label>
                <input type="password" required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
            </div>
            {!isLogin && (
                 <div>
                    <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                    <input type="password" required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                </div>
            )}
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                {isLogin ? 'Login' : 'Create Account'}
            </button>
            <p className="text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-semibold text-gold hover:underline ml-1">
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </form>
    );
};

// --- AdminDashboard Component (defined in App.tsx) ---
const AdminDashboard: React.FC<{onClose: () => void}> = ({onClose}) => {
     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New story submitted!");
        onClose();
    };
    return (
         <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
                <label className="text-sm font-medium text-gray-400">Title</label>
                <input type="text" required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Summary</label>
                <textarea rows={4} required className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Thumbnail Image</label>
                <input type="file" required className="w-full mt-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30"/>
            </div>
             <div>
                <label className="text-sm font-medium text-gray-400">Tags (comma-separated)</label>
                <input type="text" className="w-full mt-1 p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                Upload Story
            </button>
        </form>
    );
};

// --- CommunitySection Component (defined in App.tsx) ---
const CommunitySection: React.FC<{isLoggedIn: boolean; comments: Comment[]}> = ({isLoggedIn, comments}) => {
    return (
        <section className="py-20 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <h2 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12 text-gold">Reader Community</h2>
                 <div className="max-w-3xl mx-auto space-y-6">
                    {comments.map(comment => (
                        <div key={comment.id} className="glassmorphism p-4 rounded-lg flex space-x-4">
                            <img src={comment.user.avatar} alt={comment.user.username} className="w-12 h-12 rounded-full border-2 border-gold/50" />
                            <div>
                                <p className="font-bold text-gold">{comment.user.username} <span className="text-xs text-gray-500 font-normal ml-2">{comment.timestamp}</span></p>
                                <p className="text-gray-300">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoggedIn && (
                        <div className="pt-6">
                           <textarea placeholder="Share your thoughts..." rows={4} className="w-full p-3 bg-white/5 border border-gold/30 rounded-lg focus:ring-2 focus:ring-gold focus:outline-none transition-all" />
                           <button className="mt-2 px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors">Post Comment</button>
                        </div>
                    )}
                 </div>
            </div>
        </section>
    );
};

// --- AudioToggle Component (defined in App.tsx) ---
const AudioToggle: React.FC<{audioRef: RefObject<HTMLAudioElement>}> = ({audioRef}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSound = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error("Audio play failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <button onClick={toggleSound} className="fixed bottom-5 right-5 z-50 p-3 rounded-full glassmorphism text-gold hover:text-white hover:bg-gold/20 transition-all">
            {isPlaying ? <SoundOnIcon /> : <SoundOffIcon />}
        </button>
    );
}

// --- App Component ---
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    
    const sectionRefs = {
        home: useRef<HTMLElement>(null),
        stories: useRef<HTMLElement>(null),
        documentaries: useRef<HTMLElement>(null),
        articles: useRef<HTMLElement>(null),
        about: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };

    const handleScrollTo = (id: string) => {
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogin = (user: User) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setAuthModalOpen(false);
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen relative">
             <div className="absolute inset-0 h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,215,0,0.15),rgba(255,255,255,0))] opacity-50"></div>
            <Navbar 
                onScrollTo={handleScrollTo} 
                onAuthClick={() => setAuthModalOpen(true)}
                onAdminClick={() => setAdminModalOpen(true)}
                isLoggedIn={isLoggedIn}
                user={currentUser}
            />
            <main>
                <div ref={sectionRefs.home}><HeroSlider /></div>
                <div ref={sectionRefs.stories}><ContentSection id="stories" title="Featured Stories" items={MOCK_STORIES} /></div>
                <div ref={sectionRefs.documentaries}><ContentSection id="documentaries" title="Documentaries" items={MOCK_DOCS} /></div>
                <div ref={sectionRefs.articles}><ContentSection id="articles" title="Articles" items={MOCK_ARTICLES} /></div>
                <CommunitySection isLoggedIn={isLoggedIn} comments={MOCK_COMMENTS} />
            </main>
            <div ref={sectionRefs.contact}><Footer /></div>
            
            <AudioToggle audioRef={audioRef} />

            <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} title="Join the Story">
                <AuthForm onLogin={handleLogin} />
            </Modal>
            
            <Modal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} title="Story Dashboard">
                <AdminDashboard onClose={() => setAdminModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default App;
