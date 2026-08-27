import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Mic,
  Users,
  PenTool,
  Package,
  Code2,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { EMAIL, JOB_TITLE } from "@/lib/profile";
import { cn } from "@/lib/utils";

/**
 * Same shell as before — avatar disc, menu, social footer. Two changes:
 * the items are real route links rather than scrollIntoView on #hash anchors
 * (six pages cannot be addressed by anchors), and the footer's three href="#"
 * placeholders now point at the real profiles.
 */

const menuItems = [
  { icon: Home, label: "Home", to: "/", end: true },
  { icon: Code2, label: "Ruby on Rails", to: "/ruby-on-rails/" },
  { icon: Package, label: "Open Source", to: "/open-source/" },
  { icon: Mic, label: "Talks", to: "/talks/" },
  { icon: Users, label: "Community", to: "/community/" },
  { icon: PenTool, label: "Writing", to: "/writing/" },
  { icon: User, label: "About", to: "/about/" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Selectus2" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishwajeetsingh-desurkar/",
  },
  { icon: Twitter, label: "X", href: "https://x.com/VishwaDesurkar" },
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-8 text-center border-b border-sidebar-border">
        <NavLink
          to="/"
          className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
            VS
          </div>
          <h2 className="text-xl font-bold mb-1">Vishwajeetsingh Desurkar</h2>
          <p className="text-muted-foreground text-sm">{JOB_TITLE}</p>
          <p className="text-muted-foreground text-sm">Pune, India</p>
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="py-8">
        <SidebarMenu className="space-y-2 px-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-sidebar-border">
        <div className="flex justify-center space-x-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              rel="me noopener"
              className="text-muted-foreground hover:text-sidebar-foreground transition-colors"
            >
              <div className="w-11 h-11 rounded bg-sidebar-accent flex items-center justify-center">
                <s.icon className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
