import { query } from '@/lib/db';
export async function GET(req) {
    const destinationAccount = req.nextUrl.searchParams.get('destinationAccount');
    const amount = req.nextUrl.searchParams.get('amount');

    if (!destinationAccount || !amount) {
        return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
    }

    try {
        await query(`BEGIN; UPDATE users SET account_balance = account_balance - ${amount} WHERE username = 'zrtva'; UPDATE users SET account_balance =account_balance + ${amount} WHERE username = '${destinationAccount}'; COMMIT;`);
        return new Response(JSON.stringify("ok"), { status: 200 });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
    }
}