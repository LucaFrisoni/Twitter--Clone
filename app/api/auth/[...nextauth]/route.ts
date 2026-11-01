import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // Igual que la duracion del token de la API

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email or Password missing");
        }

        try {
          const { data } = await axios.post(
            "https://backlitter.onrender.com/login",
            { email: credentials.email, password: credentials.password }
          );

          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            apiToken: data.token,
          };
        } catch (error: any) {
          if (error.response?.status === 401) {
            throw new Error("Invalid credentials");
          }
          if (error.response?.status === 429) {
            throw new Error("Too many attempts");
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.apiToken = user.apiToken;
      return token;
    },
    session({ session, token }) {
      session.apiToken = token.apiToken;
      return session;
    },
  },
  debug: process.env.NODE_ENV == "development",
  session: { strategy: "jwt", maxAge: SESSION_MAX_AGE },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
