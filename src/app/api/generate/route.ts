import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Use gemini-flash-latest for best compatibility
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `You are a software architect and autonomous agent. 
        Your goal is to build a project based on the user's prompt.
        Return a JSON object containing a "projects" array with 3 DISTINCT variations of the idea.
        Each project in the array must have:
        - title: Creative project title
        - description: Technical description (1 sentence)
        - implementation_plan: Array of 3-5 high-level steps
        - tech_stack: Array of technologies
        - estimated_time: string (e.g. "5 minutes")
        
        Example structure:
        {
            "projects": [
                { "title": "...", ... },
                { "title": "...", ... },
                { "title": "...", ... }
            ]
        }
        
        Do not return markdown. Return PURE JSON.`;

        const result = await model.generateContent([systemPrompt, `User Idea: ${prompt}`]);
        const response = result.response;
        const text = response.text();

        // Clean markdown code blocks if present (Gemini sometimes adds them)
        const jsonStr = text.replace(/^```json\n|\n```$/g, "");
        const data = JSON.parse(jsonStr);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("AI Generation Error Details:", {
            message: error.message,
            status: error.status,
            details: error.response?.data || error
        });
        return NextResponse.json(
            { error: "Failed to process request", details: error.message },
            { status: 500 }
        );
    }
}
