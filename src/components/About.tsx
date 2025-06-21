
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mic, Coffee, BookOpen, Trophy, Lightbulb } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Passionate about solving tough technical challenges"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Building",
      description: "Organizing meetups and bringing tech enthusiasts together"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Conference Speaking",
      description: "Sharing knowledge and insights at tech conferences"
    }
  ];

  const interests = [
    { icon: <Trophy className="w-5 h-5" />, text: "Sports: Cricket, Table Tennis, Badminton, Football" },
    { icon: <BookOpen className="w-5 h-5" />, text: "Reading Books" },
    { icon: <Coffee className="w-5 h-5" />, text: "Coffee Brewing" },
    { icon: <Lightbulb className="w-5 h-5" />, text: "Building My Startup" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate technologist with a mission to solve real-world problems and build meaningful communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-primary mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Beyond Technology</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {interests.map((interest, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-background">
                <div className="text-primary">
                  {interest.icon}
                </div>
                <span className="text-foreground">{interest.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
