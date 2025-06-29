import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Sidebar Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <SidebarTrigger className="bg-background/80 text-foreground hover:bg-background/90 border border-border" />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background-2.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          विश्वजितसिंह देसुरकर
            {/* <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-gray-300 mt-4">
              Desurkar
            </span> */}
          </h1>
          
          <div className="mb-8">
            <span className="text-xl md:text-2xl text-gray-200">
              I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  Tech Problem Solver
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></span>
              </span>
            </span>
          </div>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Passionate about solving tough technical challenges and building communities through meetups and conferences. Aspiring entrepreneur with a love for sports.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToAbout}
              className="text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 dark:bg-gray-100 dark:text-black dark:hover:bg-white"
            >
              Explore My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-black"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
