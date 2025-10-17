import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, CornerDownLeft, X } from 'lucide-react';

const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct:free',
          messages: newChat.map(c => ({ role: c.role, content: c.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from OpenRouter API');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      setChat([...newChat, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error(error);
      setChat([...newChat, { role: 'assistant', content: 'Sorry, I am having trouble connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button onClick={() => setIsOpen(true)} className="rounded-full w-16 h-16 bg-gradient-primary shadow-lg">
            <Bot className="w-8 h-8 text-white" />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-sm bg-card border border-border rounded-2xl shadow-xl"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg watercolor-text">Arts Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {chat.map((c, i) => (
                  <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-4 py-2 ${c.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {c.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about arts..."
                  className="pr-12"
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  <CornerDownLeft className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;