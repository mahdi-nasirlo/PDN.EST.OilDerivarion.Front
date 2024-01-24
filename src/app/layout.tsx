import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './globals.css'
import AuthProvider from '@/providers/auth-provider'
import ThemeProvider from '@/providers/theme-provider'
import QueryClientProvider from '@/providers/query-client-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body>
        <AuthProvider>
          <QueryClientProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'مشتقات نفتی - سازمان استاندارد ایران',
}