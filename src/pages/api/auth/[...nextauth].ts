import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";
import GoogleProvider from "next-auth/providers/google"

export default NextAuth(authOptions);

