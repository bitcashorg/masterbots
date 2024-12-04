import { updateSubscription } from '@/services/admin/admin.service';

export async function POST(req: Request) {
  try {
    const { userId, subscriptionId } = await req.json();
    if (!userId) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    const result = await updateSubscription(userId, subscriptionId);
    return Response.json(result[0]);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}