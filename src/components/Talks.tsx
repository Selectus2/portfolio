import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin, Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

const Talks = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  
  const talks = [
    {
      title: "What if… Ruby Led the AI Revolution?",
      event: "RubyConf India 2025",
      location: "Jaipur, India",
      date: "September 2025",
      description: "What if Ruby never sat out the AI boom? What if it quietly evolved—unlocking the ability to build intelligent apps with semantic understanding, local models, and smart automation? In this talk, we step into an alternate reality where Ruby leads the AI charge.",
      link: "https://www.youtube.com/watch?v=1h5RZWSL4Oc"
    },
    {
      title: "The Harvey Dent Dilemma: Ruby's White Knight Rises (or Falls)",
      event: "RubyConf India 2024",
      location: "Jaipur, India",
      date: "November 2024",
      description: "A deep dive into Ruby's most powerful—and potentially risky—performance features. Topics include frozen strings, memoization, monkey patching, metaprogramming, Proc vs. Lambda, and new enhancements in Ruby 3.0. Learn how to use these advanced tools effectively while avoiding hidden dangers.",
      link: "https://www.youtube.com/watch?v=8LYHEzQL_-4"
    },
    {
      title: "Concurrency Showdown: Threads vs Fibers",
      event: "RubyConf Australia 2024",
      location: "Sydney, Australia",
      date: "April 2024",
      description: "A comparative exploration of Ruby's concurrency models—threads vs fibers. Covers mutex locks, race conditions, deadlocks, and interrupt handling. Demonstrates a hybrid model using fibers for I/O-bound tasks and threads for CPU work, emphasizing Ruby 3.0's fiber enhancements.",
      link: "https://www.youtube.com/watch?v=kU22NJq1sS0"
    },
    {
      title: "Connecting the Dots: Unleash the magic of AI in IoT",
      event: "Conf42 Internet of Things",
      location: "Online",
      date:"December 2023",
      description: "Dives into AI‑driven IoT solutions using Ruby. Showcases demos on preventive maintenance and anomaly detection with live Ruby-powered IoT devices. Highlights how language features and AI can optimize IoT performance.",
      link: "https://www.youtube.com/watch?v=Dg8JuIzPUvI"
    },
    {
      title: "Connecting the Dots: Unleash the magic of AI in IoT",
      event: "RubyConf India 2023",
      location: "Pune, India",
      date: "August 2023",
      description: "Dives into AI‑driven IoT solutions using Ruby. Showcases demos on preventive maintenance and anomaly detection with live Ruby-powered IoT devices. Highlights how language features and AI can optimize IoT performance.",
      link: "https://www.youtube.com/watch?v=YhkEQ9pP-W0"
    },
    {
      title: "Beyond Cubical",
      event: "Prose & Code – FC Pune",
      location: "Pune, India",
      date: "August 2022",
      description: "A personal tale of stepping out of conventional corporate structures. Through an intimate narrative, Vishwajeetsingh reflects on life beyond cubicles during his internship, intertwining creativity and code.",
      link: "https://www.youtube.com/watch?v=nnF_fbvtM0w"
    }
  ];

  // Helper to extract YouTube video ID from various URL formats
  const getYouTubeId = (url: string) => {
    try {
      const urlObj = new URL(url);
      
      // youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v');
      }
      
      // youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1).split('?')[0];
      }
      
      // youtube.com/embed/VIDEO_ID
      if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/embed/')[1];
      }
      
      // Fallback regex for edge cases
      const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      return videoIdMatch ? videoIdMatch[1] : null;
    } catch (error) {
      console.warn('Invalid YouTube URL:', url);
      return null;
    }
  };

  return (
    <section id="talks" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Conference Talks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge and insights at tech conferences worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                <div className="flex flex-col gap-4">
                  {getYouTubeId(talk.link) ? (
                    <AspectRatio 
                      ratio={16 / 9} 
                      className="mb-4 relative group cursor-pointer"
                      onMouseEnter={() => setHoveredVideo(talk.link)}
                      onMouseLeave={() => setHoveredVideo(null)}
                      onClick={() => setPlayingVideo(playingVideo === talk.link ? null : talk.link)}
                    >
                      {playingVideo === talk.link ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${getYouTubeId(talk.link)}?rel=0&modestbranding=1&controls=1&autoplay=1&mute=1`}
                          title={talk.title}
                          className="w-full h-full rounded-lg border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${getYouTubeId(talk.link)}/maxresdefault.jpg`}
                            alt={talk.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 rounded-lg flex items-center justify-center">
                            <div className="bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 rounded-full p-4 shadow-lg">
                              <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </>
                      )}
                    </AspectRatio>
                  ) : null}
                  <p className="text-muted-foreground mb-4">{talk.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">{talk.event}</span>
                    {!getYouTubeId(talk.link) && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={talk.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Watch
                        </a>
                      </Button>
                    )}
                  </div>
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