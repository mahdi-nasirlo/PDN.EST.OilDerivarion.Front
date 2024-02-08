import DashboardLayout from "layout"
import ProtectedRouteProvider from "@/providers/protected-route-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
        <ProtectedRouteProvider>
            {children}
        </ProtectedRouteProvider>
    </DashboardLayout>
  );
}
