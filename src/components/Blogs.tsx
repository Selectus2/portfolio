
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, BookOpen } from "lucide-react";

const Blogs = () => {
  const blogs = [
    {
      title: "The Psychology of Technical Problem Solving",
      platform: "Medium",
      date: "March 2024",
      readTime: "8 min read",
      description: "Exploring the mental frameworks that make some people naturally better at solving complex technical issues.",
      link: "#",
      tags: ["Problem Solving", "Psychology", "Tech"]
    },
    {
      title: "Building a Startup While Working Full-Time",
      platform: "Dev.to",
      date: "February 2024", 
      readTime: "12 min read",
      description: "Practical strategies for balancing entrepreneurial ambitions with a demanding tech career.",
      link: "#",
      tags: ["Startup", "Entrepreneurship", "Career"]
    },
    {
      title: "Why Tech Communities Matter More Than Ever",
      platform: "Hashnode",
      date: "January 2024",
      readTime: "6 min read",
      description: "The role of meetups and conferences in personal growth and industry advancement.",
      link: "#",
      tags: ["Community", "Networking", "Growth"]
    },
    {
      title: "Advanced Debugging: When Stack Overflow Fails",
      platform: "Medium",
      date: "December 2023",
      readTime: "15 min read",
      description: "A systematic approach to solving those impossible bugs that make you the last resort.",
      link: "#",
      tags: ["Debugging", "Programming", "Troubleshooting"]
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
