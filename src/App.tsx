import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { routes, type RouteMeta } from "@/routes";
import { useDocumentHead } from "@/hooks/use-document-head";
import { SiteLayout } from "@/components/SiteLayout";

const queryClient = new QueryClient();

/** Applies a route's <head> on client-side navigation, then renders the page. */
const RouteHead = ({ meta }: { meta: RouteMeta }) => {
  useDocumentHead(meta);
  return meta.element;
};

/**
 * The router is injected rather than mounted here: the browser entry passes a
 * BrowserRouter, the prerenderer passes a StaticRouter, and both get the same
 * tree underneath.
 */
const App = ({ router }: { router: (children: ReactNode) => ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {router(
          <SiteLayout>
            <Routes>
              {routes.map((meta) => (
                <Route
                  key={meta.path}
                  path={meta.path}
                  element={<RouteHead meta={meta} />}
                />
              ))}
            </Routes>
          </SiteLayout>
        )}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
