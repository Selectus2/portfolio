
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin } from "lucide-react";

const Talks = () => {
  const talks = [
    {
      title: "Building Scalable Tech Communities",
      event: "TechConf 2024",
      location: "San Francisco, CA",
      date: "March 2024",
      description: "How to grow and sustain technical communities through meetups and conferences.",
      link: "#"
    },
    {
      title: "The Last Resort: Advanced Troubleshooting",
      event: "DevSummit 2023",
      location: "New York, NY", 
      date: "November 2023",
      description: "Systematic approaches to solving complex technical problems when everything else fails.",
      link: "#"
    },
    {
      title: "From Problem Solver to Entrepreneur",
      event: "StartupWeek 2023",
      location: "Austin, TX",
      date: "September 2023",
      description: "Journey from being the go-to tech problem solver to building your own startup.",
      link: "#"
    }
  ];

  return (
    <section id="talks" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Conference Talks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge and insights at tech conferences worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talks.map((talk, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg mb-2">{talk.title}</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{talk.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{talk.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{talk.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">{talk.event}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={talk.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Talks;
