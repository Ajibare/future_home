import * as React from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>{title}</h1>
        {description && <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
