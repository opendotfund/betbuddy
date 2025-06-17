import React from 'react';

export const ImageUpload: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-6 bg-slate-800 rounded-xl shadow-2xl mt-8 relative opacity-60 cursor-not-allowed" aria-disabled="true">
      <div className="absolute inset-0 bg-slate-900 bg-opacity-75 flex flex-col items-center justify-center rounded-xl z-10 p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-lg font-semibold text-amber-300">Image Analysis: Premium Feature</p>
        <p className="text-slate-300 text-xs mt-1">Screenshot analysis is available for premium users. Describe your bet in text above.</p>
      </div>

      {/* Original content structure for visual consistency */}
      <h2 className="text-2xl font-semibold text-center text-emerald-400 mb-6 invisible">Upload Your Bet Screenshot</h2>
      <div
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-slate-600 invisible`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="text-slate-400 text-center">
          Drag & drop your image here, or <span className="font-semibold text-emerald-500">click to browse</span>
        </span>
        <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF, WEBP supported</p>
      </div>
    </div>
  );
};
