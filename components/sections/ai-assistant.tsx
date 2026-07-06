'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  User,
  Bot,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { ScrollReveal } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialMessage: Message = {
  role: 'assistant',
  content:
    "Hello! I'm **Shahraiz Ahmad**'s AI portfolio assistant. I can answer questions about Shahraiz's experience, skills, projects, certifications, services, and contact info — plus general knowledge questions when AI is enabled.\n\nWhat would you like to know?",
};

const suggestedPrompts = [
  'Tell me about Shahraiz',
  'What are his skills?',
  'Show me his projects',
  'How can I contact him?',
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isAtBottomRef = useRef(true);

  // Track scroll position
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 60;
  }, []);

  // Auto-scroll only when user is at bottom
  const scrollToBottom = useCallback((force = false) => {
    if (!scrollRef.current) return;
    if (force || isAtBottomRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // Typing animation for assistant messages
  const typeMessage = useCallback(
    (text: string, callback?: () => void) => {
      setTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        i += 2;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            updated[updated.length - 1] = {
              ...last,
              content: text.slice(0, i),
            };
          }
          return updated;
        });
        scrollToBottom();
        if (i >= text.length) {
          clearInterval(interval);
          setTyping(false);
          callback?.();
        }
      }, 15);
    },
    [scrollToBottom]
  );

  const sendMessage = useCallback(
    async (text: string, regenerate = false) => {
      if (!text.trim() || loading) return;

      const userMessage: Message = { role: 'user', content: text };
      const assistantPlaceholder: Message = {
        role: 'assistant',
        content: '',
      };

      let newMessages: Message[];
      if (regenerate) {
        newMessages = [...messages, assistantPlaceholder];
      } else {
        newMessages = [...messages, userMessage, assistantPlaceholder];
        setMessages(newMessages);
        setInput('');
      }

      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: regenerate
              ? messages
              : [...messages, userMessage],
          }),
        });

        const data = await res.json();

        if (data.offline) {
          setIsOffline(true);
        }

        typeMessage(data.response, () => {
          setLoading(false);
        });
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content:
              "I'm having trouble connecting right now. Please try again in a moment.",
          };
          return updated;
        });
        setLoading(false);
      }
    },
    [messages, loading, typeMessage]
  );

  const handleSend = () => {
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    setInput('');
    setIsOffline(false);
  };

  const regenerate = () => {
    // Find last user message
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser || loading) return;

    // Remove last assistant message
    const withoutLast = messages.slice(0, -1);
    setMessages([...withoutLast, { role: 'assistant', content: '' }]);
    setLoading(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: withoutLast,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.offline) setIsOffline(true);
        typeMessage(data.response, () => setLoading(false));
      })
      .catch(() => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Something went wrong. Please try again.',
          };
          return updated;
        });
        setLoading(false);
      });
  };

  const copyMessage = (idx: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Initial scroll
  useEffect(() => {
    scrollToBottom(true);
  }, [scrollToBottom]);

  return (
    <section id="ai-assistant" className="relative py-24 md:py-32 ambient-light">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="AI Assistant"
          title="Ask Me Anything"
          description="A conversational AI assistant trained on Shahraiz's portfolio — powered by Gemini when available."
        />

        <ScrollReveal>
          <div className="max-w-3xl mx-auto rounded-2xl glass-strong overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 blur-md opacity-50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Portfolio Assistant
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        isOffline ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                    />
                    {isOffline ? 'Offline mode' : 'AI-powered'}
                  </p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4"
            >
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={idx}
                  message={msg}
                  idx={idx}
                  copied={copiedIdx === idx}
                  onCopy={() => copyMessage(idx, msg.content)}
                  onRegenerate={regenerate}
                  isLast={idx === messages.length - 1}
                  loading={loading}
                  typing={typing}
                />
              ))}

              {/* Suggested prompts (only when 1 message) */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Shahraiz's work, skills, or services..."
                  rows={1}
                  className="flex-1 resize-none bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none border border-white/10 focus:border-blue-500/50 transition-colors max-h-32"
                  style={{ minHeight: '40px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-shadow shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isOffline
                  ? 'Using offline knowledge base — Gemini API not configured'
                  : 'Powered by Gemini AI · Press Enter to send'}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function MessageBubble({
  message,
  idx,
  copied,
  onCopy,
  onRegenerate,
  isLast,
  loading,
  typing,
}: {
  message: Message;
  idx: number;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  isLast: boolean;
  loading: boolean;
  typing: boolean;
}) {
  const isUser = message.role === 'user';
  const showTypingIndicator = isLast && !isUser && loading && !message.content && !typing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex gap-3', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'h-8 w-8 rounded-lg flex items-center justify-center shrink-0',
          isUser
            ? 'bg-white/10'
            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'group relative max-w-[80%] rounded-2xl px-4 py-2.5',
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
            : 'glass text-white'
        )}
      >
        {showTypingIndicator ? (
          <div className="flex items-center gap-1 py-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="h-2 w-2 rounded-full bg-white/60"
              />
            ))}
          </div>
        ) : (
          <FormattedText content={message.content} />
        )}

        {/* Actions for assistant messages */}
        {!isUser && message.content && !typing && (
          <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onCopy}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </button>
            {isLast && (
              <button
                onClick={onRegenerate}
                disabled={loading}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white transition-colors disabled:opacity-40"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FormattedText({ content }: { content: string }) {
  // Simple markdown rendering: bold, code blocks, inline code, lists, line breaks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeKey = 0;

  lines.forEach((line, i) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${codeKey++}`}
            className="my-2 p-3 rounded-lg bg-black/40 border border-white/10 overflow-x-auto text-xs font-mono"
          >
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // Bold: **text**
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = boldParts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Inline code: `text`
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, k) => {
        if (cp.startsWith('`') && cp.endsWith('`')) {
          return (
            <code
              key={`${j}-${k}`}
              className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono"
            >
              {cp.slice(1, -1)}
            </code>
          );
        }
        return <span key={`${j}-${k}`}>{cp}</span>;
      });
    });

    if (line.trim().startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 my-0.5">
          <span className="text-blue-400 shrink-0">•</span>
          <span>{formatted.slice(2)}</span>
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i}>{formatted}</p>);
    }
  });

  return <div className="text-sm leading-relaxed space-y-0.5">{elements}</div>;
}
