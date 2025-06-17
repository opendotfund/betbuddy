import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload'; // This is now the placeholder
import { LimitMessage } from './components/LimitMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Footer } from './components/Footer';
import { ChatInput } from './components/ChatInput';
import { ChatMessages } from './components/ChatMessages';
import { Disclaimer } from './components/Disclaimer'; // Added import
import { analyzeBetWithGemini } from './services/geminiService';
import { MAX_DAILY_CHECKS, LOCAL_STORAGE_KEY } from './constants';
import { DailyUsage, ChatMessage as ChatMessageType } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [betChecksRemaining, setBetChecksRemaining] = useState<number>(MAX_DAILY_CHECKS);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const storedUsageString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedUsageString) {
      try {
        const storedUsage = JSON.parse(storedUsageString) as DailyUsage;
        if (storedUsage.date === todayStr) {
          setBetChecksRemaining(Math.max(0, MAX_DAILY_CHECKS - storedUsage.count));
        } else {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ count: 0, date: todayStr }));
          setBetChecksRemaining(MAX_DAILY_CHECKS);
        }
      } catch (e) {
        console.error("Failed to parse stored usage data:", e);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ count: 0, date: todayStr }));
        setBetChecksRemaining(MAX_DAILY_CHECKS);
      }
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ count: 0, date: todayStr }));
      setBetChecksRemaining(MAX_DAILY_CHECKS);
    }
    // Initial welcome message
    setChatMessages([{id: 'initial-welcome', sender: 'ai', text: "Welcome to Betting Buddy AI! Describe your bet in the box below, and I'll give you my analysis."}]);
  }, []);


  const handleSendChatMessage = async (userMessageText: string) => {
    if (betChecksRemaining <= 0) {
      const limitMsg: ChatMessageType = {
        id: Date.now().toString() + '_limit',
        sender: 'ai',
        text: "You've reached your daily analysis limit. Please come back tomorrow!"
      };
      setChatMessages(prev => [...prev, limitMsg]);
      return;
    }
    if (!userMessageText.trim()) return;

    const newUserMessage: ChatMessageType = {
      id: Date.now().toString() + '_user',
      sender: 'user',
      text: userMessageText,
    };
    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const aiResponseText = await analyzeBetWithGemini(userMessageText);
      const aiMessage: ChatMessageType = {
        id: Date.now().toString() + '_ai',
        sender: 'ai',
        text: aiResponseText,
      };
      setChatMessages(prevMessages => [...prevMessages, aiMessage]);

      const todayStr = new Date().toISOString().split('T')[0];
      const storedUsageString = localStorage.getItem(LOCAL_STORAGE_KEY);
      let currentCount = 0;
      if (storedUsageString) {
        try {
          const storedUsage = JSON.parse(storedUsageString) as DailyUsage;
          if (storedUsage.date === todayStr) {
            currentCount = storedUsage.count;
          }
        } catch (e) {
          console.error("Error parsing usage for update:", e);
        }
      }
      const newCount = currentCount + 1;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ count: newCount, date: todayStr }));
      setBetChecksRemaining(MAX_DAILY_CHECKS - newCount);

    } catch (e: any) {
      const errorText = e.message || "An unexpected error occurred during analysis.";
      const aiErrorMessage: ChatMessageType = {
        id: Date.now().toString() + '_err',
        sender: 'ai',
        text: errorText, // analyzeBetWithGemini should format this well
      };
      setChatMessages(prevMessages => [...prevMessages, aiErrorMessage]);
      console.error("Analysis error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const showTypingIndicator = isLoading && chatMessages.length > 0 && chatMessages[chatMessages.length -1]?.sender === 'user';

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header checksRemaining={betChecksRemaining} />
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col h-[calc(100vh-350px)]">
          <ChatMessages messages={chatMessages} isLoading={showTypingIndicator} />
        </div>
        
        {betChecksRemaining > 0 ? (
          <ChatInput onSendMessage={handleSendChatMessage} isLoading={isLoading} />
        ) : (
          <div className="w-full max-w-2xl">
            <LimitMessage />
          </div>
        )}
        <Disclaimer />
        <ImageUpload />
      </main>
      <Footer />
    </div>
  );
};

export default App;