'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { MenuItem, Menu, HoveredLink } from './ui/navbar-menu';

const NavBar = () => {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn('fixed top-10 inset-x-0 max-w-2xl mx-auto z-50')}>
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
                            What If Section{' '}
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
            </Menu>
        </div>
    );
};

export default NavBar;
