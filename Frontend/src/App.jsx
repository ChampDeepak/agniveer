import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import LandingPage from './components/LandingPage'

const App = () => {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <header className="p-4 flex justify-between items-center bg-gray-100">
          <h1 className="text-xl font-bold">Agniveer Dashboard</h1>
          <UserButton />
        </header>
        <main className="p-8">
          <p>Welcome back, Soldier.</p>
          {/* Dashboard components will go here */}
        </main>
      </SignedIn>
    </>
  );
}

export default App