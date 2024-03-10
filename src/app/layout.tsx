import ThemeProvider from '@/providers/theme-provider'
import QueryClientProvider from '@/providers/query-client-provider'
import './globals.css'
import OidcAuthProvider from '@/providers/oidc-auth-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body>
        <ThemeProvider>
          <QueryClientProvider>
            <OidcAuthProvider>
              {children}
            </OidcAuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}

export const metadata = {
  title: 'مشتقات نفتی - سازمان استاندارد ایران',
}