import { NextRequest, NextResponse } from 'next/server';
import { AIProject } from '@/lib/types';
import { generateCode } from '@/lib/codegen';

export async function POST(req: NextRequest) {
    try {
        const token = process.env.VERCEL_TOKEN;

        if (!token) {
            return NextResponse.json(
                { error: 'Configuration Error: VERCEL_TOKEN is missing from server environment.' },
                { status: 401 }
            );
        }

        const project: AIProject = await req.json();

        // 1. Generate Code
        const files = generateCode(project);
        const projectName = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 50); // Vercel has name limits

        // 2. Deploy to Vercel
        // API Reference: https://vercel.com/docs/rest-api/endpoints/deployments#create-a-new-deployment
        const response = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                files: files.map(f => ({
                    file: f.path,
                    data: f.content
                })),
                target: 'production',
                projectSettings: {
                    framework: 'nextjs'
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Vercel Deployment Error:', error);
            // Return more user-friendly error
            return NextResponse.json(
                { error: error?.error?.message || 'Failed to trigger deployment on Vercel.' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const deploymentUrl = `https://${data.url}`;

        return NextResponse.json({
            success: true,
            url: deploymentUrl,
            inspectorUrl: data.inspectorUrl
        });

    } catch (error) {
        console.error('Deployment Route Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error during deployment.' },
            { status: 500 }
        );
    }
}
