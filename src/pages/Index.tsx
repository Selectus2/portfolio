
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Talks from "@/components/Talks";
import Podcasts from "@/components/Podcasts";
import Blogs from "@/components/Blogs";
import Books from "@/components/Books";
import Contact from "@/components/Contact";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1">
            <Hero />
            <About />
            <Projects />
            <Talks />
            <Podcasts />
            <Blogs />
            <Books />
            <Contact />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
