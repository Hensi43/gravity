import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { getLatestProjects } from "@/lib/github";

export default async function Home() {
    const projects = await getLatestProjects();

    return (
        <main className="flex min-h-screen flex-col">
            <Hero />

            <section id="projects" className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container relative z-10 px-4 md:px-6">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Latest Projects</h2>
                        <p className="text-white/60 max-w-xl">
                            Autonomous agents are constantly building and deploying new experiments.
                            Here are the latest repositories fetched from the network.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
