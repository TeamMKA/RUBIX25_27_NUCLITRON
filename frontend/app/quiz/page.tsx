'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Trophy, ArrowRight } from 'lucide-react';
import questions from '@/data/quiz-question.json';
import { db, auth, googleProvider } from '@/lib/firebase';
import {
    signInWithPopup,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Leaderboard from './leaderboard';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [user, setUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter(); // Router for redirecting

    // Handle authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Set loading to false once authentication is checked
        });
        return () => unsubscribe();
    }, []);

    // Redirect to login if the user is not signed in and not loading
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login'); // Redirect to the login page if the user is not logged in
        }
    }, [user, loading, router]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    // const handleLogout = async () => {
    //     try {
    //         await signOut(auth);
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };

    const handleAnswerSubmit = async () => {
        const currentQuestionData = questions.questions[currentQuestion];
        let newScore = score;

        // Check if the selected answer is correct
        if (selectedAnswer === currentQuestionData.correctAnswer) {
            newScore += 1;
            setScore(newScore);
        }

        if (currentQuestion + 1 < questions.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
        } else {
            setShowResults(true);
            // Save score and user info to Firebase
            if (user) {
                try {
                    await addDoc(collection(db, 'quizResults'), {
                        name: user.displayName,
                        email: user.email,
                        score: newScore, // Use the calculated score
                        totalQuestions: questions.questions.length,
                        percentage: Math.round(
                            (newScore / questions.questions.length) * 100
                        ),
                        timestamp: new Date(),
                    });
                } catch (error) {
                    console.error('Failed to save score:', error);
                }
            }
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 flex flex-col items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Login to Start the Quiz</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Button className="mt-4 w-full" onClick={handleLogin}>
                            Sign in with Google
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
                <Card className="max-w-2xl mx-auto mt-[10rem]">
                    <CardHeader>
                        <CardTitle className="text-center flex items-center justify-center gap-2">
                            <Trophy className="h-8 w-8 text-yellow-500" />
                            Quiz Complete!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-bold mb-4">
                            Your Score: {score} / {questions.questions.length}
                        </p>
                        <p className="text-gray-600">
                            You got{' '}
                            {Math.round(
                                (score / questions.questions.length) * 100
                            )}
                            % correct!
                        </p>
                        <Button
                            className="mt-6"
                            onClick={() => {
                                setCurrentQuestion(0);
                                setScore(0);
                                setShowResults(false);
                                setSelectedAnswer('');
                            }}
                        >
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
                <Leaderboard />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <Card className="max-w-2xl mx-auto mt-[10rem]">
                <CardHeader>
                    <CardTitle>
                        Question {currentQuestion + 1} of{' '}
                        {questions.questions.length}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg mb-6">
                        {questions.questions[currentQuestion].question}
                    </p>
                    <RadioGroup
                        value={selectedAnswer}
                        onValueChange={setSelectedAnswer}
                        className="space-y-4"
                    >
                        {questions.questions[currentQuestion].options.map(
                            (option) => (
                                <div key={option} className="flex items-center">
                                    <RadioGroupItem
                                        value={option}
                                        id={option}
                                    />
                                    <Label htmlFor={option} className="ml-2">
                                        {option}
                                    </Label>
                                </div>
                            )
                        )}
                    </RadioGroup>
                    <Button
                        className="mt-8 w-full"
                        onClick={handleAnswerSubmit}
                        disabled={!selectedAnswer}
                    >
                        {currentQuestion + 1 === questions.questions.length ? (
                            'Finish Quiz'
                        ) : (
                            <>
                                Next Question{' '}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                    {/* <Button
                        className="mt-4 w-full"
                        variant="secondary"
                        onClick={handleLogout}
                    >
                        Sign Out
                    </Button> */}
                </CardContent>
            </Card>
        </div>
    );
}
