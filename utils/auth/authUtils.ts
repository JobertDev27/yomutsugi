import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function signUp(email: string, pass: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
    options: {
      //emailRedirectTo: "https://example.com/welcome"
    }
  });
}
