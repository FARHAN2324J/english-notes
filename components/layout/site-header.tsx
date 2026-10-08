"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

type SiteHeaderProps = {
    compact?: boolean;
};

export function SiteHeader({
    compact = false,
}: SiteHeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className="relative z-50 border-b border-[var(--line)]">
            <div className="editorial-container">
                <div className="flex min-h-16 items-center justify-between">
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3"
                        aria-label="English Notes home"
                    >
                        <span className="flex size-8 shrink-0 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] text-[11px] font-black text-[var(--paper)] transition-transform duration-300 group-hover:rotate-[-8deg]">
                            EN
                        </span>

                        <span className="text-xs font-black uppercase tracking-[0.12em]">
                            English Notes
                        </span>
                    </Link>

                    <nav
                        className="hidden items-center gap-7 md:flex"
                        aria-label="Main navigation"
                    >
                        <Link
                            href="/"
                            className="link-line editorial-kicker"
                        >
                            Workspaces
                        </Link>

                        <Link
                            href="/create"
                            className="editorial-button group"
                        >
                            <span>Create Workspace</span>
                            <ArrowUpRight
                                size={15}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                    </nav>

                    <button
                        type="button"
                        className="flex size-11 items-center justify-center border border-[var(--line)] md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((current) => !current)}
                    >
                        {open ? (
                            <X size={19} strokeWidth={1.8} />
                        ) : (
                            <Menu size={19} strokeWidth={1.8} />
                        )}
                    </button>
                </div>

                <div
                    className={[
                        "grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 md:hidden",
                        open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                >
                    <div className="min-h-0">
                        <nav
                            className="border-t border-[var(--line)] py-5"
                            aria-label="Mobile navigation"
                        >
                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="flex min-h-12 items-center justify-between border-b border-[var(--line)] text-sm font-bold uppercase tracking-[0.08em]"
                            >
                                <span>Workspaces</span>
                                <ArrowUpRight
                                    size={17}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </Link>

                            <Link
                                href="/create"
                                onClick={() => setOpen(false)}
                                className="flex min-h-12 items-center justify-between text-sm font-bold uppercase tracking-[0.08em]"
                            >
                                <span>Create Workspace</span>
                                <ArrowUpRight
                                    size={17}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}