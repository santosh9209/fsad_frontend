import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { User, ShieldCheck } from 'lucide-react';

export function Login() {
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const [email, setEmail] = useState('john@test.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleModeSwitch = (mode) => {
        setIsAdminLogin(mode === 'admin');
        if (mode === 'admin') {
            setEmail('admin@test.com');
        } else {
            setEmail('john@test.com');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            const user = await login(email, password);
            if (isAdminLogin && user.role !== 'admin') {
                setError('Access Denied: Admin privileges required.');
                return;
            }
            if (user.role === 'admin') navigate('/admin');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to login');
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
                                onClick={() => handleModeSwitch('student')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${!isAdminLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <User className="h-4 w-4" /> Student
                            </button>
                            <button
                                onClick={() => handleModeSwitch('admin')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-colors ${isAdminLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <ShieldCheck className="h-4 w-4" /> Admin
                            </button>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isAdminLogin ? 'Admin Portal' : 'Welcome back'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isAdminLogin ? 'Sign in to manage the platform' : 'Enter your email to sign in to your account'}
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
                            label="Email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign In
                        </Button>
                        <div className="text-sm text-center text-slate-500">
                            Don't have an account?{' '}
                            <Link to={`/register${isAdminLogin ? '?role=admin' : ''}`} className="text-primary-600 hover:text-primary-500 font-medium">
                                Register here
                            </Link>
                        </div>
                        <div className="text-xs text-center text-slate-400 mt-4">
                            {isAdminLogin ? (
                                <p>Demo Admin: admin@test.com / password123</p>
                            ) : (
                                <p>Demo User: john@test.com / password123</p>
                            )}
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
