
import { useState } from "react";
import { Home, User, FolderOpen, Mail, FileText, Mic, BookOpen, PenTool, Podcast } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { icon: Home, label: "Home", sectionId: "home" },
    { icon: User, label: "About", sectionId: "about" },
    { icon: FolderOpen, label: "Portfolio", sectionId: "projects" },
    { icon: Mic, label: "Talks", sectionId: "talks" },
    { icon: Podcast, label: "Podcasts", sectionId: "podcasts" },
    { icon: PenTool, label: "Blogs", sectionId: "blogs" },
    { icon: BookOpen, label: "Books", sectionId: "books" },
    { icon: FileText, label: "Resume", sectionId: "resume" },
    { icon: Mail, label: "Contact", sectionId: "contact" },
  ];

  return (
    <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-8 text-center border-b border-sidebar-border">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
          VS
        </div>
        <h2 className="text-xl font-bold mb-1">Portfolio</h2>
        <p className="text-muted-foreground text-sm">Tech Problem Solver</p>
      </SidebarHeader>

      <SidebarContent className="py-8">
        <SidebarMenu className="space-y-2 px-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => scrollToSection(item.sectionId)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-sidebar-border">
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
            <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center">
              <span className="text-xs">𝕏</span>
            </div>
          </a>
          <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
            <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center">
              <span className="text-xs">in</span>
            </div>
          </a>
          <a href="#" className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
            <div className="w-8 h-8 rounded bg-sidebar-accent flex items-center justify-center">
              <span className="text-xs">@</span>
            </div>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
