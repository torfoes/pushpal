'use client';

import React, { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const navItems = [
  {
    title: "Levels of Permissions",
    subItems: [
      { title: "Non-member", description: "Access to public resources only." },
      { title: "Registering-member", description: "Register to gain access to more features." },
      { title: "Member", description: "Full access to member dashboard and events." },
      { title: "Officer", description: "Manage event catalog and pending members." },
      { title: "Admin", description: "Full administrative control of the platform." },
    ],
  },
  {
    title: "Initial Set-up",
    subItems: [
      { title: "Officers/Admins", description: "Instructions for initial admin and officer setup." },
      { title: "Members", description: "Steps for adding new members." },
      { title: "Transfer Admin Privileges", description: "Guide to transferring administrative roles." },
    ],
  },
  {
    title: "Modifications",
    subItems: [
      { title: "Edit User Roles", description: "Modify the roles of existing users." },
      { title: "Adjust Permissions", description: "Adjust access permissions for users." },
      { title: "Update Profile Settings", description: "Update user profile settings and information." },
    ],
  },
  {
    title: "Events",
    subItems: [
      { title: "Create Event", description: "Create and organize a new event." },
      { title: "Manage Event Catalog", description: "Manage and edit existing events." },
      { title: "View Event History", description: "Access past event details and attendance." },
    ],
  },
  {
    title: "Push Notifications",
    subItems: [
      { title: "Send Notifications", description: "Send updates to users via notifications." },
      { title: "Manage Notification Settings", description: "Adjust user notification preferences." },
    ],
  },
];

export function NavigationMenuDemo() {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainNavbarHeight = 50; // Adjust this value based on the height of your main navbar
      setIsScrolledPast(window.scrollY > mainNavbarHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Conditional fixed Navigation Menu based on scroll */}
      <div className={`w-full bg-black py-4 z-50 shadow-md ${isScrolledPast ? 'fixed top-0' : 'absolute top-12'}`}>
        <div className="flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={`#${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                      className="text-white text-lg font-semibold transition-all duration-300 hover:text-gray-300"
                    >
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                      {item.subItems.map((subItem, index) => (
                        <ListItem
                          key={index}
                          title={subItem.title}
                          description={subItem.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Content Sections with Offset for Scroll */}
      <div className="mt-32 px-6 py-8 w-full max-w-3xl mx-auto"> {/* Adjusted margin-top */}
        {navItems.map((item, idx) => (
          <section
            key={idx}
            id={item.title.replace(/\s+/g, '-').toLowerCase()}
            className="mb-10 scroll-mt-32"  // scroll-mt-32 to accommodate both navbars
          >
            <h2 className="text-2xl font-bold mb-4 text-center">{item.title}</h2>
            {item.subItems.map((subItem, subIdx) => (
              <div key={subIdx} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{subItem.title}</h3>
                <div className="w-full max-w-2xl mx-auto text-left">
                  <p className="text-gray-600 mb-2 italic">{subItem.description}</p>
                  <p className="text-gray-800">[Your explanation goes here]</p>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef(({ title, description }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="text-sm leading-tight text-muted-foreground">{description}</p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

export default NavigationMenuDemo;
