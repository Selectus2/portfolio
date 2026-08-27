import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, ExternalLink, Users } from "lucide-react";
import { PageSection, PageHeading, SectionHeading } from "@/components/Page";
import {
  BIO_PARAGRAPHS,
  EMAIL,
  JOB_TITLE,
  LOCATION,
  NAME,
  ALTERNATE_NAME,
  PROFILE_LINKS,
} from "@/lib/profile";
import { communities } from "@/content";

export default function About() {
  return (
    <>
      <PageSection>
        <PageHeading
          title={`About ${NAME}`}
          lede={`${JOB_TITLE} based in ${LOCATION.full}.`}
        />

        {/* Verbatim approved copy from CLAUDE.md. Do not reword. */}
        <div className="max-w-3xl mx-auto space-y-5 text-lg leading-relaxed">
          {BIO_PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        {/* Rendered so the JSON-LD alternateName is visible text too — CLAUDE.md
            permits the alternate spelling in JSON-LD, and hard rule 4 requires
            anything in JSON-LD to appear on the page. */}
        <p className="max-w-3xl mx-auto mt-8 text-center text-muted-foreground">
          Also written as {ALTERNATE_NAME}.
        </p>

        <div className="max-w-3xl mx-auto mt-10 flex items-center justify-center space-x-2 text-muted-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          <span>
            {LOCATION.city}, {LOCATION.region}, {LOCATION.country}
          </span>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Communities I help run"
          lede="Organising Ruby communities in Pune and across India."
        />
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
          <Link
            className="inline-flex min-h-11 items-center text-primary underline underline-offset-4"
            to="/community/"
          >
            More about the communities
          </Link>
        </p>
      </PageSection>

      <PageSection>
        <SectionHeading title="Contact" />
        <div className="max-w-2xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{EMAIL}</p>
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:${EMAIL}`}>Send Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Find me online"
          lede="Every profile, in one place."
        />
        {/* Rendered as visible URLs so each sameAs entry in the JSON-LD also
            appears as text on this page. */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {PROFILE_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              rel="me noopener"
              target="_blank"
              className="flex items-start space-x-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors group"
            >
              <ExternalLink className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <div className="font-medium">{l.label}</div>
                <div className="text-sm text-muted-foreground break-all">
                  {l.display}
                </div>
                {l.note ? (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {l.note}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          <Link className="text-primary underline underline-offset-4" to="/ruby-on-rails/">
            Ruby on Rails work
          </Link>
          {" · "}
          <Link className="text-primary underline underline-offset-4" to="/open-source/">
            Open source
          </Link>
          {" · "}
          <Link className="text-primary underline underline-offset-4" to="/talks/">
            Talks
          </Link>
        </p>
      </PageSection>
    </>
  );
}
