import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-4 bg-slate-700/50 border border-slate-600 rounded-lg shadow-md mt-6 text-center">
      <p className="text-xs text-slate-400 leading-relaxed">
        <strong>Disclaimer:</strong> Betting Buddy AI is not responsible for the advice its agent gives. 
        No bet is a guarantee, and this is a tool to find vague facts about players or teams or 
        unknown edges that may help users form a safer bet, not provide guarantees. Bet responsibly.
      </p>
    </div>
  );
};