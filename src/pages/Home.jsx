import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Rocket, ArrowRight, UserPlus, Search } from 'lucide-react';

export function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate pt-14">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="py-24 sm:py-32 lg:pb-40">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <div className="mb-8 flex justify-center">
                                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                                    Announcing our newest counseling features.{' '}
                                    <Link to="/register" className="font-semibold text-primary-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></Link>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                                Discover Your Perfect Career Path
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Explore thousands of careers, connect with expert counselors, and build a personalized path to success. The guidance you need is right here.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link to="/careers">
                                    <Button size="lg" className="gap-2">
                                        <Search className="h-5 w-5" /> Explore Careers
                                    </Button>
                                </Link>
                                <Link to="/book-session">
                                    <Button variant="outline" size="lg" className="gap-2">
                                        Book Counseling Session <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
