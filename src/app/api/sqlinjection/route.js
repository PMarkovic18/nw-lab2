import { query } from '@/lib/db';

export async function POST(req) {
    try {
        const { query: userQuery } = await req.json();
        console.log(userQuery);
        const { rows } = await query(`SELECT * FROM users WHERE username = '${userQuery}'`);
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}