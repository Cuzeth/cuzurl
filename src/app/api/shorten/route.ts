import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import pool from '../../../lib/db';

const generateShortUrl = () => Math.random().toString(36).substr(2, 5);

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.sub || !process.env.GITHUB_USER_ID?.split(',').includes(token.sub)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    if (!isValidUrl(originalUrl)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const shortUrl = generateShortUrl();
    const userId = token.sub;

    try {
      const result = await pool.query(
        'INSERT INTO urls (original_url, short_url, user_id) VALUES ($1, $2, $3) RETURNING short_url',
        [originalUrl, shortUrl, userId]
      );
      return NextResponse.json({ shortUrl: result.rows[0].short_url });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Error inserting URL' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
