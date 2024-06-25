'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setShortUrl(`${window.location.origin}/api/redirect?shortUrl=${data.shortUrl}`);
      setErrorMessage('');
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      {!session ? (
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
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
          <button onClick={() => signOut()}>Sign out</button>
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