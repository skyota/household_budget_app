import { supabase } from "@/app/_utils/supabase";

const getToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
};

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const token = await getToken();
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    return data
  },

  post: async <T>(url: string, body: T) => {
    const token = await getToken();
    return await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  },

  put: async <T>(url: string, body: T) => {
    const token = await getToken();
    return await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  },

  delete: async <T>(url: string): Promise<T> => {
    const token = await getToken();
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await res.json();
    return data
  }
};
