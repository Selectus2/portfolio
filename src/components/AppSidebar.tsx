
import { useState } from "react";
import { Home, User, FolderOpen, Mail, FileText } from "lucide-react";
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
    { icon: FileText, label: "Resume", sectionId: "resume" },
    { icon: Mail, label: "Contact", sectionId: "contact" },
  ];

  return (
    <Sidebar className="border-r bg-gray-900 text-white">
      <SidebarHeader className="p-8 text-center border-b border-gray-700">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
          VS
        </div>
        <h2 className="text-xl font-bold mb-1">Portfolio</h2>
        <p className="text-gray-400 text-sm">Tech Problem Solver</p>
      </SidebarHeader>

      <SidebarContent className="py-8">
        <SidebarMenu className="space-y-2 px-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => scrollToSection(item.sectionId)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-gray-700">
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
              <span className="text-xs">𝕏</span>
            </div>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
              <span className="text-xs">in</span>
            </div>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center">
              <span className="text-xs">@</span>
            </div>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
