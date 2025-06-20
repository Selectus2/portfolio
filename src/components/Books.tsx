
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, BookOpen } from "lucide-react";

const Books = () => {
  const books = [
    {
      title: "The Lean Startup",
      author: "Eric Ries",
      category: "Entrepreneurship",
      rating: 5,
      year: "2024",
      description: "Essential reading for anyone building a startup. Changed my perspective on product development.",
      review: "A game-changer for understanding how to build sustainable businesses through validated learning.",
      link: "#"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Improvement",
      rating: 5,
      year: "2024",
      description: "Powerful insights on building good habits and breaking bad ones.",
      review: "Practical strategies that I've applied to both personal productivity and team management.",
      link: "#"
    },
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      category: "Programming",
      rating: 5,
      year: "2023",
      description: "Timeless advice for software developers at any level.",
      review: "Still relevant after all these years. Essential for anyone serious about programming.",
      link: "#"
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      category: "Entrepreneurship",
      rating: 4,
      year: "2023",
      description: "Contrarian thinking about innovation and startup building.",
      review: "Thought-provoking ideas about creating monopolies and building the future.",
      link: "#"
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      category: "Productivity",
      rating: 5,
      year: "2023",
      description: "The ability to focus on cognitively demanding tasks.",
      review: "Transformed how I approach complex problem-solving and minimize distractions.",
      link: "#"
    },
    {
      title: "The Mythical Man-Month",
      author: "Frederick P. Brooks Jr.",
      category: "Software Engineering",
      rating: 4,
      year: "2023",
      description: "Classic insights on software project management.",
      review: "Old but gold. Essential reading for understanding why software projects fail.",
      link: "#"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="books" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Books I've Read</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Books that have shaped my thinking on technology, entrepreneurship, and personal growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{book.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-2">by {book.author}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{book.year}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {book.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {renderStars(book.rating)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{book.description}</p>
                <blockquote className="text-sm italic text-foreground mb-4 pl-4 border-l-2 border-primary/20">
                  "{book.review}"
                </blockquote>
                <Button variant="outline" size="sm" asChild>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Book
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

export default Books;
