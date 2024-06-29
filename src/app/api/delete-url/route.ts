import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import pool from '../../../lib/db';

export async function DELETE(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !token.sub || !process.env.GITHUB_USER_ID?.split(',').includes(token.sub)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { shortUrl } = await req.json();
        const userId = token.sub;

        const result = await pool.query(
            'DELETE FROM urls WHERE short_url = $1 AND user_id = $2',
            [shortUrl, userId]
        );

        if (result.rowCount && result.rowCount > 0) {
            return NextResponse.json({ message: 'URL deleted' });
        } else {
            return NextResponse.json({ error: 'URL not found or unauthorized' }, { status: 404 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Error deleting URL' }, { status: 500 });
    }
}