import { supabase } from "@/app/_utils/supabase";

export const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = '/logout';
}
