"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

import WorkspaceContent from "@/components/workspace/workspace-content";

function WorkspacePageContent() {
    const params = useParams<{ slug: string }>();

    return <WorkspaceContent slug={params.slug} />;
}

export default function WorkspacePage() {
    return (
        <Suspense
            fallback={
                <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                    <p
                        role="status"
                        className="text-sm text-zinc-500"
                    >
                        Loading workspace...
                    </p>
                </main>
            }
        >
            <WorkspacePageContent />
        </Suspense>
    );
}