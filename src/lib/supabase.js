import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for auth
export const auth = {
  signUp: async ({ email, password, fullName, phone, memberType, subscribeNewsletter }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          member_type: memberType,
          subscribe_newsletter: subscribeNewsletter,
        },
      },
    });
    return { data, error };
  },

  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },
};

// Helper functions for database operations
export const db = {
  // Articles
  getArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createArticle: async (article) => {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();
    return { data, error };
  },

  deleteArticle: async (id) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Contacts
  createContact: async (contact) => {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single();
    return { data, error };
  },

  getContacts: async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Write Tokens
  getWriteTokens: async () => {
    const { data, error } = await supabase
      .from('write_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createWriteToken: async (token) => {
    const { data, error } = await supabase
      .from('write_tokens')
      .insert([token])
      .select()
      .single();
    return { data, error };
  },

  getWriteToken: async (token) => {
    const { data, error } = await supabase
      .from('write_tokens')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .single();
    return { data, error };
  },

  markTokenAsUsed: async (token) => {
    const { error } = await supabase
      .from('write_tokens')
      .update({ used: true })
      .eq('token', token);
    return { error };
  },
};
