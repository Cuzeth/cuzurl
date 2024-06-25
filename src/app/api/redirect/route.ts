import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shortUrl = searchParams.get('shortUrl');

  console.log('Received shortUrl:', shortUrl);

  if (!shortUrl) {
    return NextResponse.json({ error: 'Short URL is required' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT original_url FROM urls WHERE short_url = $1',
      [shortUrl]
    );
    if (result.rows.length > 0) {
      console.log('Redirecting to:', result.rows[0].original_url);
      return NextResponse.redirect(result.rows[0].original_url, 301);
    } else {
      console.log('URL not found for shortUrl:', shortUrl);
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error fetching URL' }, { status: 500 });
  }
}