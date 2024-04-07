export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          category_id: number
          name: string
        }
        Insert: {
          category_id?: number
          name: string
        }
        Update: {
          category_id?: number
          name?: string
        }
        Relationships: []
      }
      chat: {
        Row: {
          added_by: string | null
          chat_id: number
          chatbot_id: number
          conversation_link: string
        }
        Insert: {
          added_by?: string | null
          chat_id?: number
          chatbot_id: number
          conversation_link: string
        }
        Update: {
          added_by?: string | null
          chat_id?: number
          chatbot_id?: number
          conversation_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "gpt_chat_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "gpt_chat_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbot"
            referencedColumns: ["chatbot_id"]
          },
        ]
      }
      chatbot: {
        Row: {
          avatar: string | null
          chatbot_id: number
          created_by: string
          default_complexity: string | null
          default_length: string | null
          default_tone: string | null
          default_type: string | null
          description: string | null
          name: string
        }
        Insert: {
          avatar?: string | null
          chatbot_id?: number
          created_by: string
          default_complexity?: string | null
          default_length?: string | null
          default_tone?: string | null
          default_type?: string | null
          description?: string | null
          name: string
        }
        Update: {
          avatar?: string | null
          chatbot_id?: number
          created_by?: string
          default_complexity?: string | null
          default_length?: string | null
          default_tone?: string | null
          default_type?: string | null
          description?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_default_complexity_fkey"
            columns: ["default_complexity"]
            isOneToOne: false
            referencedRelation: "complexity_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "chatbot_default_length_fkey"
            columns: ["default_length"]
            isOneToOne: false
            referencedRelation: "length_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "chatbot_default_tone_fkey"
            columns: ["default_tone"]
            isOneToOne: false
            referencedRelation: "tone_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "chatbot_default_type_fkey"
            columns: ["default_type"]
            isOneToOne: false
            referencedRelation: "type_enum"
            referencedColumns: ["value"]
          },
        ]
      }
      chatbot_category: {
        Row: {
          category_id: number
          chatbot_id: number
        }
        Insert: {
          category_id: number
          chatbot_id: number
        }
        Update: {
          category_id?: number
          chatbot_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "chatbot_category_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbot"
            referencedColumns: ["chatbot_id"]
          },
        ]
      }
      complexity_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      length_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      message: {
        Row: {
          content: string
          created_at: string
          message_id: string
          role: string
          thread_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          message_id?: string
          role: string
          thread_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          message_id?: string
          role?: string
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "message_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "thread"
            referencedColumns: ["thread_id"]
          },
          {
            foreignKeyName: "message_type_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "message_type_enum"
            referencedColumns: ["value"]
          },
        ]
      }
      message_type_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      preference: {
        Row: {
          chatbot_id: number
          favorite: boolean | null
          preference_id: number
          preferred_complexity: string
          preferred_length: string
          preferred_tone: string
          preferred_type: string
          user_id: string | null
        }
        Insert: {
          chatbot_id: number
          favorite?: boolean | null
          preference_id?: number
          preferred_complexity: string
          preferred_length: string
          preferred_tone: string
          preferred_type: string
          user_id?: string | null
        }
        Update: {
          chatbot_id?: number
          favorite?: boolean | null
          preference_id?: number
          preferred_complexity?: string
          preferred_length?: string
          preferred_tone?: string
          preferred_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_chatbot_preference_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbot"
            referencedColumns: ["chatbot_id"]
          },
          {
            foreignKeyName: "user_chatbot_preference_preferred_complexity_fkey"
            columns: ["preferred_complexity"]
            isOneToOne: false
            referencedRelation: "complexity_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "user_chatbot_preference_preferred_length_fkey"
            columns: ["preferred_length"]
            isOneToOne: false
            referencedRelation: "length_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "user_chatbot_preference_preferred_tone_fkey"
            columns: ["preferred_tone"]
            isOneToOne: false
            referencedRelation: "tone_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "user_chatbot_preference_preferred_type_fkey"
            columns: ["preferred_type"]
            isOneToOne: false
            referencedRelation: "type_enum"
            referencedColumns: ["value"]
          },
          {
            foreignKeyName: "user_chatbot_preference_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      prompt: {
        Row: {
          content: string
          prompt_id: number
          prompt_name: string | null
          type: string
        }
        Insert: {
          content: string
          prompt_id?: number
          prompt_name?: string | null
          type: string
        }
        Update: {
          content?: string
          prompt_id?: number
          prompt_name?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "prompt_type_enum"
            referencedColumns: ["value"]
          },
        ]
      }
      prompt_chatbot: {
        Row: {
          chabot_id: number
          prompt_id: number
        }
        Insert: {
          chabot_id: number
          prompt_id: number
        }
        Update: {
          chabot_id?: number
          prompt_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "prompt_chatbot_chabot_id_fkey"
            columns: ["chabot_id"]
            isOneToOne: false
            referencedRelation: "chatbot"
            referencedColumns: ["chatbot_id"]
          },
          {
            foreignKeyName: "prompt_chatbot_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompt"
            referencedColumns: ["prompt_id"]
          },
        ]
      }
      prompt_type_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      prompt_user: {
        Row: {
          prompt_id: number
          user_id: string
        }
        Insert: {
          prompt_id: number
          user_id: string
        }
        Update: {
          prompt_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_user_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompt"
            referencedColumns: ["prompt_id"]
          },
          {
            foreignKeyName: "prompt_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      thread: {
        Row: {
          chatbot_id: number
          created_at: string
          is_public: boolean | null
          thread_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          chatbot_id: number
          created_at?: string
          is_public?: boolean | null
          thread_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          chatbot_id?: number
          created_at?: string
          is_public?: boolean | null
          thread_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbot"
            referencedColumns: ["chatbot_id"]
          },
          {
            foreignKeyName: "thread_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      tone_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      type_enum: {
        Row: {
          value: string
        }
        Insert: {
          value: string
        }
        Update: {
          value?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          date_joined: string
          email: string
          last_login: string | null
          password: string
          profile_picture: string | null
          slug: string
          user_id: string
          username: string
        }
        Insert: {
          date_joined?: string
          email: string
          last_login?: string | null
          password: string
          profile_picture?: string | null
          slug: string
          user_id?: string
          username: string
        }
        Update: {
          date_joined?: string
          email?: string
          last_login?: string | null
          password?: string
          profile_picture?: string | null
          slug?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
