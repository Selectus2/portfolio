import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, Clock } from "lucide-react";
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

const Podcasts = () => {
  const podcasts = [
    {
      title: "Vishwajeetsingh Shares His Vision and Experience with AI in Ruby on Rails",
      show: "RubyConf 2024 Rewind",
      duration: "9 min",
      date: "Nov 2024",
      description: "During the conversation, Vishwajeetsingh Desurkar spills the beans on how AI-driven tools could streamline development workflows, enhance application performance, and enable smarter decision-making within Rails applications.He has also highlighted emerging libraries and frameworks that bring AI capabilities directly into Ruby ecosystems, making it easier for developers to adopt these cutting-edge technologies.",
      link: "https://www.youtube.com/watch?v=wDtfXBZ61ig&t=25s"
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
      podcasts.forEach((podcast, index) => {
        if (podcast.link.includes("youtube.com/watch")) {
          const id = `yt-podcast-player-${index}`;
          if (!playerRefs.current[id] && document.getElementById(id)) {
            playerRefs.current[id] = new window.YT.Player(id, {
              videoId: getYouTubeId(podcast.link),
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
  }, [podcasts]);

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
                <div className="flex flex-col gap-4">
                  {podcast.link.includes("youtube.com/watch") ? (
                    <AspectRatio ratio={16 / 9} className="mb-4">
                      <div
                        id={`yt-podcast-container-${index}`}
                        onMouseEnter={async () => {
                          if (window.YT && playerRefs.current[`yt-podcast-player-${index}`]) {
                            playerRefs.current[`yt-podcast-player-${index}`].playVideo();
                          }
                        }}
                        onMouseLeave={() => {
                          if (window.YT && playerRefs.current[`yt-podcast-player-${index}`]) {
                            playerRefs.current[`yt-podcast-player-${index}`].pauseVideo();
                          }
                        }}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <div
                          id={`yt-podcast-player-${index}`}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </AspectRatio>
                  ) : null}
                  <p className="text-muted-foreground mb-4">{podcast.description}</p>
                  {!podcast.link.includes("youtube.com/watch") && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Listen
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Podcasts;
