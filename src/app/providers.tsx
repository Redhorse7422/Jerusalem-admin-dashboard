"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}
