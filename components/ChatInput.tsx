import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl p-4 bg-slate-800 rounded-xl shadow-xl mt-5">
      <label htmlFor="chatMessageInput" className="block text-lg font-semibold text-emerald-400 mb-3">
        Describe Your Bet for Analysis:
      </label>
      <textarea
        id="chatMessageInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., 'Lakers -5.5 vs Celtics, odds -110. Good bet?'"
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-100 placeholder-slate-400 resize-none transition-colors duration-150"
        rows={3}
        disabled={isLoading}
        aria-label="Describe your bet"
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center text-base"
        aria-live="polite"
      >
        {isLoading && <LoadingSpinner size="sm" color="white" />}
        <span className={isLoading ? 'ml-2' : ''}>
          {isLoading ? 'AI Thinking...' : 'Send for Analysis'}
        </span>
      </button>
    </form>
  );
};
