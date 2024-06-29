import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import pool from '../../../lib/db';

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub || !process.env.GITHUB_USER_ID?.split(',').includes(token.sub)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const userId = token.sub;
        const result = await pool.query(
            'SELECT original_url, short_url FROM urls WHERE user_id = $1',
            [userId]
        );

        return NextResponse.json({ urls: result.rows });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Error fetching URLs' }, { status: 500 });
    }
}