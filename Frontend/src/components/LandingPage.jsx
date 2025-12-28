import React from 'react';
import { SignInButton } from '@clerk/clerk-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-primary text-gray-100">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 bg-primary/95 backdrop-blur-sm fixed w-full z-20 border-b border-white/10">
                <div className="text-2xl font-bold tracking-wider text-accent">
                    AGNIVEER<span className="text-white">CONNECT</span>
                </div>
                <div className="space-x-6 flex items-center">
                    <a href="#features" className="hover:text-accent transition-colors hidden md:block">Opportunities</a>
                    <a href="#community" className="hover:text-accent transition-colors hidden md:block">Community</a>
                    <SignInButton mode="modal">
                        <button className="px-5 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-primary font-semibold transition-all duration-300">
                            Login
                        </button>
                    </SignInButton>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 px-6 flex-1 flex items-center justify-center text-center overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[60%] bg-blue-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-4xl mx-auto z-10">
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-sm tracking-wide text-accent/80 uppercase">
                        For Those Who Served
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                        The Mission Doesn't End.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
                            It Evolves.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        From Agnipath to your next path: Find jobs, start a business, or connect with your squad.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <SignInButton mode="modal">
                            <button className="px-8 py-4 bg-accent text-primary text-lg font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all transform hover:-translate-y-1">
                                Get Started Now
                            </button>
                        </SignInButton>
                        <button className="px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-medium rounded-lg hover:bg-white/5 transition-all">
                            Learn More
                        </button>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 bg-secondary relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Next Objective</h2>
                        <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard
                            icon="🚀"
                            title="Entrepreneurship"
                            desc="Access resources, mentorship, and capital to launch your own venture."
                        />
                        <FeatureCard
                            icon="💼"
                            title="Job Opportunities"
                            desc="Connect with recruiters who value discipline, leadership, and grit."
                        />
                        <FeatureCard
                            icon="🤝"
                            title="Community Network"
                            desc="Find your batchmates and build a professional network of veterans."
                        />
                        <FeatureCard
                            icon="🎓"
                            title="Upskilling"
                            desc="Bridge courses and certifications to translate military skills to corporate success."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-primary border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Agniveer Connect. Jai Hind.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-primary border border-white/5 hover:border-accent/30 hover:bg-white/5 transition-all duration-300 group">
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default LandingPage;
