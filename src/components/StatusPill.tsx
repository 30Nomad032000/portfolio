export default function StatusPill({
  label,
  variant = "default",
  pulse = false,
}: {
  label: string;
  variant?: "default" | "success" | "live";
  pulse?: boolean;
}) {
  return (
    <span className={`status-pill status-pill--${variant}`}>
      {pulse && <span className="status-pill-dot" />}
      {label}
    </span>
  );
}
