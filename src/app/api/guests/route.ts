import { isInternalRequest } from '@/lib/apiSecurity';
import { createGuest } from '@/lib/data-service';
import { Guest } from '@/types/Guest.type';

export async function POST(request: Request): Promise<Response> {
  // Only allow internal requests (from auth system or with API key)
  if (!isInternalRequest(request)) {
    return Response.json({ error: 'Unauthorized Access' }, { status: 401 });
  }

  try {
    const { firstName, lastName, email, nationalID, country, countryFlag } =
      (await request.json()) as Guest;

    const newGuest = {
      firstName,
      lastName,
      email,
      nationalID,
      country,
      countryFlag,
    };

    const guestId = await createGuest(newGuest);

    if (guestId !== null) {
      return Response.json({ id: guestId, success: true }, { status: 201 });
    } else {
      return Response.json(
        { error: 'Failed to create guest' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating guest:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
