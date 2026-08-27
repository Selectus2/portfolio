import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Calendar,
  Code2,
  ExternalLink,
  Gem as GemIcon,
  Mail,
  MapPin,
  Mic,
  Play,
  Podcast as PodcastIcon,
  BookOpen,
  Star,
  Users,
} from "lucide-react";
import { PageSection, SectionHeading, Tag } from "@/components/Page";
import { scrollToSection } from "@/lib/scroll";
import {
  articles,
  communities,
  gems,
  latestArticle,
  latestGem,
  talks,
  books,
  podcasts,
} from "@/content";
import { formatDate, formatDuration } from "@/lib/format";
import {
  BIO_PARAGRAPHS,
  EMAIL,
  JOB_TITLE,
  LOCATION,
  NAME,
  ONE_LINE_BIO,
  PROFILE_LINKS,
} from "@/lib/profile";

/** Sends the reader to the full page for a section. */
function MoreLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <p className="text-center mt-10">
      <Button variant="outline" asChild>
        <Link to={to}>
          {children}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </p>
  );
}

/** Hero buttons scroll to a section rather than leaving the page. The href is
 *  kept so the anchor still works if the handler never runs. */
const handleScroll = (id: string) => (e: React.MouseEvent) => {
  if (scrollToSection(id)) e.preventDefault();
};

export default function Home() {
  const article = latestArticle();
  const gem = latestGem();

  return (
    <>
      {/* ---------------------------------------------------------- hero --- */}
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/hero.webp" type="image/webp" />
            <img
              src="/hero.jpg"
              alt=""
              aria-hidden="true"
              width={1000}
              height={562}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-black/55 dark:bg-black/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
          <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {NAME}
          </h1>
          <p className="mb-8 text-xl text-gray-200 md:text-2xl">
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                {JOB_TITLE}
              </span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400 to-purple-400" />
            </span>
            <span className="mt-3 block text-lg text-gray-300">
              {LOCATION.full}
            </span>
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            {ONE_LINE_BIO}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white px-8 py-6 text-lg text-black hover:bg-gray-200 dark:bg-gray-100 dark:text-black dark:hover:bg-white"
              asChild
            >
              <a href="#ruby-on-rails" onClick={handleScroll("ruby-on-rails")}>
                Explore My Work
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white px-8 py-6 text-lg text-white hover:bg-white hover:text-black"
              asChild
            >
              <a href="#about" onClick={handleScroll("about")}>
                Connect
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- ruby on rails --- */}
      <PageSection id="ruby-on-rails" muted>
        <SectionHeading
          title="Ruby on Rails"
          lede={`${NAME} is a Ruby on Rails engineer based in ${LOCATION.full}.`}
        />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {[
            {
              icon: Code2,
              title: "Ruby on Rails",
              body: "Building and maintaining Rails applications.",
            },
            {
              icon: Brain,
              title: "Machine-learning tooling",
              body: "Bringing model training into Ruby with trainers-rb.",
            },
            {
              icon: GemIcon,
              title: "Cloud architecture",
              body: "Designing the infrastructure Rails apps run on.",
            },
          ].map((c) => (
            <Card
              key={c.title}
              className="text-center transition-shadow duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center text-primary">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
                <p className="text-muted-foreground">{c.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <MoreLink to="/ruby-on-rails/">The full Ruby on Rails page</MoreLink>
      </PageSection>

      {/* ------------------------------------------------------ open source --- */}
      <PageSection id="open-source">
        <SectionHeading
          title="Open Source"
          lede="MIT-licensed Ruby libraries on RubyGems. Both framework-agnostic — neither is a Rails engine."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {gems.map((g) => (
            <Card
              key={g.slug}
              className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <CardTitle className="flex items-center gap-2 font-mono text-xl">
                    <GemIcon className="h-5 w-5 text-primary" />
                    {g.name}
                  </CardTitle>
                  <span className="text-muted-foreground">v{g.version}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag>{g.licence}</Tag>
                  <Tag>Ruby {g.rubyVersion}</Tag>
                  {g.status === "early" ? <Tag>Early — 0.1.x</Tag> : null}
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-4 text-muted-foreground">{g.summary}</p>
                <p className="mt-auto flex items-center space-x-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Released {formatDate(g.releaseDate)}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <MoreLink to="/open-source/">All gems and the roadmap</MoreLink>
      </PageSection>

      {/* ----------------------------------------------------------- talks --- */}
      <PageSection id="talks" muted>
        <SectionHeading
          title="Talks"
          lede="Ruby conference talks at RubyConf India, RubyConf Australia and Conf42."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {talks.slice(0, 4).map((t) => (
            <Card
              key={t.slug}
              className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="mb-2 text-lg">
                  <Link
                    to={`/talks/${t.slug}/`}
                    className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                  >
                    {t.title}
                  </Link>
                </CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{t.conference}</span>
                  </span>
                  {t.date ? (
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(t.date)}</span>
                    </span>
                  ) : null}
                  {t.durationSeconds ? (
                    <span>{formatDuration(t.durationSeconds)}</span>
                  ) : null}
                </div>
                {/* CLAUDE.md: crediting Ishani Trivedi is not optional. */}
                {t.coSpeaker ? (
                  <p className="mt-2 flex items-center space-x-1 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>
                      Co-presented with{" "}
                      <span className="font-medium">{t.coSpeaker}</span>
                    </span>
                  </p>
                ) : null}
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                {t.abstract ? (
                  <p className="mb-4 line-clamp-4 text-muted-foreground">
                    {t.abstract}
                  </p>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/talks/${t.slug}/`}>Details</Link>
                  </Button>
                  {t.videoUrl ? (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={t.videoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="mr-2 h-4 w-4" />
                        Watch
                      </a>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <MoreLink to="/talks/">All {talks.length} talks</MoreLink>
      </PageSection>

      {/* ------------------------------------------------------- community --- */}
      <PageSection id="community">
        <SectionHeading
          title="Community"
          lede="The Ruby communities I organise and help run, in Pune and across India."
        />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {communities.map((c) => (
            <div
              key={c.slug}
              className="flex items-start space-x-3 rounded-lg bg-muted/40 p-4"
            >
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
        <MoreLink to="/community/">
          Speak at, host or sponsor a meetup
        </MoreLink>
      </PageSection>

      {/* --------------------------------------------------------- writing --- */}
      <PageSection id="writing" muted>
        <SectionHeading
          title="Writing"
          lede="Articles on Ruby, Rails and developer tooling."
        />
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {articles.map((a) => {
            const href = a.externalUrl ?? a.canonicalUrl;
            return (
              <Card
                key={a.slug}
                className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="mb-2 text-lg">{a.title}</CardTitle>
                  {a.date ? (
                    <p className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(a.date)}</span>
                    </p>
                  ) : null}
                  {a.tags.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>
                <CardContent className="mt-auto">
                  {href ? (
                    <Button variant="outline" size="sm" asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read More
                      </a>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 md:grid-cols-2">
          {article ? (
            <Card>
              <CardContent className="p-6">
                <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Latest article
                </p>
                <a
                  className="inline-flex min-h-11 items-center text-lg font-semibold transition-colors hover:text-primary"
                  href={article.externalUrl ?? article.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {formatDate(article.date!)}
                </p>
              </CardContent>
            </Card>
          ) : null}
          <Card>
            <CardContent className="p-6">
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Latest gem release
              </p>
              <Link
                className="inline-flex min-h-11 items-center font-mono text-lg font-semibold transition-colors hover:text-primary"
                to="/open-source/"
              >
                {gem.name} v{gem.version}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatDate(gem.releaseDate)}
              </p>
            </CardContent>
          </Card>
        </div>

        <MoreLink to="/writing/">Everything I have published</MoreLink>
      </PageSection>

      {/* -------------------------------------------------------- podcasts --- */}
      <PageSection id="podcasts">
        <SectionHeading
          title="Podcasts"
          lede="Conversations about Ruby, Rails and applying AI inside Rails applications."
        />
        <div className="mx-auto grid max-w-4xl gap-8">
          {podcasts.map((p) => (
            <Card
              key={p.slug}
              className="transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle as="h3" className="mb-2 text-lg">
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
                    <span>{formatDuration(p.durationSeconds)}</span>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  {p.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <MoreLink to="/podcasts/">Listen to the conversation</MoreLink>
      </PageSection>

      {/* ----------------------------------------------------------- books --- */}
      <PageSection id="books" muted>
        <SectionHeading
          title="Books"
          lede={`${books.length} books read and rated — fiction, poetry, mythology and business, in English and Marathi.`}
        />
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 6).map((b) => (
            <Card
              key={b.slug}
              className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle as="h3" className="mb-1 text-base">
                  {b.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {b.author} · {b.year}
                </p>
                <span
                  role="img"
                  className="mt-2 flex items-center gap-0.5"
                  aria-label={`Rated ${b.rating} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      aria-hidden="true"
                      className={
                        n <= b.rating
                          ? "h-4 w-4 fill-primary text-primary"
                          : "h-4 w-4 text-muted-foreground/40"
                      }
                    />
                  ))}
                </span>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mt-auto flex items-start gap-2 text-sm">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="italic">{b.review}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <MoreLink to="/books/">All {books.length} books</MoreLink>
      </PageSection>

      {/* ----------------------------------------------------------- about --- */}
      <PageSection id="about">
        <SectionHeading title="About" />
        {/* Verbatim approved copy from CLAUDE.md. Do not reword. */}
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed">
          {BIO_PARAGRAPHS.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center space-x-2 text-muted-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          <span>{LOCATION.full}</span>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <Card className="text-center transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
              <CardTitle>Get in touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{EMAIL}</p>
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:${EMAIL}`}>Send Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {PROFILE_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              rel="me noopener"
              target="_blank"
              className="group flex items-start space-x-3 rounded-lg bg-muted/40 p-4 transition-colors hover:bg-accent"
            >
              <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-110" />
              <div className="min-w-0">
                <div className="font-medium">{l.label}</div>
                <div className="break-all text-sm text-muted-foreground">
                  {l.display}
                </div>
              </div>
            </a>
          ))}
        </div>

        <MoreLink to="/about/">Full profile</MoreLink>
      </PageSection>
    </>
  );
}
