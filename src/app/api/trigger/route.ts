import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Determine the base URL. In production, this should be the actual domain.
        // For local development, we assume localhost:3000 (or the port it's running on).
        // We use the request URL to get the origin.
        const url = new URL(request.url);
        const origin = url.origin;

        // Forward the request to the secure webhook
        const webhookUrl = `${origin}/api/antigravity-webhook`;

        console.log(`Forwarding trigger to: ${webhookUrl}`);

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // The secret token required by the webhook
                "x-secret-token": "gravity2026secret",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: `Webhook failed: ${errorText}` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Trigger forwarding error:", error);
        return NextResponse.json(
            { error: "Internal Server Error during forwarding" },
            { status: 500 }
        );
    }
}
