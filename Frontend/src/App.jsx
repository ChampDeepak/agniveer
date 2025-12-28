
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import ProfileCompletion from './components/ProfileCompletion';
import ProfilePage from './components/ProfilePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <SignedOut><LandingPage /></SignedOut>
          <SignedIn><AuthenticatedRedirect /></SignedIn>
        </>
      } />
      <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/profile/:id" element={<RequireAuth><ProfilePage /></RequireAuth>} />
      <Route path="/complete-profile" element={<RequireAuth><ProfileCompletionWrapper /></RequireAuth>} />
    </Routes>
  );
};

// Component to handle initial redirect based on profile completion
const AuthenticatedRedirect = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (isLoaded && user) {
        try {
          const token = await window.Clerk.session.getToken();
          const res = await fetch('/api/user/me', {
            headers: { 'Authorization': `Bearer ${token} ` }
          });
          if (res.ok) {
            const userData = await res.json();
            if (userData.profileCompletion < 60) {
              navigate('/complete-profile');
            } else {
              navigate('/home');
            }
          }
        } catch (e) {
          console.error(e);
        } finally {
          setChecking(false);
        }
      }
    };
    checkProfile();
  }, [isLoaded, user, navigate]);

  if (checking) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  return null;
};

// Wrapper for ProfileCompletion to pass the onComplete handler
const ProfileCompletionWrapper = () => {
  const navigate = useNavigate();
  return <ProfileCompletion onComplete={() => navigate('/home')} />;
};

// Auth Guard
const RequireAuth = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><Navigate to="/" /></SignedOut>
    </>
  );
};

export default App;