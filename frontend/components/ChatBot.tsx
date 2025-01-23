'use client';

import type React from 'react';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import { HfInference } from '@huggingface/inference';
import { ChevronDown, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Historian {
    id: string;
    name: string;
    systemPrompt: string;
    avatar: string;
}

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const ChatBot: React.FC<{ historians: Historian[] }> = ({ historians }) => {
    const [selectedHistorian, setSelectedHistorian] = useState<Historian>(
        historians[0]
    );
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: selectedHistorian.systemPrompt },
        {
            role: 'assistant',
            content: `Greetings, I am ${selectedHistorian.name}. How may I assist you today?`,
        },
    ]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const client = useRef(
        new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN || '')
    ).current;

    useEffect(() => {
        setMessages([
            { role: 'system', content: selectedHistorian.systemPrompt },
            {
                role: 'assistant',
                content: `Greetings, I am ${selectedHistorian.name}. How may I assist you today?`,
            },
        ]);
    }, [selectedHistorian]);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector(
                '[data-radix-scroll-area-viewport]'
            );
            if (scrollContainer) {
                const isScrolledToBottom =
                    scrollContainer.scrollHeight -
                        scrollContainer.clientHeight <=
                    scrollContainer.scrollTop + 1;
                if (isScrolledToBottom) {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(scrollToBottom, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: 'user', content: input },
        ];
        setMessages(newMessages);
        setInput('');
        setIsStreaming(true);

        try {
            const stream = client.chatCompletionStream({
                model: 'meta-llama/Llama-3.2-3B-Instruct',
                messages: newMessages.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                })),
                temperature: 0.5,
                max_tokens: 300,
                top_p: 0.7,
            });

            let assistantResponse = '';
            for await (const chunk of stream) {
                if (chunk.choices && chunk.choices.length > 0) {
                    const newContent = chunk.choices[0].delta.content || '';
                    assistantResponse += newContent;

                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        const lastMessageIndex = updatedMessages.length - 1;

                        if (
                            updatedMessages[lastMessageIndex].role ===
                            'assistant'
                        ) {
                            updatedMessages[lastMessageIndex] = {
                                ...updatedMessages[lastMessageIndex],
                                content: assistantResponse,
                            };
                        } else {
                            updatedMessages.push({
                                role: 'assistant',
                                content: assistantResponse,
                            });
                        }

                        return updatedMessages;
                    });
                }
            }
        } catch (error) {
            console.error('Streaming error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'Apologies, but an error has disrupted our discourse.',
                },
            ]);
        } finally {
            setIsStreaming(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background shadow-2xl rounded-2xl overflow-hidden border">
            {/* Historian Selector */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-white/50 shadow-lg">
                            <AvatarImage
                                src={selectedHistorian.avatar}
                                alt={selectedHistorian.name}
                            />
                            <AvatarFallback>
                                {selectedHistorian.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tight">
                                {selectedHistorian.name}
                            </span>
                            <span className="text-xs text-white/80">
                                Great Figure
                            </span>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                            >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {historians
                                .filter((h) => h.id !== selectedHistorian.id)
                                .map((historian) => (
                                    <DropdownMenuItem
                                        key={historian.id}
                                        onSelect={() =>
                                            setSelectedHistorian(historian)
                                        }
                                    >
                                        <Avatar className="w-8 h-8 mr-2">
                                            <AvatarImage
                                                src={historian.avatar}
                                                alt={historian.name}
                                            />
                                            <AvatarFallback>
                                                {historian.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        {historian.name}
                                    </DropdownMenuItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Chat Messages Area */}
            <ScrollArea className="flex-grow" ref={scrollAreaRef}>
                <div className="p-6 space-y-6">
                    {messages
                        .filter((message) => message.role !== 'system')
                        .map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'flex items-start space-x-3',
                                    message.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                )}
                            >
                                {message.role === 'assistant' && (
                                    <Avatar className="w-8 h-8 mt-1">
                                        <AvatarImage
                                            src={selectedHistorian.avatar}
                                            alt={selectedHistorian.name}
                                        />
                                        <AvatarFallback>
                                            {selectedHistorian.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        'p-4 rounded-2xl shadow-sm',
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-none ml-12'
                                            : 'bg-muted text-muted-foreground rounded-bl-none mr-12'
                                    )}
                                    style={{ maxWidth: 'calc(100% - 4rem)' }}
                                >
                                    <p className="text-sm leading-relaxed break-words">
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-2"
                >
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message ${selectedHistorian.name}...`}
                        disabled={isStreaming}
                        className="flex-grow"
                    />
                    <Button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                    >
                        {isStreaming ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
