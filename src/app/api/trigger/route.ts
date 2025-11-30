import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        // Generate a unique session ID for this rebuild cycle
        const sessionId = `rebuild-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        console.log(`Control Center Session Created: ${sessionId}`);

        return NextResponse.json({
            status: "control-center-ready",
            session: sessionId
        }, { status: 200 });

    } catch (error) {
        console.error("Trigger error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
