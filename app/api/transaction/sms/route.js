import { db } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    // Replace this with actual user ID if you're using auth
    const userId = 'demo-user-id';

    // Find the default account for that user
    const defaultAccount = await db.account.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    });

    if (!defaultAccount) {
      return new Response(JSON.stringify({ error: 'No default account found' }), { status: 400 });
    }

    // Extract amount from SMS message (simple regex, you can improve it)
    const amountMatch = message.match(/(?:Rs\.?|INR)?\s?([\d,]+\.\d{2})/i);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

    await db.transaction.create({
      data: {
        userId,
        accountId: defaultAccount.id,
        amount,
        description: message,
        type: 'expense',
        source: 'sms',
      },
    });

    return Response.json({ success: true, accountId: defaultAccount.id, amount, message });
  } catch (err) {
    console.error('Error saving SMS transaction:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
