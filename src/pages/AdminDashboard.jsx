import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Users, Calendar, Briefcase, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalSessions: 0, totalCareers: 0, activeCounselors: 0 });
    const [careers, setCareers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // New Career Form State
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '', category: 'IT', description: '', skillsRequired: '', averageSalary: '', growthScope: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setIsLoading(true);
        const [statsData, careersData] = await Promise.all([
            api.getAdminStats(),
            api.getCareers()
        ]);
        setStats(statsData);
        setCareers(careersData);
        setIsLoading(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCareer = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Process skills into array
            const skillsArray = formData.skillsRequired.split(',').map(s => s.trim()).filter(Boolean);
            await api.addCareer({ ...formData, skillsRequired: skillsArray });
            setShowAddForm(false);
            setFormData({ title: '', category: 'IT', description: '', skillsRequired: '', averageSalary: '', growthScope: '' });
            await loadData();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCareer = async (id) => {
        if (confirm('Are you sure you want to delete this career?')) {
            await api.deleteCareer(id);
            await loadData();
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading admin dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600 mt-1">Platform overview and resource management.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalUsers}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg text-green-600">
                            <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Sessions</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalSessions}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                            <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Career Paths</p>
                            <h3 className="text-2xl font-bold text-slate-900">{stats.totalCareers}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Platform Engagement</p>
                            <h3 className="text-2xl font-bold text-slate-900">84%</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Career Management */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Manage Careers</h2>
                    <Button onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancel' : 'Add New Career'}
                    </Button>
                </div>

                {showAddForm && (
                    <Card className="border-primary-200 bg-primary-50/30">
                        <CardHeader>
                            <CardTitle className="text-lg">Add New Career Resource</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddCareer} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Title" name="title" required value={formData.title} onChange={handleInputChange} />
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-slate-700">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                            {['IT', 'Business', 'Engineering', 'Medical', 'Arts'].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <Input label="Average Salary" name="averageSalary" required value={formData.averageSalary} onChange={handleInputChange} placeholder="e.g. ₹80,000" />
                                    <Input label="Growth Scope" name="growthScope" required value={formData.growthScope} onChange={handleInputChange} placeholder="e.g. High (15%)" />
                                </div>
                                <Input label="Skills Required (comma separated)" name="skillsRequired" required value={formData.skillsRequired} onChange={handleInputChange} placeholder="React, Node.js, CSS" />
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700">Description</label>
                                    <textarea name="description" required rows={3} value={formData.description} onChange={handleInputChange} className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                                </div>
                                <Button type="submit" isLoading={isSubmitting}>Save Career</Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Career Title</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Salary</th>
                                    <th className="px-6 py-4">Growth</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {careers.map((career) => (
                                    <tr key={career.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{career.title}</td>
                                        <td className="px-6 py-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">{career.category}</span></td>
                                        <td className="px-6 py-4 text-slate-600">{career.averageSalary}</td>
                                        <td className="px-6 py-4 text-slate-600">{career.growthScope}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="mr-2 text-slate-400 hover:text-slate-900">Edit</Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCareer(career.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
