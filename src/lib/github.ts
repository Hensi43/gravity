import { GitHubRepo } from "./types";

export interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string | null;
    topics: string[];
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export async function getLatestProjects(): Promise<Project[]> {
    try {
        const headers: HeadersInit = {
            "Accept": "application/vnd.github.v3+json",
        };

        if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const res = await fetch(
            "https://api.github.com/users/Hensi43/repos?sort=updated&per_page=6&type=public",
            {
                headers,
                next: { revalidate: 60 } // Cache for 1 minute for freshness
            }
        );

        if (!res.ok) {
            console.warn(`GitHub API Error: ${res.status} ${res.statusText}`);
            throw new Error("Failed to fetch projects");
        }

        const repos: GitHubRepo[] = await res.json();

        // Map GitHub API response to our Project interface
        return repos.map((repo) => ({
            id: repo.id,
            name: repo.name, // Use snake_case or kebab-case name as title if display name not available
            description: repo.description || "No description provided.",
            html_url: repo.html_url,
            homepage: repo.homepage || "",
            topics: repo.topics || [],
            stargazers_count: repo.stargazers_count,
            language: repo.language || "Unknown",
            updated_at: repo.updated_at,
        }));

    } catch (error) {
        console.error("GitHub Fetch Error:", error);
        // Fallback data
        return [
            {
                id: 1,
                name: "gravity",
                description: "[OFFLINE MODE] Autonomous self-rebuilding portfolio agent.",
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
                description: "[OFFLINE MODE] Brain-computer interface visualization dashboard.",
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
