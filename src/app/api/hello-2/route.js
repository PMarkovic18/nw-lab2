export async function GET() {
    return new Response(JSON.stringify('Hello-2'), { status: 200 });
};