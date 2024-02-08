import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {JWT} from "next-auth/jwt";
import {AdapterUser} from "next-auth/adapters";
import Auth0 from "next-auth/providers/auth0";


const authOption: NextAuthOptions = {

    providers: [
//     authority : 'https://is-test.pdnsoftware.ir',
//     silentRenew: true,
//     useRefreshToken: true,
//     renewTimeBeforeTokenExpiresInSeconds: 60,
//     secureRoutes: [https://oil-test.pdnsoftware.ir],
//      logLevel: LogLevel.Debug,
//     autoUserInfo: false

//     scope: 'openid profile offline_access oil.fullaccess',
//     responseType: 'code',
        Auth0({
            clientId: "process.env.CLIENT_ID as string",
            clientSecret: "process.env.CLIENT_SECRET as string",
            issuer: "https://is-test.pdnsoftware.ir",
            authorization: {params: {scope: "openid your_custom_scope"}},
        }),
        {
            id: "OpenIdConnect",
            name: "OpenIdConnect",
            type: "oauth",
            // wellKnown: "https://is-test.pdnsoftware.ir/.well-known/openid-configuration",
            // issuer: "https://is-test.pdnsoftware.ir",
            // accessTokenUrl: "https://is-test.pdnsoftware.ir",
            authorization: {
                url: "https://is-test.pdnsoftware.ir",
                params: {
                    client_id: "https://is-test.pdnsoftware.ir",
                    redirect_uri: "https://localhost:3000/",
                    scope: "openid profile offline_access oil.fullaccess",
                    response_type: 'code'
                },
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        },
        CredentialsProvider({
            name: "Credentials",
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
        error: "/login",
        signOut: "/signout"
    }
}

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}