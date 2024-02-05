import AuthProvider from '@/providers/auth-provider'
import ThemeProvider from '@/providers/theme-provider'
import QueryClientProvider from '@/providers/query-client-provider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <QueryClientProvider>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html >
  )
}

export const metadata = {
  title: 'مشتقات نفتی - سازمان استاندارد ایران',
}