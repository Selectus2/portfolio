
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter, MessageSquare, Calendar } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "#", // User will add later
      description: "Professional network"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "#", // User will add later
      description: "Code repositories"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "#", // User will add later
      description: "Tech thoughts & updates"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Discord",
      href: "#", // User will add later
      description: "Community discussions"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you need help solving a tech challenge, want to discuss startup ideas, 
            or just grab a coffee and talk about sports - I'm always excited to connect!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <CardTitle>Direct Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Ready to solve your next tech challenge or discuss collaboration opportunities?
                </p>
                <Button size="lg" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
                <CardTitle>Schedule a Meeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Book a time to discuss your project, attend a meetup, or just have a chat.
                </p>
                <Button variant="outline" size="lg" className="w-full">
                  Book Meeting
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6">Find Me Online</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center space-x-3 p-4 rounded-lg bg-background hover:bg-accent transition-colors group"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{link.label}</div>
                    <div className="text-sm text-muted-foreground">{link.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              <strong>Current Status:</strong> Open to collaborations and startup opportunities
            </p>
            <p>
              <strong>Response Time:</strong> Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
