import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user session
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If there's no user, redirect them to the login page
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.navTitle}>MyDashboard</h1>
          <button onClick={handleLogout} style={styles.navButton}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.welcomeText}>Welcome to the Dashboard</h1>
        {user && <p style={styles.userEmail}>You are logged in as {user.email}</p>}
      </div>
    </div>
  );
}

// Inline CSS styling for the layout
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: 'url("https://cdn.dribbble.com/userupload/24326411/file/original-9ac92b0640df32cf09987f210665a4ef.gif") no-repeat center center fixed',
    backgroundSize: 'cover',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
  },
  navbar: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  navButton: {
    backgroundColor: '#ff5c8d',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  userEmail: {
    fontSize: '1.2rem',
  },
};
