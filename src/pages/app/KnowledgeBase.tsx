import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BookOpen, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ClientSelector from "@/components/app/shared/ClientSelector";

interface KBItem {
  id: string;
  title: string;
  content: string;
  active: boolean;
}

type KnowledgeData = Record<string, KBItem[]>;

const CATEGORIES = [
  { key: "business_info", label: "Business Info" },
  { key: "services", label: "Services" },
  { key: "faqs", label: "FAQs" },
  { key: "policies", label: "Policies" },
  { key: "qualification_rules", label: "Qualification" },
  { key: "objections", label: "Objections" },
  { key: "links_assets", label: "Links & Assets" },
];

const emptyItem = (): KBItem => ({ id: crypto.randomUUID(), title: "", content: "", active: true });

export default function KnowledgeBase() {
  const { agencyId } = useAuth();
  const [clientId, setClientId] = useState("");
  const [kb, setKb] = useState<KnowledgeData>({});
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<KBItem | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadKB = useCallback(async () => {
    if (!clientId) return;
    const { data } = await supabase
      .from("client_configs")
      .select("knowledge_base")
      .eq("client_account_id", clientId)
      .maybeSingle();
    setKb((data?.knowledge_base as unknown as KnowledgeData) || {});
  }, [clientId]);

  useEffect(() => { loadKB(); }, [loadKB]);

  const saveKB = async (updated: KnowledgeData) => {
    setSaving(true);
    const { error } = await supabase
      .from("client_configs")
      .update({ knowledge_base: updated as any })
      .eq("client_account_id", clientId);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      setKb(updated);
      toast.success("Knowledge base saved");
    }
  };

  const openAdd = (cat: string) => {
    setEditCategory(cat);
    setEditItem(emptyItem());
    setDialogOpen(true);
  };

  const openEdit = (cat: string, item: KBItem) => {
    setEditCategory(cat);
    setEditItem({ ...item });
    setDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!editItem || !editCategory) return;
    const catItems = [...(kb[editCategory] || [])];
    const idx = catItems.findIndex((i) => i.id === editItem.id);
    if (idx >= 0) catItems[idx] = editItem;
    else catItems.push(editItem);
    const updated = { ...kb, [editCategory]: catItems };
    saveKB(updated);
    setDialogOpen(false);
  };

  const handleDelete = (cat: string, id: string) => {
    const updated = { ...kb, [cat]: (kb[cat] || []).filter((i) => i.id !== id) };
    saveKB(updated);
  };

  const toggleActive = (cat: string, id: string) => {
    const catItems = (kb[cat] || []).map((i) => i.id === id ? { ...i, active: !i.active } : i);
    saveKB({ ...kb, [cat]: catItems });
  };

  if (!clientId) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" /> Knowledge Base
        </h1>
        <ClientSelector value={clientId} onChange={setClientId} />
        <Card className="border-border/50"><CardContent className="p-8 text-center text-muted-foreground">Select a client to manage knowledge.</CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" /> Knowledge Base
        </h1>
        <ClientSelector value={clientId} onChange={setClientId} />
      </div>
      <p className="text-sm text-muted-foreground -mt-4">Shared knowledge used by AI Chat + Voice Agent.</p>

      <Tabs defaultValue="business_info">
        <TabsList className="flex-wrap">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c.key} value={c.key} className="text-xs">
              {c.label}
              <Badge variant="secondary" className="ml-1 text-[10px] px-1">{(kb[c.key] || []).length}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat.key} value={cat.key} className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">{cat.label}</h3>
              <Button size="sm" onClick={() => openAdd(cat.key)}><Plus className="w-4 h-4 mr-1" /> Add Item</Button>
            </div>
            {(kb[cat.key] || []).length === 0 ? (
              <Card className="border-border/50"><CardContent className="p-6 text-center text-muted-foreground text-sm">No {cat.label.toLowerCase()} items yet.</CardContent></Card>
            ) : (
              (kb[cat.key] || []).map((item) => (
                <Card key={item.id} className="border-border/50">
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground text-sm">{item.title || "Untitled"}</span>
                        {!item.active && <Badge variant="secondary" className="text-[10px]">Inactive</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Switch checked={item.active} onCheckedChange={() => toggleActive(cat.key, item.id)} />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(cat.key, item)}><Pencil className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(cat.key, item.id)}><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editItem?.title ? "Edit Item" : "Add Item"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={editItem?.title || ""} onChange={(e) => setEditItem((p) => p ? { ...p, title: e.target.value } : p)} /></div>
            <div><Label>Content</Label><Textarea rows={6} value={editItem?.content || ""} onChange={(e) => setEditItem((p) => p ? { ...p, content: e.target.value } : p)} /></div>
            <div className="flex items-center gap-2"><Label>Active</Label><Switch checked={editItem?.active ?? true} onCheckedChange={(v) => setEditItem((p) => p ? { ...p, active: v } : p)} /></div>
          </div>
          <DialogFooter><Button onClick={handleSaveItem} disabled={saving}>{saving ? "Saving…" : "Save"}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
