import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const HomePage = ({ user }) => {
    return (
        <div className="min-h-screen bg-[#f3f2ef] font-sans pt-20">
            <Navbar />

            {/* Main Layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">

                {/* Left Sidebar - Profile */}
                <aside className="md:col-span-1">
                    <div className="bg-white rounded-lg shadow overflow-hidden relative">
                        <div className="h-16 bg-gradient-to-r from-primary to-secondary"></div>
                        <div className="px-4 pb-4">
                            <div className="relative -mt-8 mb-3">
                                <Link to="/profile/me">
                                    <img src={user?.image || "https://via.placeholder.com/150"} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white shadow-sm hover:opacity-90 transition-opacity" />
                                </Link>
                            </div>
                            <Link to="/profile/me" className="hover:underline">
                                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                            </Link>
                            <p className="text-sm text-gray-500">{user?.heading || "Ex-Agniveer"}</p>

                            <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium text-gray-500">
                                <div className="flex justify-between mb-2">
                                    <span>Profile Views</span>
                                    <span className="text-primary">12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Connections</span>
                                    <span className="text-primary">45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Center - Feed */}
                <main className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow p-4 mb-4">
                        <div className="flex gap-4">
                            <img src={user?.image || "https://via.placeholder.com/150"} className="w-12 h-12 rounded-full" alt="" />
                            <button className="flex-1 text-left px-4 py-3 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-500 font-medium transition-colors">
                                Start a post
                            </button>
                        </div>
                    </div>

                    {/* Feed Items (Placeholder) */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow p-4 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <h3 className="font-bold text-sm">Recruiter Name</h3>
                                    <p className="text-xs text-gray-500">HR Manager at Security Corps</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-800 mb-2">
                                Looking for disciplined candidates for security supervisor roles in Delhi NCR. Apply now!
                            </p>
                            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                Post Image Placeholder
                            </div>
                        </div>
                    ))}
                </main>

                {/* Right Sidebar - Suggestions */}
                <aside className="hidden md:block md:col-span-1">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Add to your feed</h3>
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-3 mb-4 items-start">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-sm">Army Veterans Group</h4>
                                    <button className="mt-1 px-3 py-1 rounded-full border border-gray-400 text-gray-600 text-xs font-semibold hover:bg-gray-100">
                                        + Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default HomePage;
