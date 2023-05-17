export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
      }
      factories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
      }
      notices: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
      }
      posts: {
        Row: {
          created_at: string | null
          id: string
          post_url: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_url?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_url?: string | null
          title?: string | null
          user_id?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          favorites: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          favorites?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          favorites?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
      }
      repair_contents: {
        Row: {
          created_at: string | null
          id: string
          is_new: boolean | null
          path: string | null
          price: number | null
          repair_id: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_new?: boolean | null
          path?: string | null
          price?: number | null
          repair_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_new?: boolean | null
          path?: string | null
          price?: number | null
          repair_id?: number | null
          title?: string | null
          updated_at?: string | null
        }
      }
      repair_details: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          product_name: string | null
          quantity: number | null
          repair_id: number | null
          size: string | null
          updated_at: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_name?: string | null
          quantity?: number | null
          repair_id?: number | null
          size?: string | null
          updated_at?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_name?: string | null
          quantity?: number | null
          repair_id?: number | null
          size?: string | null
          updated_at?: string | null
        }
      }
      repairs: {
        Row: {
          category: string | null
          comment: string | null
          created_at: string | null
          customer: string | null
          deadline: string | null
          deliveryPlace: string | null
          factory_id: string | null
          id: number
          order_type: string | null
          product_id: string | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          comment?: string | null
          created_at?: string | null
          customer?: string | null
          deadline?: string | null
          deliveryPlace?: string | null
          factory_id?: string | null
          id?: number
          order_type?: string | null
          product_id?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          comment?: string | null
          created_at?: string | null
          customer?: string | null
          deadline?: string | null
          deliveryPlace?: string | null
          factory_id?: string | null
          id?: number
          order_type?: string | null
          product_id?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_factories: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }[]
      }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
