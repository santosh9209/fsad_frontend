import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { User, ShieldCheck } from 'lucide-react';

const INTEREST_OPTIONS = ['IT', 'Business', 'Engineering', 'Medical', 'Arts'];

export function Register() {
    const location = useLocation();
    const [isAdminRegister, setIsAdminRegister] = useState(location.search.includes('role=admin'));
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        interests: []
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleModeSwitch = (mode) => {
        setIsAdminRegister(mode === 'admin');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestChange = (interest) => {
        setFormData(prev => {
            const interests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            const newUser = await register({
                ...formData,
                role: isAdminRegister ? 'admin' : 'student'
            });
            if (newUser.role === 'admin') navigate('/admin');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="flex p-1 bg-slate-100 rounded-lg w-full">
                            <button
                                type="button"
                                onClick={() => handleModeSwitch('student')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${!isAdminRegister ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <User className="h-4 w-4" /> Student
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModeSwitch('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${isAdminRegister ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <ShieldCheck className="h-4 w-4" /> Admin
                            </button>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isAdminRegister ? 'Admin Registration' : 'Create an account'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isAdminRegister ? 'Register as a platform administrator.' : 'Enter your information to get started'}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                        <Input
                            label="Full Name *"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email *"
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Password *"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {!isAdminRegister && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Areas of Interest</label>
                                <div className="flex flex-wrap gap-2">
                                    {INTEREST_OPTIONS.map(interest => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => handleInterestChange(interest)}
                                            className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors border ${formData.interests.includes(interest)
                                                ? 'bg-primary-100 border-primary-500 text-primary-800'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign Up
                        </Button>
                        <div className="text-sm text-center text-slate-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
