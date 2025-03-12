// API Security helpers

/**
 * Checks if the request is coming from the auth system or internal application
 * Serves as a simple security measure to prevent unauthorized access to internal APIs
 * @param request The incoming Request object
 * @returns boolean indicating if request is from auth system
 */
export function isInternalRequest(request: Request): boolean {
  // Get the referer header
  const referer = request.headers.get('referer') || '';

  // Check for internal API calls
  if (referer.includes('/api/auth')) {
    return true;
  }

  // Check for next-auth internal request header
  const requestOrigin = request.headers.get('x-nextauth-request') === 'true';
  if (requestOrigin) {
    return true;
  }

  // Check for secret API key
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.INTERNAL_API_KEY;

  if (validApiKey && apiKey === validApiKey) {
    return true;
  }

  return false;
}
