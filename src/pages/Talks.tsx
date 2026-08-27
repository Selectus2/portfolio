import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Play, Users } from "lucide-react";
import { PageSection, PageHeading } from "@/components/Page";
import { talks } from "@/content";
import { formatDate, formatDuration } from "@/lib/format";

export default function Talks() {
  return (
    <PageSection>
      <PageHeading
        title="Talks"
        lede="Ruby conference talks on AI, concurrency, IoT and the language itself — RubyConf India, RubyConf Australia and Conf42."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {talks.map((talk) => (
          <Card
            key={talk.slug}
            className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <CardHeader>
              <CardTitle as="h2" className="text-lg mb-2">
                <Link
                  to={`/talks/${talk.slug}/`}
                  className="inline-flex min-h-11 items-center hover:text-primary transition-colors"
                >
                  {talk.title}
                </Link>
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{talk.conference}</span>
                </span>
                {talk.date ? (
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(talk.date)}</span>
                  </span>
                ) : null}
                {talk.durationSeconds ? (
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(talk.durationSeconds)}</span>
                  </span>
                ) : null}
              </div>
              {/* CLAUDE.md: crediting Ishani Trivedi is not optional. */}
              {talk.coSpeaker ? (
                <p className="mt-2 flex items-center space-x-1 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    Co-presented with{" "}
                    <span className="font-medium">{talk.coSpeaker}</span>
                  </span>
                </p>
              ) : null}
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              {talk.abstract ? (
                <p className="text-muted-foreground mb-4">{talk.abstract}</p>
              ) : null}
              <div className="mt-auto flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/talks/${talk.slug}/`} aria-label={`Talk details for ${talk.title}`}>
                    Talk details
                  </Link>
                </Button>
                {talk.videoUrl ? (
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={talk.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch ${talk.title} on YouTube`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-12">
        More on{" "}
        <Link className="text-primary underline underline-offset-4" to="/ruby-on-rails/">
          Ruby on Rails work
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
