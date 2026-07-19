import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2, Mic, MicOff, Sparkles } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { t } from '@/utils/i18n';
import type { Language } from '@/types';

interface AIAssistantProps {
  language: Language;
}

const suggestedPrompts = [
  'When does the next match kick off?',
  'Where is my seating section?',
  'Is parking available near Gate C?',
  'What are the stadium rules for bags?',
  'Where is the nearest food court?',
  'Where can I find accessibility services?',
];

// Minimal typings for the Web Speech API (not in default TS lib)
interface SpeechRecognitionResultLike {
  transcript: string;
}
interface SpeechRecognitionEventLike extends Event {
  results: { [index: number]: { [index: number]: SpeechRecognitionResultLike } };
}

export default function AIAssistant({ language }: AIAssistantProps) {
  const { messages, sendMessage, isLoading, clearHistory } = useChat(language);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? prev + ' ' + transcript : transcript));
      };
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    sendMessage(content);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col h-[calc(100vh-4rem)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fifa-gold to-amber-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-fifa-navy" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">{t(language, 'chat.title')}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t(language, 'chat.subtitle')}</p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> {t(language, 'chat.clear')}
        </button>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto glass-strong rounded-2xl p-5 space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-10">
            <Sparkles className="w-10 h-10 text-fifa-gold/60" />
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Ask me about match schedules, seating, parking, ticket policies, stadium rules, food courts, or
              accessibility services.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-xs px-3 py-1.5 rounded-full glass hover:bg-fifa-gold/20 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t(language, 'chat.placeholder')}
            className="w-full px-4 py-3 pr-11 rounded-full glass-strong focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm"
          />
          {recognitionRef.current && (
            <button
              onClick={toggleVoiceInput}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isListening ? 'bg-red-500 text-white animate-pulse-slow' : 'hover:bg-white/10'
              }`}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
        </div>
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="w-12 h-12 rounded-full bg-fifa-gold text-fifa-navy flex items-center justify-center disabled:opacity-40 hover:brightness-110 active:scale-95 transition-all shrink-0"
          aria-label={t(language, 'chat.send')}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
