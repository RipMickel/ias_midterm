import Link from 'next/link'; 

import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-super-secret-key';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        alert("This email is already registered.");
      } else {
        alert('Registration failed: ' + error.message);
      }
    } else {
      // Encrypt additional info
      const encryptedFullName = CryptoJS.AES.encrypt(fullName, SECRET_KEY).toString();
      const encryptedPhone = CryptoJS.AES.encrypt(phone, SECRET_KEY).toString();

      // Insert encrypted data into a profiles table
      await supabase.from('profiles').insert([
        {
          email,
          full_name: encryptedFullName,
          phone: encryptedPhone,
        },
      ]);

      alert('Please check your Gmail for a confirmation email!');
      router.push('/login');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Register</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.link}>
  Already have an account?{' '}
  <Link href="/login" legacyBehavior>
    <a style={styles.linkText}>Login here</a>
  </Link>
</p>
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
  link: {
    marginTop: '10px',
  },
  linkText: {
    color: '#007BFF',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};