// app/api/transaction/sms/route.js

import { db } from '@/lib/prisma'; // Adjust if your prisma instance is elsewhere

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body?.message) {
      return new Response(JSON.stringify({ error: 'Missing message field' }), { status: 400 });
    }

    const message = body.message;

    // Use your actual user ID logic if logged in, hardcoded for now
    const userId = 'e0cd0be5-1665-4eda-9554-68e2a9bed5d8';

    // 🟡 Fetch the default account for this user
    const defaultAccount = await db.account.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    });

    if (!defaultAccount) {
      console.error('⚠️ No default account found for user:', userId);
      return new Response(JSON.stringify({ error: 'No default account found' }), { status: 404 });
    }

    // 🟡 Try to extract amount using regex
    const amountMatch = message.match(/(?:Rs\.?|INR)?\s?([\d,]+\.\d{2})/i);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

    if (isNaN(amount) || amount === 0) {
      console.warn('⚠️ Could not extract amount from message:', message);
    }

    // 🟢 Save transaction to DB
    const transaction = await db.transaction.create({
      data: {
        userId,
        accountId: defaultAccount.id,
        amount,
        description: message,
        type: 'expense',
        source: 'sms',
      },
    });

    console.log('✅ Transaction saved:', transaction);

    return Response.json({
      success: true,
      accountId: defaultAccount.id,
      transactionId: transaction.id,
      amount,
      message,
    });
  } catch (err) {
    console.error('❌ Error in POST /api/transaction/sms:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
