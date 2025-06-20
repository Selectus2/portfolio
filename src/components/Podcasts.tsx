
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, Clock } from "lucide-react";

const Podcasts = () => {
  const podcasts = [
    {
      title: "The Tech Problem Solver's Mindset",
      show: "Tech Talk Weekly",
      duration: "45 min",
      date: "February 2024",
      description: "Deep dive into systematic problem-solving approaches for complex technical challenges.",
      link: "#"
    },
    {
      title: "Building Communities in Tech",
      show: "Developer Stories",
      duration: "38 min",
      date: "January 2024",
      description: "My journey organizing meetups and the impact of tech communities on career growth.",
      link: "#"
    },
    {
      title: "From Employee to Entrepreneur",
      show: "Startup Journey",
      duration: "52 min",
      date: "December 2023",
      description: "The transition from problem solver to startup founder and lessons learned.",
      link: "#"
    },
    {
      title: "The Art of Technical Troubleshooting",
      show: "Code & Coffee",
      duration: "41 min",
      date: "November 2023",
      description: "Advanced debugging techniques and becoming the last resort for tech issues.",
      link: "#"
    }
  ];

  return (
    <section id="podcasts" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Podcast Appearances</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conversations about technology, problem-solving, and entrepreneurship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {podcasts.map((podcast, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{podcast.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Podcast className="w-4 h-4" />
                        <span>{podcast.show}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{podcast.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{podcast.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{podcast.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Listen
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Podcasts;
