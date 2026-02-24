import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Menu, X, Rocket, LogOut, User as UserIcon } from 'lucide-react';

export function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary-600 p-1.5 rounded-lg">
                                <Rocket className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">CareerPath</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Home</Link>
                            <Link to="/careers" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Careers</Link>

                            {!isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/login">
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button>Register</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                                        Dashboard
                                    </Link>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                                        <UserIcon className="h-4 w-4 text-slate-600" />
                                        <span className="text-sm font-medium text-slate-700">{user.name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                                        <LogOut className="h-4 w-4 text-slate-600" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                        <Link to="/careers" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>

                        {!isAuthenticated ? (
                            <div className="mt-4 flex flex-col gap-2 px-3">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
