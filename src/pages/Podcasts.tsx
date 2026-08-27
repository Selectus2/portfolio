import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Podcast as PodcastIcon, Clock, Calendar, ExternalLink } from "lucide-react";
import { PageSection, PageHeading } from "@/components/Page";
import { podcasts } from "@/content";
import { formatDate, formatDuration, youtubeEmbedUrl } from "@/lib/format";

export default function Podcasts() {
  return (
    <PageSection>
      <PageHeading
        title="Podcasts"
        lede="Conversations about Ruby, Rails and applying AI inside Rails applications."
      />

      <div className="mx-auto grid max-w-4xl gap-8">
        {podcasts.map((p) => {
          const embed = p.videoUrl ? youtubeEmbedUrl(p.videoUrl) : null;
          return (
            <Card key={p.slug} className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle as="h2" className="mb-2 text-lg">
                  {p.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <PodcastIcon className="h-4 w-4" />
                    <span>{p.show}</span>
                  </span>
                  {p.date ? (
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(p.date)}</span>
                    </span>
                  ) : null}
                  {p.durationSeconds ? (
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(p.durationSeconds)}</span>
                    </span>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                {embed ? (
                  <div className="mb-4 overflow-hidden rounded-lg border border-border">
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        className="h-full w-full"
                        src={embed}
                        title={`${p.title} — ${p.show}`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </AspectRatio>
                  </div>
                ) : null}
                <p className="mb-4 text-muted-foreground">{p.description}</p>
                {p.videoUrl ? (
                  <Button variant="outline" size="sm" asChild>
                    <a href={p.videoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Watch the conversation
                    </a>
                  </Button>
                ) : null}
                {p.audioUrl ? (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={p.audioUrl} target="_blank" rel="noopener noreferrer">
                      Listen
                    </a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="mt-12 text-center text-muted-foreground">
        More on{" "}
        <Link className="text-primary underline underline-offset-4" to="/talks/">
          conference talks
        </Link>{" "}
        and{" "}
        <Link className="text-primary underline underline-offset-4" to="/about/">
          about me
        </Link>
        .
      </p>
    </PageSection>
  );
}
