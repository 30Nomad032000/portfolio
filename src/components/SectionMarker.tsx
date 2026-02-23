export default function SectionMarker({
  current,
  total,
  category,
  sublabel,
}: {
  current: number;
  total: number;
  category: string;
  sublabel: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="section-marker">
      <span className="section-marker-num">
        [ {pad(current)} / {pad(total)} ]
      </span>
      <span className="section-marker-dot">&middot;</span>
      <span className="section-marker-cat">{category}</span>
      <span className="section-marker-sep">//</span>
      <span className="section-marker-sub">{sublabel}</span>
      <span className="section-marker-sep">//</span>
    </div>
  );
}
