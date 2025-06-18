
import { useState } from "react";
import { Home, User, FolderOpen, Mail, FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const menuItems = [
    { icon: Home, label: "Home", sectionId: "home" },
    { icon: User, label: "About", sectionId: "about" },
    { icon: FolderOpen, label: "Portfolio", sectionId: "projects" },
    { icon: FileText, label: "Resume", sectionId: "resume" },
    { icon: Mail, label: "Contact", sectionId: "contact" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black/80 text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-gray-900 text-white z-40 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Profile section */}
          <div className="p-8 text-center border-b border-gray-700">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              VS
            </div>
            <h2 className="text-xl font-bold mb-1">Portfolio</h2>
            <p className="text-gray-400 text-sm">Tech Problem Solver</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-8">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.sectionId)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="p-6 border-t border-gray-700">
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
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
