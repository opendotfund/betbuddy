
import React from 'react';

interface HeaderProps {
  checksRemaining: number;
}

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
    <path d="M13 6h-2v5.414l-1.293-1.293-.707.707L12 13.536l3-3-1.414-1.414L13 11.586zM17.5 7H15V5h2.5c.275 0 .5.225.5.5v1c0 .275-.225.5-.5.5zM9 5h2.5v2H9c-.275 0-.5-.225-.5-.5v-1C8.5 5.225 8.725 5 9 5zM12 19c-1.432 0-2.783-.378-3.948-1.076l.618-1.236A6.002 6.002 0 0 0 12 18c1.905 0 3.633-.872 4.793-2.285l.894.447A7.957 7.957 0 0 1 12 19z" transform="scale(0.8) translate(3, 3)"/>
    <path d="M18.968 18.028a7.003 7.003 0 0 1-13.936 0H3v2h18v-2h-2.032zM7 15h2v3H7zm8 0h2v3h-2z" transform="scale(0.8) translate(3, 3)"/>
    <path d="M12 2c-.63 0-1.23.111-1.79.317.062.06.123.121.182.183H12V2zm0 1c-.53 0-1.03.07-1.5.21V3h1.5v1.21c-.47-.14-1-.21-1.5-.21zM9.5 5H11v1.5c0 .28.22.5.5.5s.5-.22.5-.5V5h1.5c.28 0 .5.22.5.5V7h-1V5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V7h-1V5.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V7H8V5.5c0-.28.22-.5.5-.5z" transform="scale(0.8) translate(3,3)" fill="#FFD700" />
    <path d="M12 4a8 8 0 00-8 8c0 1.59.47 3.06 1.28 4.32L4 18.5V20h5.5l.72-1.28A8 8 0 0012 20a8 8 0 008-8 8 8 0 00-8-8zm0 14a6 6 0 01-6-6 6 6 0 016-6 6 6 0 016 6 6 6 0 01-6 6z" transform="scale(0.8) translate(3,3)" fill="#FFC107" />
    <path d="M13 7h-2v3.17l-1.5-1.5L8.09 10.09 11 13v1h2v-1l2.91-2.91L14.5 8.67 13 10.17V7z" transform="scale(0.8) translate(3,3)" fill="#FFF" />
    <path d="M12 1a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0V2a1 1 0 0 0-1-1z" transform="scale(0.8) translate(3,3)" fill="#BDBDBD"/>
  </svg>
);


export const Header: React.FC<HeaderProps> = ({ checksRemaining }) => {
  return (
    <header className="bg-slate-800 shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <TrophyIcon className="h-10 w-10 text-amber-400" />
          <div>
            <h1 className="text-3xl font-bold text-emerald-500">
              Betting Buddy
            </h1>
            <p className="text-xs text-slate-400">
              built by <a href="https://www.ainything.net/" target="_blank" rel="noopener noreferrer" className="font-semibold text-pink-500 hover:text-pink-400 underline">AInything</a>
            </p>
          </div>
        </div>
        <div className="text-sm text-slate-300 bg-slate-700 px-3 py-1 rounded-full">
          Checks Remaining Today: <span className="font-bold text-emerald-400">{checksRemaining}</span>
        </div>
      </div>
    </header>
  );
};
