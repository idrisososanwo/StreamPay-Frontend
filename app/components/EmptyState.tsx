import { ReactNode } from "react";

export type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  children?: ReactNode;
};

export function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  primaryAction,
  secondaryAction,
  children,
}: EmptyStateProps) {
  return (
    <section className="empty-state" aria-labelledby="empty-state-title">
      {eyebrow && <p className="empty-state__eyebrow">{eyebrow}</p>}
      <h2 className="empty-state__title" id="empty-state-title">
        {title}
      </h2>
      <p className="empty-state__description">{description}</p>
      {children}
      {primaryAction}
      {actionLabel && !primaryAction && (
        <button className="button button--primary" type="button">
          {actionLabel}
        </button>
      )}
      {secondaryAction}
    </section>
  );
}
