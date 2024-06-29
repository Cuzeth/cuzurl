'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn('github');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to shorten URLs');
      return;
    }
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      setErrorMessage(data.error);
      setShortUrl('');
    } else {
      setShortUrl(`${window.location.origin}/${data.shortUrl}`);
      setErrorMessage('');
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      {status === 'loading' ? (
        <p className="loading">Loading...</p>
      ) : !session ? (
        <button onClick={handleSignIn}>Sign in with GitHub</button>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Enter your URL"
            />
            <button type="submit">Shorten</button>
          </form>
          <button onClick={handleSignOut}>Sign out</button>
          <button onClick={() => router.push('/manage')}>Manage URLs</button>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          {shortUrl && (
            <div className="shortened-url">
              <p>Shortened URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}