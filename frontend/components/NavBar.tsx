'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase'; // Ensure this import exists
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { cn } from '@/lib/utils';
import { MenuItem, Menu, HoveredLink } from './ui/navbar-menu';
import { User } from 'firebase/auth';

const NavBar = () => {
    const [active, setActive] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Track authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the user state to the authenticated user
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className={cn('fixed top-1 inset-x-0 max-w-2xl mx-auto z-50')}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Home">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/">Start</HoveredLink>
                        <HoveredLink href="/#features">Features</HoveredLink>
                        <HoveredLink href="/#quote">Quote</HoveredLink>
                        <HoveredLink href="/#footer">About Us</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/explore">Explore</HoveredLink>
                        <HoveredLink href="/timeline">Time Line</HoveredLink>
                        <HoveredLink href="/maps">Maps</HoveredLink>
                        <HoveredLink href="/explore/#whatif">
                            What If Section
                        </HoveredLink>
                        <HoveredLink href="/chat">
                            Chat with Key Figures
                        </HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Games">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/quiz">Quiz</HoveredLink>
                        <HoveredLink href="/tile">Card Tile</HoveredLink>
                    </div>
                </MenuItem>

                {/* Conditional rendering for Login, Logout, and ImageGen links */}
                <MenuItem setActive={setActive} active={active} item="Account">
                    <div className="flex flex-col space-y-4 text-sm">
                        {!user ? (
                            <HoveredLink href="/login">Login</HoveredLink>
                        ) : (
                            <>
                                <div className="text-yellow-500">
                                    {user.displayName
                                        ? user.displayName
                                        : 'User'}
                                </div>
                                <HoveredLink href="/image-gen">
                                    ImageGen
                                </HoveredLink>
                                <button
                                    onClick={handleSignOut}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default NavBar;
