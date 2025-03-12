import { isInternalRequest } from '@/lib/apiSecurity';
import { passwordConfig } from '@/lib/config';
import { createDatabaseConnection } from '@/lib/Database';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
): Promise<Response> {
  // Check if request is from auth system or internal application
  if (!isInternalRequest(request)) {
    return Response.json({ error: 'Unauthorized Access' }, { status: 401 });
  }

  try {
    const { email } = await params;
    console.log(`Attempting to find guest with email: ${email}`);
    const database = await createDatabaseConnection(passwordConfig);
    const data = await database.getGuestByEmail(email);

    if (!data) {
      console.log(`No guest found with email: ${email}`);
      return Response.json({ error: 'Guest not found' }, { status: 404 });
    }

    console.log(`Found guest with email: ${email}`, data);
    return Response.json(data);
  } catch (error) {
    console.error('Error retrieving guest:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
