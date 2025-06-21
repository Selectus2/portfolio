
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, BookOpen } from "lucide-react";

const Books = () => {
  const books = [
      {
        "title": "The Mine",
        "author": "Arnab Ray",
        "category": "Fiction – Indian",
        "rating": 3,
        "year": "2012",
        "description": "A psychological thriller exploring human greed and mystery inside a haunted mine.",
        "review": "Fast-paced but with predictable twists.",
        "link": "#"
      },
      {
        "title": "Hard Times",
        "author": "Charles Dickens",
        "category": "Fiction – Global",
        "rating": 4,
        "year": "1854",
        "description": "A social critique of utilitarianism and industrial society in Victorian England.",
        "review": "Classic Dickens—sharp, moral, and melancholic.",
        "link": "#"
      },
      {
        "title": "LVOE",
        "author": "Atticus Poetry",
        "category": "Poetry – Global",
        "rating": 4,
        "year": "2021",
        "description": "A collection of love, loss, and healing poetry by the Instagram-famous poet.",
        "review": "Modern, digestible, and emotional.",
        "link": "#"
      },
      {
        "title": "Drohaparva (Marathi Edition)",
        "author": "Ajey Zankar",
        "category": "Fiction – Marathi",
        "rating": 4,
        "year": "2016",
        "description": "Retelling of a critical part of the Mahabharata in Marathi prose.",
        "review": "Engaging narration of Indian epic with a cultural lens.",
        "link": "#"
      },
      {
        "title": "The Art of War",
        "author": "Sun Tzu",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 5,
        "year": "5th century BC",
        "description": "Ancient Chinese military treatise on strategy, power, and leadership.",
        "review": "Timeless and applicable to life and business alike.",
        "link": "#"
      },
      {
        "title": "Siddhartha",
        "author": "Hermann Hesse",
        "category": "Fiction – Global",
        "rating": 5,
        "year": "1922",
        "description": "A spiritual journey of self-discovery inspired by the life of Gautama Buddha.",
        "review": "Philosophical and poetic; a literary gem.",
        "link": "#"
      },
      {
        "title": "The Secret Of The Nagas",
        "author": "Amish Tripathi",
        "category": "Fiction – Indian",
        "rating": 4,
        "year": "2011",
        "description": "Book 2 of the Shiva Trilogy, continuing Shiva's mythological journey.",
        "review": "Action-packed with rich Indian mythology.",
        "link": "#"
      },
      {
        "title": "The Oath Of The Vayuputras",
        "author": "Amish Tripathi",
        "category": "Fiction – Indian",
        "rating": 4,
        "year": "2013",
        "description": "Final book of the Shiva Trilogy; secrets unfold and destinies are sealed.",
        "review": "Gripping but a tad lengthy; worth the closure.",
        "link": "#"
      },
      {
        "title": "Think and Grow Rich",
        "author": "Napoleon Hill",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 4,
        "year": "1937",
        "description": "One of the earliest personal development books focused on wealth and mindset.",
        "review": "Old-school but still relevant for goal-setting.",
        "link": "#"
      },
      {
        "title": "The Sage's Secret",
        "author": "Abhinav",
        "category": "Fiction – Indian",
        "rating": 3,
        "year": "2018",
        "description": "Book 1 of The Kalki Chronicles; a mix of myth and modernity.",
        "review": "Mythological fiction with good pace, if slightly cliched.",
        "link": "#"
      },
      {
        "title": "Dr. Jekyll and Mr. Hyde",
        "author": "Robert Louis Stevenson",
        "category": "Fiction – Global",
        "rating": 4,
        "year": "1886",
        "description": "A Gothic novella about dual personalities and the nature of evil.",
        "review": "A psychological classic still studied today.",
        "link": "#"
      },
      {
        "title": "The 5 AM Club",
        "author": "Robin S. Sharma",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 4,
        "year": "2018",
        "description": "Promotes early rising as a key to success with storytelling.",
        "review": "Transformative if you follow through.",
        "link": "#"
      },
      {
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 5,
        "year": "2020",
        "description": "Explains money behavior and decision-making with relatable stories.",
        "review": "Insightful, non-preachy, and very readable.",
        "link": "#"
      },
      {
        "title": "I Still Think About You",
        "author": "Arpit Vageria",
        "category": "Fiction – Indian",
        "rating": 3,
        "year": "2018",
        "description": "A story of love, longing, and heartbreak in modern India.",
        "review": "Light, emotional, and easy to relate to.",
        "link": "#"
      },
      {
        "title": "How To Stop Worrying And Start Living",
        "author": "Dale Carnegie",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 4,
        "year": "1948",
        "description": "A classic guide to managing stress and finding peace of mind.",
        "review": "Old but gold—practical advice even today.",
        "link": "#"
      },
      {
        "title": "The Richest Man In Babylon",
        "author": "George S. Clason",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 4,
        "year": "1926",
        "description": "Financial advice delivered through Babylonian parables.",
        "review": "Simple, timeless, and effective money lessons.",
        "link": "#"
      },
      {
        "title": "The Immortals Of Meluha",
        "author": "Amish Tripathi",
        "category": "Fiction – Indian",
        "rating": 4,
        "year": "2010",
        "description": "The first book in the Shiva Trilogy, reimagining Lord Shiva as a Tibetan tribal leader.",
        "review": "Unique concept and engaging storytelling.",
        "link": "#"
      },
      {
        "title": "Murder on the Orient Express",
        "author": "Agatha Christie",
        "category": "Fiction – Global",
        "rating": 5,
        "year": "1934",
        "description": "A murder mystery solved by the famous detective Hercule Poirot.",
        "review": "Masterclass in suspense and whodunit.",
        "link": "#"
      },
      {
        "title": "The Almanack of Naval Ravikant",
        "author": "Eric Jorgenson",
        "category": "Entrepreneurship",
        "rating": 5,
        "year": "2020",
        "description": "Collection of Naval’s thoughts on wealth, happiness, and decision-making.",
        "review": "Concise and deeply thought-provoking.",
        "link": "#"
      },
      {
        "title": "Before You Start Up",
        "author": "Pankaj Goyal",
        "category": "Entrepreneurship",
        "rating": 4,
        "year": "2018",
        "description": "A beginner’s manual to prepare for launching your startup.",
        "review": "Practical guide with Indian context.",
        "link": "#"
      },
      {
        "title": "Ikigai",
        "author": "Hector Garcia Puigcerver",
        "category": "Non-Fiction – Self-Improvement",
        "rating": 4,
        "year": "2016",
        "description": "A Japanese philosophy on purpose, longevity, and fulfillment.",
        "review": "Simple yet impactful insights on meaningful life.",
        "link": "#"
      },
      {
        "title": "The Lean Startup",
        "author": "Eric Ries",
        "category": "Entrepreneurship",
        "rating": 5,
        "year": "2011",
        "description": "Introduces the concept of building products using lean methodology.",
        "review": "A game-changer for modern startups.",
        "link": "#"
      },
      {
        "title": "Zero to One",
        "author": "Peter Thiel, Blake Masters",
        "category": "Entrepreneurship",
        "rating": 5,
        "year": "2014",
        "description": "Focuses on building unique businesses that create new value.",
        "review": "Philosophical yet practical startup thinking.",
        "link": "#"
      },
      {
        "title": "The Marketing Gita",
        "author": "Prateek Maheshwari, Sagar Venkateshwar",
        "category": "Entrepreneurship",
        "rating": 3,
        "year": "2023",
        "description": "Applies ancient Hindu philosophy to modern marketing practices.",
        "review": "Interesting concept; works for fans of spiritual analogies.",
        "link": "#"
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
                {/* <Button variant="outline" size="sm" asChild>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Book
                  </a>
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;
