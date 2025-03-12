import { auth } from './lib/auth';
// export { default } from "next-auth/middleware" // protects all routes
export const config = {
  matcher: ['/account/:path*', '/api/guests/:path*'],
};

export const middleware = auth;
