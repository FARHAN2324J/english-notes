"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { useQuery } from "convex/react";

import { ButtonLink } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

export default function HomePage() {
  const workspaces = useQuery(api.workspaces.list);

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#11110f]">
      <div className="mx-auto w-full max-w-[1100px] px-3 sm:px-5">
        <header className="mt-5 flex min-h-16 items-center justify-between rounded-t-2xl border-2 border-[#11110f] px-4 sm:px-6">
          <Link
            href="/"
            className="font-[var(--font-space-grotesk)] text-lg font-black uppercase tracking-[-0.05em]"
          >
            English Notes
          </Link>

          <ButtonLink
            href="/create"
            variant="accent"
            size="sm"
          >
            <Plus size={15} strokeWidth={2.5} />
            New
          </ButtonLink>
        </header>

        <section className="relative overflow-hidden border-x-2 border-b-2 border-[#11110f] px-5 py-12 sm:px-8 sm:py-16">
          <div className="relative z-10">
            <h1 className="max-w-3xl font-[var(--font-space-grotesk)] text-[clamp(3.5rem,9vw,7rem)] font-black uppercase leading-[0.8] tracking-[-0.085em]">
              Learn.
              <br />
              Write.
              <br />
              <span className="text-[#d7ff3f] [text-shadow:3px_3px_0_#11110f]">
                Share.
              </span>
            </h1>
          </div>
        </section>

        <section className="rounded-b-2xl border-x-2 border-b-2 border-[#11110f]">
          {workspaces === undefined && (
            <div className="grid gap-3 p-3 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-48 animate-pulse rounded-2xl border-2 border-[#11110f] bg-[#ebe7dc] shadow-[4px_4px_0_#11110f]"
                />
              ))}
            </div>
          )}

          {workspaces?.length === 0 && (
            <div className="px-5 py-14 text-center sm:py-20">
              <h3 className="font-[var(--font-space-grotesk)] text-3xl font-black uppercase tracking-[-0.05em]">
                No workspaces yet.
              </h3>

              <p className="mt-2 text-sm text-[#77746b]">
                Create your first English workspace.
              </p>

              <div className="mt-6">
                <ButtonLink
                  href="/create"
                  variant="accent"
                  size="md"
                >
                  Create Workspace
                </ButtonLink>
              </div>
            </div>
          )}

          {workspaces &&
            workspaces.length > 0 && (
              <div className="grid gap-3 p-3 sm:grid-cols-2">
                {workspaces.map((workspace) => (
                  <Link
                    key={workspace._id}
                    href={`/workspace/${workspace.slug}`}
                    className="group relative min-h-48 overflow-hidden rounded-2xl border-2 border-[#11110f] bg-[#f4f1e8] p-5 shadow-[4px_4px_0_#11110f] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#d7ff3f] hover:shadow-[2px_2px_0_#11110f] sm:min-h-56 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-[var(--font-plex-mono)] text-[8px] font-bold uppercase text-[#77746b]">
                        Workspace
                      </span>

                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#11110f] bg-[#f4f1e8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>

                    <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                      <h3 className="break-words font-[var(--font-space-grotesk)] text-3xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-4xl">
                        {workspace.name}
                      </h3>

                      <p className="mt-3 truncate font-[var(--font-plex-mono)] text-[8px] font-bold uppercase text-[#77746b]">
                        By {workspace.author}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  );
}
