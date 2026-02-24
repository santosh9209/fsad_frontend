import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Compass, Calendar, Settings, FileText, Users } from 'lucide-react';

export function Sidebar({ className }) {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const userLinks = [
        { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
        { name: 'My Sessions', to: '/dashboard/sessions', icon: Calendar },
        { name: 'Settings', to: '/dashboard/settings', icon: Settings },
    ];

    const adminLinks = [
        { name: 'Overview', to: '/admin', icon: LayoutDashboard },
        { name: 'Career Resources', to: '/admin/resources', icon: FileText },
        { name: 'Users & Sessions', to: '/admin/users', icon: Users },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    return (
        <aside className={cn("hidden lg:block w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4", className)}>
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-xs uppercase text-slate-400 tracking-wider mb-2 ml-3">
                    {isAdmin ? 'Admin Menu' : 'User Menu'}
                </div>
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/dashboard' || link.to === '/admin'}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary-50 text-primary-700"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}
