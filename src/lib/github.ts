export interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export async function getLatestProjects(): Promise<Project[]> {
    try {
        // Fetching public repos for Hensi43
        const res = await fetch(
            "https://api.github.com/users/Hensi43/repos?sort=updated&per_page=3&type=public",
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const repos = await res.json();
        return repos;
    } catch (error) {
        console.error("GitHub Fetch Error:", error);
        // Fallback data in case of rate limits or errors
        return [
            {
                id: 1,
                name: "gravity",
                description: "Autonomous self-rebuilding portfolio agent.",
                html_url: "https://github.com/Hensi43/gravity",
                homepage: "",
                topics: ["agentic-ai", "nextjs", "threejs"],
                stargazers_count: 42,
                language: "TypeScript",
                updated_at: new Date().toISOString(),
            },
            {
                id: 2,
                name: "neural-interface",
                description: "Brain-computer interface visualization dashboard.",
                html_url: "https://github.com/Hensi43/neural-interface",
                homepage: "",
                topics: ["react", "visualization", "bci"],
                stargazers_count: 28,
                language: "JavaScript",
                updated_at: new Date(Date.now() - 86400000).toISOString(),
            },
        ];
    }
}
