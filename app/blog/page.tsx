import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-black text-white py-20">
            <div className="container max-w-4xl px-4 md:px-6 mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-12">Transmission Log</h1>

                <div className="grid gap-8">
                    <Link href="/blog/future-of-agentic-development" className="group block">
                        <article className="p-8 rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-primary/50">
                            <div className="flex items-center gap-2 text-xs text-primary mb-3">
                                <span>Agentic AI</span>
                                <span>•</span>
                                <span>November 30, 2025</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                The Future of Agentic Development
                            </h2>
                            <p className="text-white/60 mb-4">
                                We are moving beyond "copilots" into an era of fully autonomous software engineers.
                                Here is what the next generation of development looks like.
                            </p>
                            <span className="text-sm font-medium text-white group-hover:underline underline-offset-4">
                                Read Transmission &rarr;
                            </span>
                        </article>
                    </Link>
                </div>
            </div>
        </main>
    );
}
