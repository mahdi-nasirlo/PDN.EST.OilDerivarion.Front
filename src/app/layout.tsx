import QueryClientProvider from '@/providers/query-client-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa">
      <body>
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'مشتقات نفتی - سازمان استاندارد ایران',
}