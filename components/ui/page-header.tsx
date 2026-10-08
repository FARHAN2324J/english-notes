import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    description?: string;
    action?: ReactNode;
};

export function PageHeader({
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
                <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1c1c1a] sm:text-[3.25rem]">
                    {title}
                </h1>

                {description && (
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#77756e]">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {action}
                </div>
            )}
        </header>
    );
}