"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

import EditWorkspaceForm from "@/components/workspace/edit-workspace-form";

function EditWorkspacePageContent() {
    const params = useParams<{
        slug: string;
    }>();

    return (
        <EditWorkspaceForm slug={params.slug} />
    );
}

export default function EditWorkspacePage() {
    return (
        <Suspense
            fallback={
                <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                    <p
                        role="status"
                        className="text-sm text-zinc-500"
                    >
                        Loading...
                    </p>
                </main>
            }
        >
            <EditWorkspacePageContent />
        </Suspense>
    );
}