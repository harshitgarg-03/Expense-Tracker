"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, Trash2, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../../../auth/store";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  { text: "What is my total balance?", label: "Total Balance", icon: "💰" },
  { text: "Analyze my recent transactions", label: "Analyze Transactions", icon: "📊" },
  { text: "Give me tips to save more money", label: "Saving Tips", icon: "💡" },
  { text: "Am I spending too much on Food?", label: "Food Expenses", icon: "🍔" },
];

interface AIChatProps {
  onClose?: () => void;
}

export function AIChat({ onClose }: AIChatProps) {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I am your AI Financial Advisor. I have access to your transaction records and budget settings. Ask me anything about your spending, or request personalized saving tips!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    const query = textToSend.trim();
    if (!query || isLoading) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // console.log("user :: ", user)
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: query,
          threadId: `thread_${user?.email}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get agent response");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.response || "I couldn't process that query. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: "Oops! I encountered an error connecting to my server. Please make sure the Python AI agent backend is running.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Chat history cleared. How else can I assist with your finances today?`,
        timestamp: new Date(),
      },
    ]);
  };

  // Basic parser to render assistant markdown bold, bullet points, and headers
  const formatMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-semibold text-sm md:text-base mt-3 mb-1 text-black dark:text-white">
            {renderTextWithBold(trimmed.substring(4))}
          </h4>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-bold text-base md:text-lg mt-4 mb-2 text-black dark:text-white">
            {renderTextWithBold(trimmed.substring(3))}
          </h3>
        );
      }
      
      // Bullet items
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-4 list-disc text-sm my-1 text-gray-800 dark:text-gray-200">
            {renderTextWithBold(trimmed.substring(2))}
          </li>
        );
      }
      
      // Empty lines
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }
      
      // Standard paragraph
      return (
        <p key={idx} className="my-1 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
          {renderTextWithBold(line)}
        </p>
      );
    });
  };

  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-black dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {onClose && (
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold tracking-wide uppercase">Advisor online</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1.5 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
            aria-label="Close Chat"
            title="Close Chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {/* Messages Window */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto no-scrollbar pr-2 mb-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-bl-none backdrop-blur-md"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="leading-relaxed">{msg.content}</p>
                ) : (
                  <div>{formatMessageContent(msg.content)}</div>
                )}
                
                <span className={`block text-[10px] mt-1 text-right ${
                  msg.role === "user" ? "text-blue-200" : "text-gray-400 dark:text-gray-500"
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
                  <User className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 justify-start"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Bot className="h-4 w-4" />
              </div>
              
              <div className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl rounded-bl-none px-4 py-3.5 backdrop-blur-md">
                <div className="flex gap-1 items-center justify-center h-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && !isLoading && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-violet-500" /> Suggested questions
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.text)}
                className="flex items-center justify-between text-left p-3 rounded-xl border border-black/5 dark:border-white/5 bg-white/20 dark:bg-white/2 hover:bg-white/40 dark:hover:bg-white/5 transition-all text-xs text-gray-700 dark:text-gray-300 font-medium group"
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-blue-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="relative flex items-center border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/15 backdrop-blur-md rounded-2xl p-1.5 gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Advisor about your spending patterns..."
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 px-3 py-2 text-sm text-black dark:text-white placeholder-gray-500 outline-hidden focus:ring-0 disabled:opacity-50"
        />
        
        {messages.length > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="h-9 w-9 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
            title="Clear Chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isLoading}
          className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-xs"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
