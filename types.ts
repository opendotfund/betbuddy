export interface DailyUsage {
  count: number;
  date: string; // YYYY-MM-DD
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}
