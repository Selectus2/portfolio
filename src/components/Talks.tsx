import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useRef } from "react";

// Add YT type declaration for TypeScript
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Talks = () => {
  const talks = [
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
    },
    {
      title: "The Harvey Dent Dilemma: Ruby's White Knight Rises (or Falls)",
      event: "RubyConf India 2024",
      location: "Jaipur, India",
      date: "November 2024",
      description: "A deep dive into Ruby’s most powerful—and potentially risky—performance features. Topics include frozen strings, memoization, monkey patching, metaprogramming, Proc vs. Lambda, and new enhancements in Ruby 3.0. Learn how to use these advanced tools effectively while avoiding hidden dangers.",
      link: "https://www.youtube.com/watch?v=8LYHEzQL_-4"
    }
  ];

  const playerRefs = useRef({});

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    // When API is ready, initialize players
    window.onYouTubeIframeAPIReady = () => {
      talks.forEach((talk, index) => {
        if (talk.link.includes("youtube.com/watch")) {
          const id = `yt-player-${index}`;
          if (!playerRefs.current[id] && document.getElementById(id)) {
            playerRefs.current[id] = new window.YT.Player(id, {
              videoId: getYouTubeId(talk.link),
              events: {
                onReady: (event) => onPlayerReady(event, id),
              },
              playerVars: {
                rel: 0,
                modestbranding: 1,
                controls: 1,
                showinfo: 0,
                mute: 1,
              },
            });
          }
        }
      });
    };
    // If API is already loaded
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
    // Cleanup: remove script if needed (optional)
    // return () => { ... }
  }, [talks]);

  // Helper to initialize player
  const onPlayerReady = (event, id) => {
    playerRefs.current[id] = event.target;
  };

  // Helper to extract YouTube video ID
  const getYouTubeId = (url) => {
    const match = url.match(/[?&]v=([^&#]+)/);
    return match ? match[1] : null;
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
                <div className="flex flex-col gap-4">
                  {talk.link.includes("youtube.com/watch") ? (
                    <AspectRatio ratio={16 / 9} className="mb-4">
                      <div
                        id={`yt-container-${index}`}
                        onMouseEnter={async () => {
                          if (window.YT && playerRefs.current[`yt-player-${index}`]) {
                            playerRefs.current[`yt-player-${index}`].playVideo();
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.YT && playerRefs.current[`yt-player-${index}`]) {
                            playerRefs.current[`yt-player-${index}`].pauseVideo();
                          }
                        }}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <div
                          id={`yt-player-${index}`}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </AspectRatio>
                  ) : null}
                  <p className="text-muted-foreground mb-4">{talk.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">{talk.event}</span>
                    {!talk.link.includes("youtube.com/watch") && (
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
