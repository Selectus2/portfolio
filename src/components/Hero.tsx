
import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Zap } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Code className="w-8 h-8 text-primary" />
            <Zap className="w-6 h-6 text-primary" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Tech Problem Solver
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            I love solving real-world problems with technology. Known as the last resort for tech issues 
            and passionate about building communities through meetups and conferences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToAbout}
              className="text-lg px-8 py-6"
            >
              Explore My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6"
            >
              Download Resume
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Aspiring Entrepreneur • Community Builder • Sports Enthusiast</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
