import { createBrowserClient } from '@supabase/ssr';

// supabase不活跃时间太长，项目被暂停无法重新激活，数据被存档

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
