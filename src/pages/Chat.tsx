import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Plane, MapPin, Info } from 'lucide-react';
import { chatWithAssistant } from '@/services/gemini';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatWithAssistant(input, messages);
      const assistantMessage: Message = {
        role: 'model',
        parts: [{ text: responseText }]
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'model',
        parts: [{ text: "I'm sorry, I encountered an error. Please try again." }]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">VoyageAI Assistant</h1>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online & Ready to Help
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-slate-600">
          <Info className="w-4 h-4" />
          Help
        </Button>
      </div>

      <Card className="flex-1 border-none shadow-lg bg-white overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center">
                  <Plane className="text-indigo-600 w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">How can I help you today?</h2>
                  <p className="text-slate-500 max-w-sm">
                    Ask me about destinations, hotels, restaurants, or help with your itinerary.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {[
                    "Best places in Tokyo",
                    "Cheap hotels in Paris",
                    "3-day Bali itinerary",
                    "Top food in Italy"
                  ].map((suggestion) => (
                    <Button 
                      key={suggestion} 
                      variant="outline" 
                      className="h-auto py-3 px-4 text-left justify-start font-normal text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <Avatar className={cn(
                  "w-10 h-10 border-2",
                  msg.role === 'user' ? "border-indigo-100" : "border-slate-100"
                )}>
                  {msg.role === 'user' ? (
                    <>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-indigo-50 text-indigo-600">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-slate-900 text-white">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className={cn(
                  "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-slate-100 text-slate-900 rounded-tl-none"
                )}>
                  <div className="prose prose-slate max-w-none dark:prose-invert">
                    <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border-2 border-slate-100">
                  <AvatarFallback className="bg-slate-900 text-white">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  <span className="text-slate-500 text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="relative flex gap-3">
            <Input 
              placeholder="Ask me anything about your trip..." 
              className="h-14 pl-4 pr-16 bg-white border-slate-200 rounded-xl shadow-sm focus-visible:ring-indigo-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              size="icon" 
              className="absolute right-2 top-2 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all active:scale-95"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-medium">
            Powered by Gemini AI • VoyageAI v1.0
          </p>
        </div>
      </Card>
    </div>
  );
}
