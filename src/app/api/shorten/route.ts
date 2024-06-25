import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

const generateShortUrl = () => Math.random().toString(36).substr(2, 5);

export async function POST(req: NextRequest) {
  try {
    const { originalUrl } = await req.json();

    if (!originalUrl) {
      return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    const shortUrl = generateShortUrl();
    try {
      const result = await pool.query(
        'INSERT INTO urls (original_url, short_url) VALUES ($1, $2) RETURNING short_url',
        [originalUrl, shortUrl]
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