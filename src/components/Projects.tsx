
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description: "A revolutionary solution that solves real-world problems through innovative technology implementation.",
      tech: ["React", "TypeScript", "Node.js"],
      category: "Web Application"
    },
    {
      title: "Community Platform",
      description: "Platform designed to bring tech enthusiasts together and facilitate knowledge sharing.",
      tech: ["Next.js", "PostgreSQL", "Tailwind"],
      category: "Community"
    },
    {
      title: "Problem Solver Tool",
      description: "Advanced diagnostic tool that helps identify and resolve complex technical issues efficiently.",
      tech: ["Python", "FastAPI", "Docker"],
      category: "DevOps"
    },
    {
      title: "Startup MVP",
      description: "Minimum viable product for my upcoming startup, focusing on user experience and scalability.",
      tech: ["React Native", "Firebase", "GraphQL"],
      category: "Mobile"
    },
    {
      title: "Conference App",
      description: "Mobile application to enhance conference experience with networking and session management.",
      tech: ["Flutter", "AWS", "MongoDB"],
      category: "Event Management"
    },
    {
      title: "Tech Troubleshooter",
      description: "Comprehensive toolkit for diagnosing and solving various technical challenges across platforms.",
      tech: ["Vue.js", "Express", "Redis"],
      category: "Utility"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing solutions that demonstrate my passion for solving real-world problems with technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-primary font-medium">{project.category}</span>
                  <Code className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
