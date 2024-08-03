import clientPromise from "@/lib/mongoDBAdapter";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/dbConnect/dbConnect";
import User from "@/app/models/User";
import bcryptjs from "bcryptjs";
// guest 2001, super admin 1010, admin 1100, author 2010
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || "Unknown",
          email: profile.email || "Unknown",
          image: profile.avatar_url || "Unknown",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || "Unknown",
          email: profile.email,
          image: profile.image,
        };
      },
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.SMTP_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const formEmail = credentials?.email;
        const formPassword = credentials?.password;

        await dbConnect();
        const isUserExist = await User.findOne({
          email: formEmail,
        });

        if (!isUserExist) {
          return null;
        }

        const isValidPassword = await bcryptjs.compare(
          formPassword,
          isUserExist?.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: isUserExist?._id,
          name: isUserExist?.name || "anonymous",
          email: isUserExist?.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      const isActiveUser = await User.findOne({
        email: user?.email,
      });
      console.log("isActiveUser", isActiveUser);
      if (isActiveUser?.active) {
        console.log("Good User");
        return true;
      } else {
        console.log("Bad User");
        return false;
      }

      //  console.log('Activity Status check', isActiveUser);
    },

    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account?.access_token;
      }
      let customData;
      if (user) {
        token.id = user?.id;
        const userNewData = user;

        if (!userNewData?.provider) {
          const existUser = await User.findOne({
            email: user?.email,
          });
          customData = {
            id: existUser?.id,
            name: existUser?.name,
            email: existUser?.email,
            image: existUser?.image,
            roles: existUser?.roles,
            active: existUser?.active,
            is_admin: existUser?.is_admin,
          };
        } else {
          customData = {
            id: userNewData?.id,
            name: userNewData?.name,
            email: userNewData?.email,
            image: userNewData?.image,
            roles: userNewData?.roles,
            active: userNewData?.active,
            is_admin: userNewData?.is_admin,
          };
        }
      }
      return { ...token, ...customData };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
