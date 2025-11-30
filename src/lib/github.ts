export interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    stargazers_count: number;
    updated_at: string;
}

export async function getLatestProjects(): Promise<Project[]> {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
        {
            id: 1,
            name: "gravity-agent",
            description: "Autonomous agent framework for self-rebuilding portfolios.",
            html_url: "https://github.com/example/gravity-agent",
            homepage: "https://gravity.example.com",
            topics: ["ai", "agent", "nextjs", "typescript"],
            stargazers_count: 128,
            updated_at: new Date().toISOString(),
        },
        {
            id: 2,
            name: "neural-ui",
            description: "A React component library for neural interfaces.",
            html_url: "https://github.com/example/neural-ui",
            homepage: "https://neural-ui.example.com",
            topics: ["react", "ui", "cyberpunk"],
            stargazers_count: 89,
            updated_at: new Date(Date.now() - 86400000).toISOString(),
        },
    ];
}
