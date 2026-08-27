import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import { PageSection, PageHeading, Tag, Todo } from "@/components/Page";
import { articles } from "@/content";
import { formatDate } from "@/lib/format";

/**
 * Canonical index for everything published. Hashnode-hosted posts link out and
 * keep canonicalUrl pointing at the Hashnode original; the direction flips once
 * the posts move here.
 */
export default function Writing() {
  return (
    <PageSection>
      <PageHeading
        title="Writing"
        lede="Articles on Ruby, Rails and developer tooling. Posts currently live on Code Journey, my Hashnode blog."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((a) => {
          const href = a.externalUrl ?? a.canonicalUrl;
          return (
            <Card
              key={a.slug}
              className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <CardHeader>
                <CardTitle as="h2" className="text-lg mb-2">{a.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-2">
                  {href ? (
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>blog.vishwajeetsingh.in</span>
                    </span>
                  ) : null}
                  {a.date ? (
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(a.date)}</span>
                    </span>
                  ) : null}
                </div>
                {a.tags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {a.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                ) : null}
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                {a.description ? (
                  <p className="text-muted-foreground mb-4">{a.description}</p>
                ) : null}
                <div className="mt-auto">
                  {href ? (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read ${a.title}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read on Hashnode
                      </a>
                    </Button>
                  ) : (
                    <Todo>URL for “{a.title}” — the title and date are on record, the link is not.</Todo>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <Todo>
          Three further 2023 posts are known to exist on the same blog, without
          titles or URLs on record. Send them and I will add them here.
        </Todo>
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
