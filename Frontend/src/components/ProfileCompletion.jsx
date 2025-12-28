import React, { useState, useEffect } from 'react';

const ProfileCompletion = ({ onComplete, initialData = null }) => {
    const [loading, setLoading] = useState(false);

    // Clear URL hash to prevent misleading #features link
    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    const [formData, setFormData] = useState({
        address: '',
        dob: '',
        heading: '',
        about: '',
        skills: [],
        interests: [],
        experience: [],
        contactInfo: {
            phone: '',
            email: '',
            isPublic: false
        }
    });

    const [currentSkill, setCurrentSkill] = useState('');
    const [currentInterest, setCurrentInterest] = useState('');

    // Pre-fill form if initialData exists (Edit Mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                address: initialData.address || '',
                dob: initialData.dob ? initialData.dob.split('T')[0] : '',
                heading: initialData.heading || '',
                about: initialData.about || '',
                skills: initialData.skills || [],
                interests: initialData.interests || [],
                experience: initialData.experience || [],
                contactInfo: {
                    phone: initialData.contactInfo?.phone || '',
                    email: initialData.contactInfo?.email || '',
                    isPublic: initialData.contactInfo?.isPublic || false
                }
            });
        }
    }, [initialData]);

    const skillsOptions = ["Security Operations", "Logistics", "Driving", "Team Leadership"];
    const interestOptions = ["Business", "Government Jobs", "Private Sector", "Networking"];

    const handleChange = (e) => {
        if (e.target.name.startsWith('contact.')) {
            const field = e.target.name.split('.')[1];
            setFormData({
                ...formData,
                contactInfo: {
                    ...formData.contactInfo,
                    [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
                }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addSkill = (skill) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
            setCurrentSkill('');
        }
    };

    const addInterest = (interest) => {
        if (interest && !formData.interests.includes(interest)) {
            setFormData({ ...formData, interests: [...formData.interests, interest] });
            setCurrentInterest('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
    };

    const removeInterest = (interestToRemove) => {
        setFormData({ ...formData, interests: formData.interests.filter(i => i !== interestToRemove) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await window.Clerk.session.getToken();
            const res = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    onComplete(data);
                } catch {
                    console.error("Failed to parse JSON response:", text);
                }
            } else {
                console.error("Update failed with status:", res.status);
                const text = await res.text();
                console.error("Error details:", text);
            }
        } catch (error) {
            console.error("Error submitting profile:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-gray-900">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {initialData ? 'Edit Your Profile' : 'Complete Your Service Record'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {initialData ? 'Update your professional details.' : 'Tell us about your service and skills to unlock the platform.'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

                        {/* Heading */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Professional Headline</label>
                            <input
                                type="text"
                                name="heading"
                                required
                                placeholder="Ex-Agniveer | Security Supervisor | Logistics Expert"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                value={formData.heading}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Contact Info Section */}
                        <div className="sm:col-span-2 border-t pt-4 mt-2">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="contact.phone"
                                        placeholder="+91 9876543210"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                        value={formData.contactInfo.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email (Public Display)</label>
                                    <input
                                        type="email"
                                        name="contact.email"
                                        placeholder="you@example.com"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                        value={formData.contactInfo.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="sm:col-span-2 flex items-center gap-2">
                                    <input
                                        id="isPublic"
                                        type="checkbox"
                                        name="contact.isPublic"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        checked={formData.contactInfo.isPublic}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="isPublic" className="block text-sm text-gray-900">
                                        Make my contact info visible to other users
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Current Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        {/* DOB */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* About */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">About Section</label>
                        <textarea
                            name="about"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                            placeholder="Briefly describe your service experience and career goals..."
                            value={formData.about}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="flex gap-2 mt-1 mb-2">
                            <select
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                onChange={(e) => addSkill(e.target.value)}
                                value=""
                            >
                                <option value="" disabled>Select Common Skills</option>
                                {skillsOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Or type custom..."
                                    className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm border-r-0 text-gray-900"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => addSkill(currentSkill)}
                                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {skill}
                                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Interests */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Interests</label>
                        <div className="flex gap-2 mt-1 mb-2">
                            <select
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm text-gray-900"
                                onChange={(e) => addInterest(e.target.value)}
                                value=""
                            >
                                <option value="" disabled>Select Interest</option>
                                {interestOptions.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Or type custom..."
                                    className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary sm:text-sm border-r-0 text-gray-900"
                                    value={currentInterest}
                                    onChange={(e) => setCurrentInterest(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => addInterest(currentInterest)}
                                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.interests.map((int, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {int}
                                    <button type="button" onClick={() => removeInterest(int)} className="ml-1 text-green-600 hover:text-green-800">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-[#0a192f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (initialData ? 'Update Profile' : 'Complete Profile')}
                    </button>

                    {initialData && (
                        <button
                            type="button"
                            onClick={() => onComplete(initialData)} // Cancel just returns old data (effectively closes)
                            className="w-full mt-2 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfileCompletion;
