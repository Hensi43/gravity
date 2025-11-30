import { ControlPanel } from "@/components/ControlPanel";

export default function ControlCenterPage({ params }: { params: { session: string } }) {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <ControlPanel session={params.session} />
        </main>
    );
}
