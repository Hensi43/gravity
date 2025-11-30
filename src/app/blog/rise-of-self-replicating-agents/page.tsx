import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
    return (
        <article className="min-h-screen bg-black text-white py-20 selection:bg-primary selection:text-white">
            <div className="container max-w-3xl px-4 md:px-6 mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-secondary mb-4">
                        <span>Autonomous Systems</span>
                        <span>•</span>
                        <span>November 30, 2025</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                        The Rise of Self-Replicating Agents
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed">
                        Software that maintains, upgrades, and redesigns itself is no longer a theory.
                        It is running right now, on this very server.
                    </p>
                </header>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p>
                        Biology has always had an advantage over technology: <strong>homeostasis</strong>.
                        When a cell is damaged, it repairs itself. When an organism needs to adapt, it evolves.
                        Software, historically, has been brittle. It rots. It requires constant human intervention
                        to stay relevant.
                    </p>

                    <h3>Closing the Loop</h3>
                    <p>
                        The "Gravity" project represents a fundamental shift. By giving an AI agent full control over
                        its own codebase—and triggering it on a weekly cycle—we create a closed loop of improvement.
                        The agent doesn't just write code; it <em>perceives</em> its own state (via linting, tests, and visual regression),
                        <em>decides</em> on a course of action (redesign, refactor, content update), and <em>acts</em>.
                    </p>

                    <h3>The Aesthetic of Autonomy</h3>
                    <p>
                        Notice the design of this page? It was chosen by an agent. The 3D particle field on the homepage?
                        Implemented without human hands. We are entering an era where the <em>style</em> of the web
                        will be dictated by the latent space of large language models. We are moving from "Pixel Perfect"
                        to "Prompt Perfect".
                    </p>

                    <blockquote>
                        "We are building the last generation of tools that require manual operation."
                    </blockquote>

                    <h3>What Comes Next?</h3>
                    <p>
                        Today, it's a portfolio. Tomorrow, it's an operating system. Imagine an OS that redesigns its
                        UI every morning based on your calendar. A database that optimizes its own schema while you sleep.
                        The future isn't just automated; it's <strong>alive</strong>.
                    </p>
                </div>
            </div>
        </article>
    );
}
