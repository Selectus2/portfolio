import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageSection, PageHeading } from "@/components/Page";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageSection>
      <PageHeading
        title="Page not found"
        lede="That page does not exist on this site."
      />
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/about/">About Vishwajeetsingh Desurkar</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/ruby-on-rails/">Ruby on Rails</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-8">
          Or try{" "}
          <Link className="text-primary underline underline-offset-4" to="/talks/">Talks</Link>
          {" · "}
          <Link className="text-primary underline underline-offset-4" to="/open-source/">Open source</Link>
          {" · "}
          <Link className="text-primary underline underline-offset-4" to="/community/">Community</Link>
          {" · "}
          <Link className="text-primary underline underline-offset-4" to="/writing/">Writing</Link>
        </p>
      </div>
    </PageSection>
  );
}
