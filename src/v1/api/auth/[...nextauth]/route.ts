import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {JWT} from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";


const authOption: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                code: {label: "token", type: "text"},
            },
            async authorize(credentials, req) {

                if (!credentials?.code) {
                    return null
                }

                const {code} = credentials

                return { id: "1", name: "J Smith", email: "jsmith@example.com", access_token: code }

            }
        }),
    ],
    callbacks: {
        jwt: ({user, token}: {
            user: User | (AdapterUser & { access_token?: string, token_type?: string }),
            token: JWT
        }) => {

            if (user && 'access_token' in user && user.access_token) {

                return {
                    ...token,
                    access_token: `${user.access_token}`
                };
            }

            return token;
        },
        session: ({session, token}: { session: Session, token: JWT & { access_token?: string } }) => {

            if (token && token.access_token) {
                return {
                    access_token: token.access_token,
                    ...session
                }
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/signout"
    }
}

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}