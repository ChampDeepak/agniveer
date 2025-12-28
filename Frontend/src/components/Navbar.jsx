import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 px-4 py-2">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/home" className="text-2xl font-bold text-accent">
                    AGNIVEER<span className="text-primary">CONNECT</span>
                </Link>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="hidden md:block px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-gray-900"
                    />
                    <UserButton />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
