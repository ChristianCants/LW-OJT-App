
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofbrfvjialfcjxgkqdkg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mYnJmdmppYWxmY2p4Z2txZGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3OTU3NzIsImV4cCI6MjA4NjM3MTc3Mn0.5fos4jR--MxHVmQtPugM5H7PLKYufJ1udwLGne3fiwA';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Custom Auth Functions using user_access table

export const customSignUp = async (username, email, password, role) => {
  // Note: email is not currently in the user_access schema request, but passing it for potential future use or if we add it.
  // The user request specifically mentioned: user, password, and role column. 
  // I will just use username, password, role as requested for the table.

  const { data, error } = await supabase
    .from('user_access')
    .insert([
      { username, password, role }
    ])
    .select();

  return { data, error };
};

export const customSignIn = async (username, password) => {
  const { data, error } = await supabase
    .from('user_access')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  return { data, error };
};

// Deprecated/Unused Supabase Auth functions (kept for reference if needed, but not used)
export const signOut = async () => {
  // For custom auth, "sign out" is just clearing local state, 
  // but passing control back to the caller to handle that.
  return { error: null };
};
