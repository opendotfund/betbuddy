
import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean; // For AI typing indicator
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);


  return (
    <div ref={chatContainerRef} className="w-full flex-grow flex flex-col justify-end min-h-[200px] max-h-[calc(100vh-450px)] overflow-y-auto pr-1 space-y-3 py-3 fancy-scrollbar">
        {messages.map((msg) => (
        <div
            key={msg.id}
            className={`p-3.5 rounded-xl shadow-md max-w-[85%] break-words clear-both text-sm md:text-base ${
            msg.sender === 'user'
                ? 'bg-sky-600 text-sky-50 ml-auto float-right rounded-br-none'
                : 'bg-slate-700 text-slate-200 mr-auto float-left rounded-bl-none'
            }`}
        >
            <p className="text-xs font-semibold mb-1.5 capitalize opacity-80">
            {msg.sender === 'user' ? 'You' : 'Betting Buddy AI'}
            </p>
            <div className="whitespace-pre-wrap leading-relaxed prose prose-invert prose-sm sm:prose-base max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1">
                {msg.text}
            </div>
        </div>
        ))}
        {isLoading && (
            <div className="p-3.5 rounded-xl shadow-md max-w-[85%] bg-slate-700 text-slate-200 mr-auto float-left clear-both rounded-bl-none">
                <p className="text-xs font-semibold mb-1.5 capitalize opacity-80">Betting Buddy AI</p>
                <div className="flex items-center space-x-1.5 h-5">
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} style={{height: '1px'}} /> {/* Helper for scrolling */}
        {/*
          The 'fancy-scrollbar' class will no longer have custom styles applied from here.
          If custom scrollbars are desired, styles should be added to a global CSS file.
          For example, in a global index.css or App.css:
            .fancy-scrollbar::-webkit-scrollbar { width: 6px; }
            .fancy-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .fancy-scrollbar::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 3px; }
            .fancy-scrollbar::-webkit-scrollbar-thumb:hover { background: #718096; }
        */}
    </div>
  );
};
