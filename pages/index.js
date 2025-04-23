import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // Fixed import if needed

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession(); // use supabase.auth not supabase.login
        if (error) {
          console.error('Error getting session:', error);
          router.push('/login');
          return;
        }

        if (data.session) {
          // ✅ If session exists, go to dashboard
          router.push('/dashboard');
        } else {
          // ❌ If no session, go to login
          router.push('/login');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        router.push('/login'); // Fallback redirect
      }
    };

    checkSession();
  }, [router]);

  return (
    <div>
      <h1>Welcome to the Authentication System</h1>
      <p>Redirecting...</p>
    </div>
  );
}
