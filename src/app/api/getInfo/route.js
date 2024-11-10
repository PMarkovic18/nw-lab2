import { query } from '@/lib/db';
export async function GET(req) {
    const destinationAccount = req.nextUrl.searchParams.get('destinationAccount');

    try {
        const { rows } = await query(`SELECT username,account_balance FROM users WHERE username = 'zrtva' OR username = 'napadac' OR username = '${destinationAccount}'`);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}