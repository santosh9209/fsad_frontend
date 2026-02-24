import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';

export function BookSession() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [counselors, setCounselors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        counselorId: '',
        date: '',
        reason: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadCounselors() {
            const data = await api.getCounselors();
            setCounselors(data);
            if (data.length > 0) {
                setFormData(prev => ({ ...prev, counselorId: data[0].id }));
            }
            setIsLoading(false);
        }
        loadCounselors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.counselorId || !formData.date || !formData.reason) {
            setError('Please fill in all fields');
            return;
        }

        // Basic date validation (future date only)
        if (new Date(formData.date) <= new Date()) {
            setError('Please select a future date and time');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.bookSession({
                userId: user.id,
                counselorId: formData.counselorId,
                date: formData.date,
                reason: formData.reason
            });
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to book session. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-8 bg-primary-200 rounded-full mb-4"></div>
                    <div className="h-4 w-24 bg-primary-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Book a Session</h1>
                <p className="text-slate-600 mt-1">Schedule a one-on-one session with our expert counselors.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Session Details</CardTitle>
                    <CardDescription>Fill out the form below to confirm your booking.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Select Counselor</label>
                            <select
                                name="counselorId"
                                value={formData.counselorId}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                {counselors.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.name} - {c.specialization} ({c.experience})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Date & Time"
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Reason for Session</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows={4}
                                className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                placeholder="Briefly describe what you'd like to discuss..."
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <Button type="submit" isLoading={isSubmitting}>
                            Confirm Booking
                        </Button>
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
