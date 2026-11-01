// Adds the backend API token to NextAuth's session types.
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    apiToken?: string;
  }
  interface User {
    apiToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;
  }
}
