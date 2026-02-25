import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Search, MapPin, Target, TrendingUp, IndianRupee } from 'lucide-react';

const CATEGORIES = ['All', 'IT', 'Business', 'Engineering', 'Medical', 'Arts'];

export function Careers() {
    const [careers, setCareers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        async function fetchCareers() {
            setIsLoading(true);
            const data = await api.getCareers(activeCategory, searchQuery);
            setCareers(data);
            setIsLoading(false);
        }

        // Simple debounce
        const timeoutId = setTimeout(() => {
            fetchCareers();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, activeCategory]);

    return (
        <div className="container mx-auto px-4 py-8 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Explore Careers</h1>
                <p className="text-slate-600">Discover paths that match your skills and passions.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search careers by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 text-base shadow-sm"
                    />
                </div>
            </div>

            <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <Card key={i} className="animate-pulse h-64 bg-slate-100/50 border-slate-100" />
                    ))}
                </div>
            ) : careers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {careers.map((career) => (
                        <Card key={career.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-slate-200/60 bg-white">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-50 text-primary-700">
                                        {career.category}
                                    </span>
                                </div>
                                <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                                <p className="text-sm text-slate-600 line-clamp-3">{career.description}</p>
                            </CardHeader>
                            <CardContent className="mt-auto pt-0 flex flex-col gap-3 flex-grow">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {career.skillsRequired.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm pt-4 border-t border-slate-100 mt-auto">
                                    <div className="flex items-center text-slate-700">
                                        <IndianRupee className="h-4 w-4 mr-1.5 text-green-600" />
                                        <span className="font-medium">{career.averageSalary}</span>
                                    </div>
                                    <div className="flex items-center text-slate-700">
                                        <TrendingUp className="h-4 w-4 mr-1.5 text-primary-600" />
                                        <span className="font-medium text-xs sm:text-sm truncate" title={career.growthScope}>
                                            {career.growthScope}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                    <Target className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No careers found</h3>
                    <p className="mt-1 text-slate-500">We couldn't find anything matching your search criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        className="mt-4 text-primary-600 font-medium hover:text-primary-700"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
