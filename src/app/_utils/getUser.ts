import { supabase } from "@/app/_utils/supabase";
import { NextRequest } from "next/server";

export const getUser = async (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  return await supabase.auth.getUser(token);
};
