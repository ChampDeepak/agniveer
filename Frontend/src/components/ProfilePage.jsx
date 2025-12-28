import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from './Navbar';
import ProfileCompletion from './ProfileCompletion';

const ProfilePage = () => {
    const { id } = useParams();
    const { user: currentUser } = useUser();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const isOwnProfile = currentUser?.id === id || id === 'me';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await window.Clerk.session.getToken();
                const endpoint = isOwnProfile ? '/api/user/me' : `/api/user/${id}`;
                const res = await fetch(endpoint, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setProfileUser(data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, isOwnProfile]);


    const handleEditComplete = (updatedData) => {
        setProfileUser(updatedData);
        setIsEditing(false);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!profileUser) return <div className="min-h-screen flex items-center justify-center">User not found</div>;

    if (isEditing) {
        return <ProfileCompletion onComplete={handleEditComplete} initialData={profileUser} />;
    }

    // Contact Info Logic: Show if own profile OR (info is public AND showed clicked)
    const canSeeContact = isOwnProfile || profileUser.contactInfo?.isPublic;

    return (
        <div className="min-h-screen bg-[#f3f2ef] font-sans">
            <Navbar />
            <div className="pt-24 pb-10 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header Card */}
                    <div className="bg-white rounded-xl shadow overflow-hidden mb-6 relative">
                        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                        <div className="px-8 pb-8">
                            <div className="relative -mt-16 mb-4 flex justify-between items-end">
                                <img
                                    src={profileUser.image || "https://via.placeholder.com/150"}
                                    alt={profileUser.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md relative z-10 bg-white"
                                />
                                <div className="mb-2">
                                    {isOwnProfile ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-6 py-2 rounded-full border border-gray-400 font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <button className="px-6 py-2 rounded-full bg-primary text-white font-semibold hover:bg-secondary transition-colors">
                                                Connect
                                            </button>
                                            <button className="px-6 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-blue-50 transition-colors">
                                                Message
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900">{profileUser.name}</h1>
                            <p className="text-xl text-gray-700 mt-1">{profileUser.heading}</p>

                            <div className="text-sm text-gray-500 mt-3 flex flex-col gap-1">
                                <span>{profileUser.address}</span>

                                {canSeeContact ? (
                                    <div className="relative inline-block mt-1">
                                        <button
                                            onClick={() => setShowContact(!showContact)}
                                            className="text-primary font-semibold hover:underline cursor-pointer"
                                        >
                                            Contact info
                                        </button>
                                        {showContact && (
                                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 p-4">
                                                <h3 className="font-bold text-gray-900 mb-2">Contact Details</h3>
                                                {profileUser.contactInfo?.email && (
                                                    <div className="mb-2">
                                                        <p className="text-xs text-gray-500">Email</p>
                                                        <a href={`mailto:${profileUser.contactInfo.email}`} className="text-primary hover:underline block truncate">
                                                            {profileUser.contactInfo.email}
                                                        </a>
                                                    </div>
                                                )}
                                                {profileUser.contactInfo?.phone && (
                                                    <div>
                                                        <p className="text-xs text-gray-500">Phone</p>
                                                        <p className="text-gray-900">{profileUser.contactInfo.phone}</p>
                                                    </div>
                                                )}
                                                {!profileUser.contactInfo?.email && !profileUser.contactInfo?.phone && (
                                                    <p className="text-gray-500 text-sm italic">No details added.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-gray-400 italic mt-1">Contact info hidden</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-xl shadow p-8 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {profileUser.about || "No description provided."}
                        </p>
                    </div>

                    {/* Skills & Interests Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Skills */}
                        <div className="bg-white rounded-xl shadow p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Skills</h2>
                            <div className="flex flex-wrap gap-3">
                                {profileUser.skills && profileUser.skills.map((skill, i) => (
                                    <span key={i} className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 font-medium rounded-lg">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="bg-white rounded-xl shadow p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Interests</h2>
                            <div className="flex flex-wrap gap-3">
                                {profileUser.interests && profileUser.interests.map((int, i) => (
                                    <span key={i} className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 font-medium rounded-lg">
                                        {int}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
