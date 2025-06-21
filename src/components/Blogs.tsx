
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, BookOpen } from "lucide-react";

const Blogs = () => {
  const blogs = [
      {
        title: "A Journey of Learning and Growth",
        platform: "blog.vishwajeetsingh.in",
        date: "Estimated 2023",
        readTime: "3 min read",
        description: "Reflections on personal and professional growth through curiosity-driven learning and continuous improvement.",
        link: "https://blog.vishwajeetsingh.in/a-journey-of-learning-and-growth",
        tags: ["Learning", "Personal Growth", "Reflection"]
      },
      {
        title: "Bringing Intelligence Closer to Home: The Future of Smart Housing with Fog Computing",
        platform: "blog.vishwajeetsingh.in",
        date: "Estimated 2023",
        readTime: "3 min read",
        description: "An exploration of how fog computing can revolutionize smart homes by improving responsiveness, privacy, and energy efficiency.",
        link: "https://blog.vishwajeetsingh.in/bringing-intelligence-closer-to-home-the-future-of-smart-housing-with-fog-computing",
        tags: ["Fog Computing", "Smart Homes", "Edge AI"]
      },
      {
        title: "From Pixels to Poetry: How Generative Adversarial Networks Are Revolutionising Creative Industries",
        platform: "blog.vishwajeetsingh.in",
        date: "Estimated 2023",
        readTime: "3 min read",
        description: "A look into the creative potential of GANs in fields like design, art, and music, and their impact on the future of human–AI collaboration.",
        link: "https://blog.vishwajeetsingh.in/from-pixels-to-poetry-how-generative-adversarial-networks-are-revolutionising-creative-industries",
        tags: ["GANs", "Creativity", "AI"]
      },
      {
        title: "Unleash Rails 7 UI Development with ESBuild",
        platform: "blog.vishwajeetsingh.in",
        date: "Estimated late 2023",
        readTime: "3 min read",
        description: "A developer guide to using ESBuild with Rails 7 for efficient UI development and better frontend integration.",
        link: "https://blog.vishwajeetsingh.in/unleash-rails-7-ui-development-with-esbuild",
        tags: ["Rails 7", "ESBuild", "Frontend"]
      },
      {
        title: "Launch Like a Pro with K6",
        platform: "blog.vishwajeetsingh.in",
        date: "Estimated 2023",
        readTime: "4 min read",
        description: "A practical introduction to performance testing with K6, helping developers ensure their applications scale reliably under load.",
        link: "https://blog.vishwajeetsingh.in/launch-like-a-pro-with-k6",
        tags: ["Performance Testing", "K6", "DevOps"]
      }    
  ];

  return (
    <section id="blogs" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Blog Posts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts on technology, problem-solving, and building communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg mb-2">{blog.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{blog.platform}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{blog.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read More
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
