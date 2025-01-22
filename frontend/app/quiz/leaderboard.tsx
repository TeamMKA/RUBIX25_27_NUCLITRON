// pages/leaderboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaderboardEntry {
    id: string;
    name: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    timestamp: string;
}

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, 'quizResults'),
                    orderBy('score', 'desc'), // Order by score in descending order
                    orderBy('timestamp', 'asc') // Break ties by timestamp
                );
                const snapshot = await getDocs(q);

                const data: LeaderboardEntry[] = snapshot.docs.map((doc) => ({
                    ...(doc.data() as LeaderboardEntry),
                    id: doc.id,
                }));
                setLeaderboard(data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading leaderboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Leaderboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {leaderboard.length === 0 ? (
                        <p className="text-center">No results yet!</p>
                    ) : (
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">
                                        Rank
                                    </th>
                                    <th className="border px-4 py-2 text-left">
                                        Name
                                    </th>
                                    <th className="border px-4 py-2 text-right">
                                        Score
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, index) => (
                                    <tr key={entry.id}>
                                        <td className="border px-4 py-2 text-left">
                                            {index + 1}
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {entry.name}
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {entry.score} /{' '}
                                            {entry.totalQuestions}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
