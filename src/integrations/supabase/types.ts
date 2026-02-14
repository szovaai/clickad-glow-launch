export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      agencies: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      audits: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          improvements: Json | null
          loom_url: string | null
          notes: string | null
          status: string | null
          url: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          improvements?: Json | null
          loom_url?: string | null
          notes?: string | null
          status?: string | null
          url?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          improvements?: Json | null
          loom_url?: string | null
          notes?: string | null
          status?: string | null
          url?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audits_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      call_logs: {
        Row: {
          caller_phone: string
          client_account_id: string
          created_at: string
          direction: string
          duration: number | null
          id: string
          status: string
        }
        Insert: {
          caller_phone: string
          client_account_id: string
          created_at?: string
          direction?: string
          duration?: number | null
          id?: string
          status?: string
        }
        Update: {
          caller_phone?: string
          client_account_id?: string
          created_at?: string
          direction?: string
          duration?: number | null
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      call_transcripts: {
        Row: {
          call_log_id: string | null
          caller_phone: string | null
          client_account_id: string
          created_at: string
          duration_seconds: number | null
          id: string
          intent_detected: string | null
          outcome: string | null
          summary: string | null
          transcript: Json | null
        }
        Insert: {
          call_log_id?: string | null
          caller_phone?: string | null
          client_account_id: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          intent_detected?: string | null
          outcome?: string | null
          summary?: string | null
          transcript?: Json | null
        }
        Update: {
          call_log_id?: string | null
          caller_phone?: string | null
          client_account_id?: string
          created_at?: string
          duration_seconds?: number | null
          id?: string
          intent_detected?: string | null
          outcome?: string | null
          summary?: string | null
          transcript?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "call_transcripts_call_log_id_fkey"
            columns: ["call_log_id"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_transcripts_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          client_account_id: string
          created_at: string
          id: string
          status: string
          updated_at: string
          visitor_email: string | null
          visitor_id: string
          visitor_name: string | null
          visitor_phone: string | null
        }
        Insert: {
          client_account_id: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          visitor_email?: string | null
          visitor_id: string
          visitor_name?: string | null
          visitor_phone?: string | null
        }
        Update: {
          client_account_id?: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
          visitor_email?: string | null
          visitor_id?: string
          visitor_name?: string | null
          visitor_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_widget_configs: {
        Row: {
          auto_open: boolean | null
          client_account_id: string
          created_at: string
          greeting_message: string | null
          id: string
          logo_url: string | null
          primary_color: string | null
          qualification_flow: Json | null
          updated_at: string
        }
        Insert: {
          auto_open?: boolean | null
          client_account_id: string
          created_at?: string
          greeting_message?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          qualification_flow?: Json | null
          updated_at?: string
        }
        Update: {
          auto_open?: boolean | null
          client_account_id?: string
          created_at?: string
          greeting_message?: string | null
          id?: string
          logo_url?: string | null
          primary_color?: string | null
          qualification_flow?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_widget_configs_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: true
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      client_accounts: {
        Row: {
          agency_id: string
          business_name: string
          created_at: string
          emergency_hours: boolean | null
          hours: Json | null
          id: string
          industry: string | null
          service_area: string | null
          services: string[] | null
          status: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          business_name: string
          created_at?: string
          emergency_hours?: boolean | null
          hours?: Json | null
          id?: string
          industry?: string | null
          service_area?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          business_name?: string
          created_at?: string
          emergency_hours?: boolean | null
          hours?: Json | null
          id?: string
          industry?: string | null
          service_area?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_accounts_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      client_configs: {
        Row: {
          calendar_settings: Json | null
          client_account_id: string
          created_at: string
          id: string
          knowledge_base: Json | null
          phone_config: Json | null
          qualification_rules: Json | null
          updated_at: string
        }
        Insert: {
          calendar_settings?: Json | null
          client_account_id: string
          created_at?: string
          id?: string
          knowledge_base?: Json | null
          phone_config?: Json | null
          qualification_rules?: Json | null
          updated_at?: string
        }
        Update: {
          calendar_settings?: Json | null
          client_account_id?: string
          created_at?: string
          id?: string
          knowledge_base?: Json | null
          phone_config?: Json | null
          qualification_rules?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_configs_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: true
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          industry: string | null
          name: string
          province: string | null
          website: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          name: string
          province?: string | null
          website?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          name?: string
          province?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string | null
          phone: string | null
          role: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      follow_up_sequences: {
        Row: {
          active: boolean
          client_account_id: string
          created_at: string
          id: string
          name: string
          steps: Json
          trigger_event: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          client_account_id: string
          created_at?: string
          id?: string
          name: string
          steps?: Json
          trigger_event?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          client_account_id?: string
          created_at?: string
          id?: string
          name?: string
          steps?: Json
          trigger_event?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_up_sequences_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      ghl_integrations: {
        Row: {
          api_key: string | null
          client_account_id: string
          created_at: string
          custom_field_mapping: Json | null
          id: string
          location_id: string | null
          pipeline_id: string | null
          stage_mapping: Json | null
          updated_at: string
        }
        Insert: {
          api_key?: string | null
          client_account_id: string
          created_at?: string
          custom_field_mapping?: Json | null
          id?: string
          location_id?: string | null
          pipeline_id?: string | null
          stage_mapping?: Json | null
          updated_at?: string
        }
        Update: {
          api_key?: string | null
          client_account_id?: string
          created_at?: string
          custom_field_mapping?: Json | null
          id?: string
          location_id?: string | null
          pipeline_id?: string | null
          stage_mapping?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ghl_integrations_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: true
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      loom_videos: {
        Row: {
          company_type: string | null
          created_at: string | null
          featured: boolean | null
          id: string
          industry: string | null
          loom_embed_id: string
          loom_url: string
          published_at: string | null
          quick_wins: string[] | null
          thumbnail_url: string | null
          title: string
          view_count: number | null
        }
        Insert: {
          company_type?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          industry?: string | null
          loom_embed_id: string
          loom_url: string
          published_at?: string | null
          quick_wins?: string[] | null
          thumbnail_url?: string | null
          title: string
          view_count?: number | null
        }
        Update: {
          company_type?: string | null
          created_at?: string | null
          featured?: boolean | null
          id?: string
          industry?: string | null
          loom_embed_id?: string
          loom_url?: string
          published_at?: string | null
          quick_wins?: string[] | null
          thumbnail_url?: string | null
          title?: string
          view_count?: number | null
        }
        Relationships: []
      }
      pixel_events: {
        Row: {
          ad_id: string | null
          adgroup_id: string | null
          campaign_id: string | null
          created_at: string | null
          creative_id: string | null
          event_type: string
          extra: Json | null
          id: string
          placement: string | null
          referrer: string | null
          session_id: string
          tt_content: string | null
          ttclid: string | null
          url: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visitor_id: string
        }
        Insert: {
          ad_id?: string | null
          adgroup_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          creative_id?: string | null
          event_type: string
          extra?: Json | null
          id?: string
          placement?: string | null
          referrer?: string | null
          session_id: string
          tt_content?: string | null
          ttclid?: string | null
          url: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id: string
        }
        Update: {
          ad_id?: string | null
          adgroup_id?: string | null
          campaign_id?: string | null
          created_at?: string | null
          creative_id?: string | null
          event_type?: string
          extra?: Json | null
          id?: string
          placement?: string | null
          referrer?: string | null
          session_id?: string
          tt_content?: string | null
          ttclid?: string | null
          url?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agency_id: string | null
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          user_id: string
        }
        Insert: {
          agency_id?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          user_id: string
        }
        Update: {
          agency_id?: string | null
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      sequence_enrollments: {
        Row: {
          client_account_id: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string
          current_step: number
          enrolled_at: string
          id: string
          next_action_at: string | null
          sequence_id: string
          status: string
          updated_at: string
        }
        Insert: {
          client_account_id: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone: string
          current_step?: number
          enrolled_at?: string
          id?: string
          next_action_at?: string | null
          sequence_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          client_account_id?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string
          current_step?: number
          enrolled_at?: string
          id?: string
          next_action_at?: string | null
          sequence_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequence_enrollments_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_enrollments_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "follow_up_sequences"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          body: string
          call_log_id: string | null
          client_account_id: string
          created_at: string
          from_phone: string
          id: string
          sent_at: string | null
          status: string
          to_phone: string
        }
        Insert: {
          body: string
          call_log_id?: string | null
          client_account_id: string
          created_at?: string
          from_phone: string
          id?: string
          sent_at?: string | null
          status?: string
          to_phone: string
        }
        Update: {
          body?: string
          call_log_id?: string | null
          client_account_id?: string
          created_at?: string
          from_phone?: string
          id?: string
          sent_at?: string | null
          status?: string
          to_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_call_log_id_fkey"
            columns: ["call_log_id"]
            isOneToOne: false
            referencedRelation: "call_logs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_messages_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          agency_id: string | null
          client_account_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          agency_id?: string | null
          client_account_id?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          agency_id?: string | null
          client_account_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: false
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_configs: {
        Row: {
          active: boolean
          booking_script: string | null
          client_account_id: string
          created_at: string
          greeting_script: string | null
          id: string
          qualification_script: string | null
          transfer_rules: Json | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          booking_script?: string | null
          client_account_id: string
          created_at?: string
          greeting_script?: string | null
          id?: string
          qualification_script?: string | null
          transfer_rules?: Json | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          booking_script?: string | null
          client_account_id?: string
          created_at?: string
          greeting_script?: string | null
          id?: string
          qualification_script?: string | null
          transfer_rules?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_configs_client_account_id_fkey"
            columns: ["client_account_id"]
            isOneToOne: true
            referencedRelation: "client_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_function_defs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parameters: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parameters?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parameters?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_agency_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "agency_admin"
        | "agency_support"
        | "client_owner"
        | "client_staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "agency_admin",
        "agency_support",
        "client_owner",
        "client_staff",
      ],
    },
  },
} as const
