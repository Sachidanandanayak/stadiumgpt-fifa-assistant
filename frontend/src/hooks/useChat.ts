import { useCallback, useState } from 'react';
import type { ChatMessage, Language } from '@/types';
import { chatApi, ApiError } from '@/services/api';

const STORAGE_KEY = 'stadiumgpt-chat-history';

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useChat(language: Language) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persist = (msgs: ChatMessage[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  };

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      persist(nextMessages);
      setIsLoading(true);
      setError(null);

      try {
        const { reply } = await chatApi.sendMessage(content, nextMessages.slice(-10), language);
        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toISOString(),
        };
        const updated = [...nextMessages, assistantMsg];
        setMessages(updated);
        persist(updated);
      } catch (err) {
        const message = err instanceof ApiError ? err.message : 'Failed to reach StadiumGPT assistant.';
        setError(message);
        const fallbackMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            "I'm having trouble reaching the AI service right now. Please ensure the backend is running and GEMINI_API_KEY is configured. In the meantime: gates open 3 hours before kickoff, and accessibility desks are located at every main entrance.",
          timestamp: new Date().toISOString(),
        };
        const updated = [...nextMessages, fallbackMsg];
        setMessages(updated);
        persist(updated);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, language]
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, sendMessage, isLoading, error, clearHistory };
}
