import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar, Scale, Gem as GemIcon } from "lucide-react";
import { PageSection, PageHeading, SectionHeading, Tag, Todo } from "@/components/Page";
import { gems } from "@/content";
import { formatDate } from "@/lib/format";

export default function OpenSource() {
  return (
    <>
      <PageSection>
        <PageHeading
          title="Open Source"
          lede="MIT-licensed Ruby libraries published on RubyGems."
        />

        {/* Hard rule 2: neither gem is a Rails engine. Stated plainly. */}
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Both libraries are <strong>framework-agnostic</strong> — neither is a
          Rails engine. They work with Rails, Sinatra, or plain Ruby.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {gems.map((gem) => (
            <Card
              key={gem.slug}
              className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <CardTitle as="h2" className="font-mono text-xl flex items-center gap-2">
                    <GemIcon className="w-5 h-5 text-primary" />
                    {gem.name}
                  </CardTitle>
                  <span className="text-muted-foreground">v{gem.version}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag>{gem.licence}</Tag>
                  <Tag>Ruby {gem.rubyVersion}</Tag>
                  {gem.status === "early" ? <Tag>Early — 0.1.x</Tag> : null}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-1">
                <p className="text-muted-foreground mb-4">{gem.summary}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Released {formatDate(gem.releaseDate)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Scale className="w-4 h-4" />
                    <span>{gem.licence}</span>
                  </span>
                </div>

                <pre className="overflow-x-auto rounded-lg bg-muted px-4 py-3 text-sm mb-4">
                  <code>gem install {gem.name}</code>
                </pre>

                <div className="mt-auto flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={gem.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${gem.name} source on GitHub`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={gem.rubygemsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${gem.name} on RubyGems`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      RubyGems
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading title="Roadmap" />
        <div className="max-w-2xl mx-auto">
          <Todo>
            Public roadmap text — you said you would paste this in. Drop it here
            and I will render it.
          </Todo>
        </div>
      </PageSection>

      <PageSection>
        <p className="text-center text-muted-foreground">
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
    </>
  );
}
