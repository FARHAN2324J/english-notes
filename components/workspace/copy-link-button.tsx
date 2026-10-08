"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
    slug: string;
};

export function CopyLinkButton({
    slug,
}: CopyLinkButtonProps) {
    const [copied, setCopied] = useState(false);
    const [error, setError] =
        useState<string | null>(null);

    async function handleCopy() {
        setError(null);

        const url = `${window.location.origin}/workspace/${slug}`;

        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 1800);
        } catch {
            setError("Could not copy link.");
        }
    }

    return (
        <div className="relative">
            <Button
                type="button"
                variant="icon"
                onClick={handleCopy}
                aria-label={
                    copied
                        ? "Workspace link copied"
                        : "Copy workspace link"
                }
            >
                {copied ? (
                    <Check
                        size={16}
                        strokeWidth={2}
                    />
                ) : (
                    <Copy
                        size={16}
                        strokeWidth={2}
                    />
                )}
            </Button>

            {error && (
                <p
                    role="alert"
                    className="absolute right-0 top-12 z-10 whitespace-nowrap rounded-lg border-2 border-red-500 bg-red-50 px-3 py-2 text-xs font-bold text-red-700"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
