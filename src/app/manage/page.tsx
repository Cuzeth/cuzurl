'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Manage() {
    const { data: session, status } = useSession();
    const [urls, setUrls] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            fetchUrls();
        }
    }, [status]);

    const fetchUrls = async () => {
        const res = await fetch('/api/get-urls');
        const data = await res.json();
        if (res.status === 200) {
            setUrls(data.urls);
        } else {
            console.error(data.error);
        }
    };

    const handleDelete = async (shortUrl: any) => {
        const res = await fetch(`/api/delete-url`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortUrl }),
        });
        const data = await res.json();
        if (res.status === 200) {
            fetchUrls();
        } else {
            console.error(data.error);
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <button onClick={() => signIn('github')}>Sign in with GitHub</button>;
    }

    return (
        <div>
            <h1>Manage Your URLs</h1>
            <ul>
                {urls.map((url: any) => (
                    <li key={url.shortUrl}>
                        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a>
                        <button onClick={() => handleDelete(url.shortUrl)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
