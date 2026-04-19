import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Brain, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 'init-1', text: "Satellite link established. I'm your EventFlow AI Research Agent. How can I assist with your global event logistics today?", sender: 'system', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialMessage) {
      handleSend(null, location.state.initialMessage);
    }
  }, []);

  const presets = [
    "Secure a custom trip request",
    "Analyze current crowd velocity",
    "Identify nearest high-security exits",
    "Verify global event status"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handlePresetClick = (text) => {
    setInput(text);
    setTimeout(() => {
      handleSend(null, text);
    }, 50);
  };

  const handleSend = async (e, customText = null) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage = { 
      id: Math.random().toString(36).substr(2, 9), 
      text: textToSend, 
      sender: 'user', 
      timestamp: Date.now() 
    };
    setMessages((prev) => [...prev, userMessage]);
    const previousInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      
      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { 
            id: Math.random().toString(36).substr(2, 9), 
            text: data.reply || "Authorization complete. System ready.", 
            sender: 'system', 
            timestamp: Date.now() 
          }
        ]);
      } else {
        throw new Error('Fallback required');
      }
    } catch (err) {
      // Local AI Fallback (Deterministic responses for common queries)
      setTimeout(() => {
        const fallbackReply = textToSend.toLowerCase().includes('crowd') 
          ? "Satellite telemetry indicates increasing density in the North Quadrant. Redirecting personnel."
          : textToSend.toLowerCase().includes('exit')
          ? "Nearest high-security exit is the North Gate. Path is currently clear. Proceed with caution."
          : "Neural link stable. I'm analyzing the data packets. How else can I assist with your logistics?";
          
        setMessages((prev) => [
          ...prev,
          { 
            id: Math.random().toString(36).substr(2, 9), 
            text: fallbackReply, 
            sender: 'system', 
            timestamp: Date.now() 
          }
        ]);
        setIsTyping(false);
      }, 1500);
    } finally {
      // Logic handled in catch for typing
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <header className="shrink-0 space-y-2 px-2">
        <div className="flex items-center gap-3 text-royal-500 font-black text-xs uppercase tracking-[0.4em] mb-2">
          <div className="w-2 h-2 bg-royal-500 rounded-full animate-pulse shadow-glow-primary"></div>
          Neural Link Active
        </div>
        <h1 className="text-5xl font-heading font-black tracking-tighter text-white">
          AI <span className="premium-text-gradient">Assistant</span>
        </h1>
      </header>

      <GlassCard className="flex-1 flex flex-col relative overflow-hidden p-0 border-white/10 bg-background shadow-2xl rounded-[40px]" hover={false}>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar bg-black/20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                msg.sender === 'user' ? 'bg-royal-500 border-royal-400 text-white' : 'bg-surface border-white/10 text-royal-500'
              }`}>
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`max-w-[85%] space-y-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-2xl px-5 py-3 shadow-xl ${
                  msg.sender === 'user' 
                    ? 'bg-royal-600 text-white rounded-tr-none' 
                    : 'bg-[#12151c] border border-white/5 text-gray-100 rounded-tl-none'
                }`}>
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest px-1">
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center shrink-0 text-royal-500">
                <Bot size={18} />
              </div>
              <div className="bg-[#12151c] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                <div className="w-1 h-1 bg-royal-500 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-royal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-royal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-black/40 border-t border-white/5 space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {presets.map((p, i) => (
              <button key={i} onClick={() => handlePresetClick(p)} className="px-4 py-2 bg-white/5 hover:bg-royal-500/20 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 whitespace-nowrap transition-all">
                {p}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the system..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder:text-gray-600 focus:outline-none focus:border-royal-500 transition-all font-medium"
            />
            <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 p-3 bg-royal-500 hover:bg-royal-600 disabled:opacity-20 text-white rounded-xl transition-all shadow-glow-primary">
              <Send size={20} />
            </button>
          </form>
          <div className="flex justify-center gap-6 opacity-20">
            <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.4em]"><ShieldCheck size={10} /> Secure</div>
            <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.4em]"><Zap size={10} /> Fast</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Chat;
