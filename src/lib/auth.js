import NextAuthModule from "next-auth";
import CredentialsProviderModule from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth/next";
import { prisma } from "./prisma";
import * as bcryptjs from "bcryptjs";

const { compare } = bcryptjs;

// Handle ES module nested default exports
const NextAuth = typeof NextAuthModule === 'function'
  ? NextAuthModule
  : (NextAuthModule.default?.default || NextAuthModule.default || NextAuthModule);

const CredentialsProvider = typeof CredentialsProviderModule === 'function'
  ? CredentialsProviderModule
  : (CredentialsProviderModule.default?.default || CredentialsProviderModule.default || CredentialsProviderModule);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard/auth",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        portal: { label: "Portal", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const portal = credentials.portal ?? "user";

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        // Check if user exists
        if (!user) {
          throw new Error("EMAIL_NOT_FOUND");
        }

        // Check if user has password (might be OAuth user)
        if (!user.password) {
          throw new Error("EMAIL_NOT_FOUND");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("INVALID_PASSWORD");
        }

        // Note: Email verification is checked in login-check API before reaching here

        if (portal === "user" && user.role === "ADMIN") {
          throw new Error("Admin accounts must use the admin portal to sign in");
        }

        if (portal === "admin" && user.role !== "ADMIN") {
          throw new Error("Only admin accounts can sign in from this portal");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        if (session.name !== undefined) {
          token.name = session.name;
        }
        if (session.image !== undefined) {
          token.image = session.image ?? null;
        }
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name ?? token.name;
        token.image = user.image ?? null;
      } else if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, image: true, name: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.name = dbUser.name ?? token.name;
          token.image = dbUser.image ?? null;
        }
      } else if (token?.email && token.image === undefined) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { image: true },
        });
        token.image = dbUser?.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        if (token.name !== undefined) {
          session.user.name = token.name;
        }
        if (token.image !== undefined) {
          session.user.image = token.image;
        }
      }
      return session;
    },
  },
};

export const authHandler = NextAuth(authOptions);

export async function auth() {
  return await getServerSession(authOptions);
}
