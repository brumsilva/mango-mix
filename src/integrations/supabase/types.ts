export type Database = {
  public: {
    Tables: {
      franchise_leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          city: string | null;
          state: string | null;
          capital_range: string | null;
          timeline: string | null;
          message: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          city?: string | null;
          state?: string | null;
          capital_range?: string | null;
          timeline?: string | null;
          message?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          city?: string | null;
          state?: string | null;
          capital_range?: string | null;
          timeline?: string | null;
          message?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
