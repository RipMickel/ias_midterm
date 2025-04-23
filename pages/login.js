import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before each login attempt
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('invalid email or password')) {
        setErrorMessage('Account not registered. Please check your email or register first.');
      } else {
        setErrorMessage('Login failed: ' + error.message);
      }
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        
        {errorMessage && <p style={styles.error}>{errorMessage}</p>} {/* Display error message */}
        
        <p>Don&apos;t have an account? <Link href="/register">
  Register here
</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'url("https://cdn.dribbble.com/userupload/42197344/file/original-ca38e602be31110c65910ab190294b99.gif") no-repeat center center fixed',
    backgroundSize: 'cover',
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2rem',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};