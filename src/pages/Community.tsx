import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mic, Users, Calendar, Handshake } from "lucide-react";
import { PageSection, PageHeading, SectionHeading, Todo } from "@/components/Page";
import { communities } from "@/content";
import { EMAIL } from "@/lib/profile";

const bySlug = (slug: string) => communities.find((c) => c.slug === slug);

export default function Community() {
  const dqor = bySlug("deccan-queen-on-rails");
  const puneRuby = bySlug("pune-ruby-meetups");
  const railsGirls = bySlug("rails-girls-pune");

  return (
    <>
      <PageSection>
        <PageHeading
          title="Community"
          lede="The Ruby communities I organise and help run, in Pune and across India."
        />

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-3" />
              <CardTitle as="h2">Deccan Queen on Rails</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                I am on the organising crew for Deccan Queen on Rails, a Rails
                conference held in Pune. The 2026 edition runs 8–11 October at
                Hyatt Regency Pune.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={dqor?.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Meet the team
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Mic className="w-8 h-8 text-primary mb-3" />
              <CardTitle as="h2">Pune Ruby meetups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                I organise the Pune Ruby meetups — regular gatherings for Ruby
                and Rails developers in the city.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={puneRuby?.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Group page
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-3" />
              <CardTitle as="h2">Rails Girls Pune</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                I organised Rails Girls Pune. The chapter listing covers the
                22 February 2025 edition.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href={railsGirls?.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Rails Girls Pune
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mb-3" />
              <CardTitle as="h2">Ruby India</CardTitle>
            </CardHeader>
            <CardContent>
              {/* CLAUDE.md: keep "helped form" unless the owner says otherwise. */}
              <p className="text-muted-foreground mb-4">
                I helped form the Ruby India community.
              </p>
              <Todo>
                A public URL for Ruby India, and whether the credit should name
                co-founders.
              </Todo>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Meetup calendar"
          lede="Upcoming Pune Ruby meetups."
        />
        <div className="max-w-2xl mx-auto space-y-4">
          <Todo>
            Luma calendar URL to embed here — send me the link and I will drop
            the calendar in.
          </Todo>
          <Todo>YouTube channel URL for the meetup recordings.</Todo>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading title="Get involved" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Mic className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle as="h2">Speak at a Pune Ruby meetup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Talks from first-time speakers are welcome. Send a rough topic
                and I will get back to you.
              </p>
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:${EMAIL}?subject=Speaking%20at%20a%20Pune%20Ruby%20meetup`}>
                  Pitch a talk
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <Handshake className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle as="h2">Host or sponsor a meetup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Got a space in Pune, or want to sponsor an evening? I would like
                to hear from you.
              </p>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={`mailto:${EMAIL}?subject=Hosting%20or%20sponsoring%20a%20Pune%20Ruby%20meetup`}>
                  Get in touch
                </a>
              </Button>
            </CardContent>
          </Card>
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
    </>
  );
}
