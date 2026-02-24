import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Calendar, Briefcase, ArrowRight, Clock } from 'lucide-react';

export function Dashboard() {
    const { user } = useAuth();
    const [recommendedCareers, setRecommendedCareers] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            if (user) {
                const [careersRes, sessionsRes] = await Promise.all([
                    api.getRecommendedCareers(user.interests || []),
                    api.getSessionsByUser(user.id)
                ]);
                setRecommendedCareers(careersRes);
                setSessions(sessionsRes);
            }
            setIsLoading(false);
        }
        loadData();
    }, [user]);

    if (isLoading) {
        return <div className="flex justify-center py-12"><div className="animate-pulse flex flex-col items-center"><div className="h-8 w-8 bg-primary-200 rounded-full mb-4"></div><div className="h-4 w-24 bg-primary-100 rounded"></div></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}!</h1>
                    <p className="text-slate-500 mt-1">Here is the latest from your career journey.</p>
                </div>
                <Link to="/book-session">
                    <Button className="gap-2">
                        <Calendar className="h-4 w-4" /> Schedule Session
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recommended Careers */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-800">Recommended Careers</h2>
                        <Link to="/careers" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        {recommendedCareers.length > 0 ? recommendedCareers.map(career => (
                            <Card key={career.id} className="hover:border-primary-300 transition-colors">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 mb-2">
                                                {career.category}
                                            </span>
                                            <CardTitle className="text-lg">{career.title}</CardTitle>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <p className="text-sm text-slate-600 line-clamp-2">{career.description}</p>
                                </CardContent>
                            </Card>
                        )) : (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                                    <Briefcase className="h-8 w-8 text-slate-300 mb-3" />
                                    <p className="text-slate-500">No recommendations right now.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-slate-800">Your Sessions</h2>

                    <div className="grid gap-4">
                        {sessions.length > 0 ? sessions.map(session => (
                            <Card key={session.id} className="relative overflow-hidden">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${session.status === 'Upcoming' ? 'bg-primary-500' : 'bg-green-500'}`}></div>
                                <CardContent className="p-5 flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${session.status === 'Upcoming' ? 'bg-primary-50 text-primary-600' : 'bg-green-50 text-green-600'}`}>
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-slate-900">Session with Counselor ID: {session.counselorId}</h3>
                                        <p className="text-sm text-slate-500 mt-1">{new Date(session.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                        <p className="text-sm font-medium mt-2">
                                            Status: <span className={session.status === 'Upcoming' ? 'text-primary-600' : 'text-green-600'}>{session.status}</span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )) : (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
                                    <Calendar className="h-8 w-8 text-slate-300 mb-3" />
                                    <p>No sessions booked yet.</p>
                                    <Link to="/book-session" className="mt-4 text-primary-600 font-medium hover:underline text-sm">
                                        Book your first session
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
