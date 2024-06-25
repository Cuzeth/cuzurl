import { NextRequest, NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const shortUrl = pathname.split('/').pop();

  if (!shortUrl) {
    return NextResponse.json({ error: 'Short URL is required' }, { status: 400 });
  }

  try {
    const result = await pool.query(
      'SELECT original_url FROM urls WHERE short_url = $1',
      [shortUrl]
    );
    if (result.rows.length > 0) {
      return NextResponse.redirect(result.rows[0].original_url, 301);
    } else {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Error fetching URL' }, { status: 500 });
  }
}