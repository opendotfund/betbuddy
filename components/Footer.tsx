
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-center py-6 mt-12 border-t border-slate-700">
      <p className="text-sm text-slate-400">
        &copy; {currentYear} Betting Buddy AI. All rights reserved.
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Disclaimer: AI analysis is for informational purposes only and does not constitute financial advice. Bet responsibly.
      </p>
    </footer>
  );
};
