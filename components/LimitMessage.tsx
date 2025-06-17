
import React from 'react';
import { APP_EMAIL_CONTACT } from '../constants';

export const LimitMessage: React.FC = () => {
  return (
    <div className="mt-10 p-8 bg-amber-700 border border-amber-800 text-white rounded-xl shadow-2xl w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">Daily Limit Reached! 🛑</h2>
      <p className="text-lg mb-3">
        You've used all your {`AI bet`} analyses for today.
      </p>
      <p className="text-md">
        For more credits or inquiries, please contact us at:
      </p>
      <a href={`mailto:${APP_EMAIL_CONTACT}`} className="font-semibold text-amber-200 hover:text-amber-100 underline text-lg break-all">
        {APP_EMAIL_CONTACT}
      </a>
      <p className="mt-4 text-sm text-amber-200">
        Come back tomorrow for more free analyses!
      </p>
    </div>
  );
};
