// /app/menu/layout.tsx

import ClientLayout from "@/components/menu/layout/ClientLayout";
import { BeachesProvider } from "../context/BeachesContext";


export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <BeachesProvider>
        <ClientLayout>{children}</ClientLayout>
      </BeachesProvider>
    </div>
  );
}
