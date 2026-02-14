import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatQualifierWidgetProps {
  clientAccountId: string;
  primaryColor?: string;
  greeting?: string;
  logoUrl?: string;
  autoOpen?: boolean;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-qualifier`;

const ChatQualifierWidget = ({
  clientAccountId,
  primaryColor = "#3B82F6",
  greeting = "Hi! How can I help you today?",
  logoUrl,
  autoOpen = false,
}: ChatQualifierWidgetProps) => {
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visitorId = useRef(crypto.randomUUID());

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          clientAccountId,
          visitorId: visitorId.current,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed" }));
        setMessages((prev) => [...prev, { role: "assistant", content: err.error || "Something went wrong." }]);
        setLoading(false);
        return;
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error("No reader");
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > updated.length) {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Store conversation in DB (fire and forget)
      storeConversation(updated, assistantSoFar);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const storeConversation = async (msgs: Message[], aiResponse: string) => {
    try {
      // Check for qualification data in response
      const qualMatch = aiResponse.match(/```qualification\n([\s\S]*?)```/);
      let qualData: any = null;
      if (qualMatch) {
        try { qualData = JSON.parse(qualMatch[1]); } catch {}
      }

      const { data: conv } = await supabase
        .from("chat_conversations")
        .upsert({
          client_account_id: clientAccountId,
          visitor_id: visitorId.current,
          visitor_name: qualData?.name || null,
          visitor_email: qualData?.email || null,
          visitor_phone: qualData?.phone || null,
          status: qualData ? (qualData.qualified ? "qualified" : "unqualified") : "active",
        }, { onConflict: "id" })
        .select()
        .single();

      if (conv) {
        await supabase.from("chat_messages").insert([
          { conversation_id: conv.id, role: "visitor", content: msgs[msgs.length - 1].content },
          { conversation_id: conv.id, role: "ai", content: aiResponse },
        ]);
      }
    } catch (e) {
      console.error("Failed to store conversation:", e);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: primaryColor }}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] flex flex-col rounded-2xl shadow-2xl border border-border/50 overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center gap-2">
          {logoUrl && <img src={logoUrl} alt="" className="h-6 w-6 rounded" />}
          <span className="font-semibold text-sm">AI Sales Assistant</span>
        </div>
        <button onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0">
                  <ReactMarkdown>{m.content.replace(/```qualification[\s\S]*?```/g, "")}</ReactMarkdown>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl px-3 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 text-sm"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()} style={{ backgroundColor: primaryColor }}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatQualifierWidget;
