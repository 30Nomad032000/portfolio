export default function BlogLoading() {
  return (
    <div className="blog-page">
      <nav className="blog-page-nav">
        <div className="skeleton skeleton-sm" style={{ width: "60px" }} />
      </nav>

      <header className="blog-page-header">
        <div className="skeleton skeleton-sm" style={{ width: "80px", marginBottom: "1rem" }} />
        <div className="skeleton skeleton-lg" style={{ width: "320px", marginBottom: "0.75rem" }} />
        <div className="skeleton skeleton-md" style={{ width: "480px" }} />
      </header>

      <div className="blog-list">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="blog-skeleton-item">
            <div className="skeleton skeleton-sm" style={{ width: "28px" }} />
            <div className="blog-skeleton-content">
              <div className="skeleton skeleton-sm" style={{ width: "160px", marginBottom: "0.5rem" }} />
              <div className="skeleton skeleton-lg" style={{ width: "100%", maxWidth: "400px", marginBottom: "0.5rem" }} />
              <div className="skeleton skeleton-md" style={{ width: "100%", maxWidth: "560px", marginBottom: "0.75rem" }} />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div className="skeleton skeleton-sm" style={{ width: "60px" }} />
                <div className="skeleton skeleton-sm" style={{ width: "80px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
