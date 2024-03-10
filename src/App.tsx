import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/apresentation/components/theme-provider";
import { router } from "@/apresentation/routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/infra/services/query-client.ts";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          duration={5000}
          closeButton={true}
          richColors
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
