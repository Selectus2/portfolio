import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Gem as GemIcon,
  Mic,
  PenTool,
  Users,
  Brain,
  Mail,
} from "lucide-react";
import { PageSection, PageHeading, SectionHeading, Todo } from "@/components/Page";
import { articles, communities, gems, talks } from "@/content";
import { formatDate, formatDuration } from "@/lib/format";
import { DISPLAY_NAME, EMAIL, LOCATION, NAME } from "@/lib/profile";

/**
 * Pillar page. Target reader: someone searching
 * "Vishwajeetsingh Desurkar Pune Ruby on Rails".
 */
export default function RubyOnRails() {
  const railsArticles = articles.filter((a) => a.tags.includes("Rails"));

  return (
    <>
      <PageSection>
        <PageHeading
          title="Ruby on Rails"
          lede={`${DISPLAY_NAME} — ${NAME} — is a Ruby on Rails engineer based in ${LOCATION.full}. Everything Ruby and Rails in one place: the gems, the conference talks, the writing, and the communities.`}
        />

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <Code2 className="w-8 h-8 text-primary mb-3" />
              <CardTitle as="h2">What I work on</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                I work across Ruby on Rails, machine-learning tooling, and cloud
                architecture.
              </p>
              <Todo>
                A fuller description of current Rails work — the kind of systems,
                the problems, the scale. Only the one-line version is on record.
              </Todo>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Ruby gems I maintain"
          lede="Both MIT-licensed and framework-agnostic — neither is a Rails engine."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {gems.map((gem) => (
            <Card key={gem.slug} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-mono text-lg flex items-center gap-2">
                  <GemIcon className="w-5 h-5 text-primary" />
                  {gem.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  v{gem.version} · {gem.licence} · Ruby {gem.rubyVersion} ·
                  released {formatDate(gem.releaseDate)}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{gem.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" to="/open-source/">
            Full detail on the open-source page
          </Link>
        </p>
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Rails writing"
          lede="Articles on Rails and the tooling around it."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {railsArticles.map((a) => (
            <div
              key={a.slug}
              className="flex items-start space-x-3 p-4 rounded-lg bg-muted/40"
            >
              <PenTool className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <a
                  className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
                  href={a.externalUrl ?? a.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.title}
                </a>
                {a.date ? (
                  <div className="text-sm text-muted-foreground">
                    {formatDate(a.date)}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <p className="text-center pt-4">
            <Link className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" to="/writing/">
              Everything I have published
            </Link>
          </p>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Ruby conference talks"
          lede="RubyConf India, RubyConf Australia and Conf42."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {talks.map((t) => (
            <div
              key={t.slug}
              className="flex items-start space-x-3 p-4 rounded-lg bg-background"
            >
              <Mic className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <Link
                  className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
                  to={`/talks/${t.slug}/`}
                >
                  {t.title}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {t.conference}
                  {t.date ? ` · ${formatDate(t.date)}` : ""}
                  {t.durationSeconds
                    ? ` · ${formatDuration(t.durationSeconds)}`
                    : ""}
                </div>
                {t.coSpeaker ? (
                  <div className="text-sm">
                    Co-presented with{" "}
                    <span className="font-medium">{t.coSpeaker}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          title="Ruby and machine learning"
          lede="Bringing model training into Ruby rather than shelling out to Python."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          <Card>
            <CardHeader>
              <Brain className="w-8 h-8 text-primary mb-3" />
              <CardTitle>trainers-rb</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                A Ruby library for fine-tuning HuggingFace transformer models —
                training loop, LoRA, LR scheduling, callbacks and safetensors
                serialization, built on torch-rb and transformers-rb. It is
                early, at 0.1.x.
              </p>
              <p className="text-muted-foreground">
                Three of my conference talks cover this ground: “What If… Ruby
                Led the AI Revolution?” at RubyConf India 2025, and “Connecting
                the Dots: Unleash the magic of AI in IoT” at both RubyConf India
                2023 and Conf42 Internet of Things.
              </p>
              <Todo>
                Any applied Rails-plus-ML project work you want represented here.
              </Todo>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading title="Communities" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {communities.map((c) => (
            <div
              key={c.slug}
              className="flex items-start space-x-3 p-4 rounded-lg bg-background"
            >
              <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" to="/community/">
            More about the communities
          </Link>
        </p>
      </PageSection>

      <PageSection>
        <SectionHeading title="How to reach me" />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle>Get in touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{EMAIL}</p>
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:${EMAIL}`}>Send Email</a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Every profile link is on{" "}
                <Link className="text-primary underline underline-offset-4" to="/about/">
                  the about page
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </PageSection>
    </>
  );
}
