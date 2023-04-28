import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";
import GoogleProvider from "next-auth/providers/google"
const { Google_ID = "776399304830-2kqovrj3u9sv52bsuaog3vn8f453p8o0.apps.googleusercontent.com", Google_ID_Secret = "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" } = process.env;

//export default NextAuth(authOptions);

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: Google_ID,
            clientSecret: Google_ID_Secret,
        })
    ]
})
