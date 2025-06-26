import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    console.log('👉 /api/transaction/sms called');

    // ----- raw body so you never crash on malformed JSON
    const bodyText = await req.text();
    console.log('Raw body:', bodyText);

    let body;
    try {
      body = JSON.parse(bodyText || '{}');
    } catch {
      return new Response(
        JSON.stringify({ error: 'Body is not valid JSON' }),
        { status: 400 }
      );
    }

    if (!body.message) {
      return new Response(JSON.stringify({ error: 'Missing message field' }), { status: 400 });
    }

    const userId = 'e0cd0be5-1665-4eda-9554-68e2a9bed5d8';

    // default account
    const defaultAccount = await db.account.findFirst({
      where: { userId, isDefault: true },
    });
    console.log('Default account:', defaultAccount);

    if (!defaultAccount) {
      return new Response(JSON.stringify({ error: 'No default account' }), { status: 404 });
    }

    // amount
    const amountMatch = body.message.match(/(\d[\d,]*\.?\d{0,2})/);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

    const transaction = await db.transaction.create({
      data: {
        userId,
        accountId: defaultAccount.id,
        amount,
        description: body.message,
        type: 'expense',
        source: 'sms',
      },
    });

    console.log('✅ Saved tx:', transaction);

    return Response.json({ success: true, transactionId: transaction.id });
  } catch (err) {
    console.error('❌ Handler error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

// (optional) quick GET health-check
export async function GET() {
  return Response.json({ ok: true, route: '/api/transaction/sms' });
}
