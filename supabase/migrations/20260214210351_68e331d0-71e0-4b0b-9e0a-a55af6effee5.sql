
-- Create table to store in-progress voice conversation state
CREATE TABLE public.voice_conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  call_sid text NOT NULL UNIQUE,
  client_account_id uuid NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  caller_phone text,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Index for fast lookup by call_sid
CREATE INDEX idx_voice_conversations_call_sid ON public.voice_conversations(call_sid);

-- Auto-cleanup: index on created_at for pruning old conversations
CREATE INDEX idx_voice_conversations_created_at ON public.voice_conversations(created_at);

-- Enable RLS
ALTER TABLE public.voice_conversations ENABLE ROW LEVEL SECURITY;

-- Allow edge functions (service role) to insert/update/select/delete
-- No user-facing access needed - only used by edge functions via service role
CREATE POLICY "Allow service role full access to voice_conversations"
ON public.voice_conversations
FOR ALL
USING (true)
WITH CHECK (true);

-- Create storage bucket for TTS audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('voice-tts-audio', 'voice-tts-audio', true);

-- Allow public read access to TTS audio
CREATE POLICY "Public read access for voice TTS audio"
ON storage.objects
FOR SELECT
USING (bucket_id = 'voice-tts-audio');

-- Allow service role to upload TTS audio (edge functions)
CREATE POLICY "Service role can upload voice TTS audio"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'voice-tts-audio');

-- Allow service role to delete old TTS audio
CREATE POLICY "Service role can delete voice TTS audio"
ON storage.objects
FOR DELETE
USING (bucket_id = 'voice-tts-audio');
