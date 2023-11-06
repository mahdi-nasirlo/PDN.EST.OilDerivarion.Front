import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOption: NextAuthOptions = {
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
                // Add logic here to look up the user from the credentials supplied
                const user = {id: "1", name: "J Smith", email: "jsmith@example.com"}

                console.log(credentials)

                if (!credentials?.code) {
                    return null
                }

                const data = {
                    code: credentials?.code
                }

                const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/api/V1/Sso/GetToken`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                console.log(response)
                // const responseData = await response.json();
                if (true) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOption)

export {handler as GET, handler as POST}