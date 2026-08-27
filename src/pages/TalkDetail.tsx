import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { PageSection, PageHeading, Todo } from "@/components/Page";
import type { Talk } from "@/content";
import { formatDate, formatDuration, youtubeEmbedUrl } from "@/lib/format";

export default function TalkDetail({ talk }: { talk: Talk }) {
  const embed = talk.videoUrl ? youtubeEmbedUrl(talk.videoUrl) : null;

  return (
    <>
      <PageSection>
        <PageHeading title={talk.title} />

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground mb-8">
            <span className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>
                {talk.conference}
                {talk.location ? ` — ${talk.location}` : ""}
              </span>
            </span>
            {talk.date ? (
              <span className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(talk.date)}</span>
              </span>
            ) : null}
            {talk.durationSeconds ? (
              <span className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(talk.durationSeconds)}</span>
              </span>
            ) : null}
          </div>

          {/* CLAUDE.md: crediting Ishani Trivedi is not optional. */}
          {talk.coSpeaker ? (
            <Card className="mb-8">
              <CardContent className="p-6 flex items-center space-x-3">
                <Users className="w-6 h-6 text-primary shrink-0" />
                <p className="text-lg">
                  Co-presented with{" "}
                  <span className="font-semibold">{talk.coSpeaker}</span>.
                </p>
              </CardContent>
            </Card>
          ) : null}

          {embed ? (
            <div className="overflow-hidden rounded-lg border border-border mb-8">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  className="h-full w-full"
                  src={embed}
                  title={`${talk.title} — ${talk.conference}`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </AspectRatio>
            </div>
          ) : null}

          {talk.abstract ? (
            <>
              <h2 className="text-2xl font-bold mb-4">About this talk</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {talk.abstract}
              </p>
            </>
          ) : (
            <div className="mb-8">
              <Todo>Abstract for “{talk.title}”.</Todo>
            </div>
          )}

          {!talk.date || talk.date.length === 7 ? (
            <div className="mb-8">
              <Todo>
                Exact day for this talk — only the month is on record.
              </Todo>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {talk.videoUrl ? (
              <Button asChild>
                <a href={talk.videoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            ) : null}
            {talk.slidesUrl ? (
              <Button variant="outline" asChild>
                <a href={talk.slidesUrl} target="_blank" rel="noopener noreferrer">
                  Slides
                </a>
              </Button>
            ) : null}
            <Button variant="outline" asChild>
              <Link to="/talks/">All talks</Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-12">
            <Link className="text-primary underline underline-offset-4" to="/ruby-on-rails/">
              Ruby on Rails work
            </Link>
            {" · "}
            <Link className="text-primary underline underline-offset-4" to="/about/">
              About Vishwajeetsingh Desurkar
            </Link>
          </p>
        </div>
      </PageSection>
    </>
  );
}
