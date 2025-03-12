import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { getGuestByEmail } from './data-service';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        // check if guest exists
        const response = await fetch(`${baseUrl}/api/guests/${user.email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // If the response is not ok (no existing guest), create a new guest
        if (!response.ok) {
          if (user) {
            const nameParts = user.name ? user.name.split(' ') : ['', ''];
            const newGuest = {
              firstName: nameParts[0],
              lastName:
                nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
              email: user.email,
              nationalID: '',
              country: '',
              countryFlag: '',
            };

            const createResponse = await fetch(`${baseUrl}/api/guests`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newGuest),
            });

            if (!createResponse.ok) {
              console.error('Failed to create guest');
            }
          }
        }

        return true; // Always allow sign in whether guest exists or was created
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session }) {
      const guest = session?.user && await getGuestByEmail(session.user.email);
      if (guest) {
        // Merge guest data into session if it exists
        session.user = { ...session.user, guestId: guest.id };
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});
