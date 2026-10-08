import type { ReactNode } from "react";

type EmptyStateProps = {
    title: string;
    description?: string;
    action?: ReactNode;
};

export function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/60 px-6 py-12 text-center sm:px-8">
            <h2 className="text-base font-semibold tracking-[-0.01em] text-zinc-950">
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6 flex justify-center">
                    {action}
                </div>
            )}
        </div>
    );
}