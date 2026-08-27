import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, BookOpen } from "lucide-react";
import { PageSection, PageHeading, Tag } from "@/components/Page";
import { books } from "@/content";

/** Rating out of five. The number is in the label so it does not depend on
 *  reading the star shapes. */
export function Rating({ value }: { value: number }) {
  return (
    <span
      role="img"
      className="flex items-center gap-0.5"
      aria-label={`Rated ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={
            n <= value
              ? "h-4 w-4 fill-primary text-primary"
              : "h-4 w-4 text-muted-foreground/40"
          }
        />
      ))}
    </span>
  );
}

export default function Books() {
  const categories = [...new Set(books.map((b) => b.category))];

  return (
    <PageSection>
      <PageHeading
        title="Books"
        lede={`${books.length} books I have read and rated — fiction, poetry, mythology and business, in English and Marathi.`}
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <Card
            key={b.slug}
            className="flex flex-col transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle as="h2" className="mb-1 text-lg">
                {b.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {b.author} · {b.year}
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <Rating value={b.rating} />
                <Tag>{b.category}</Tag>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="mb-3 text-muted-foreground">{b.description}</p>
              <p className="mt-auto flex items-start gap-2 text-sm">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="italic">{b.review}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-12 text-center text-muted-foreground">
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
